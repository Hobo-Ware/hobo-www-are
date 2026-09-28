#!/usr/bin/env bash
# Adapted from https://github.com/trakt/trakt-web/blob/main/.github/scripts/ncu-bisect.sh

set -euo pipefail

INPUT_JSON="${1:?usage: ncu-bisect.sh <upgrades.json>}"
ROOT="$(git rev-parse --show-toplevel)"
LOG_DIR="${LOG_DIR:-/tmp/bisect-logs}"
mkdir -p "$LOG_DIR"
rm -f "$LOG_DIR"/probe-*.log "$LOG_DIR"/rejected-*.log

: > /tmp/passing.txt
: > /tmp/failing.txt

LOCKFILE="$ROOT/bun.lock"
[ -f "$LOCKFILE" ] || LOCKFILE="$ROOT/bun.lockb"

ORIGINAL_PKG="/tmp/bisect.pkg.original"
ORIGINAL_LOCK="/tmp/bisect.lock.original"
BASELINE_PKG="/tmp/bisect.pkg.baseline"
BASELINE_LOCK="/tmp/bisect.lock.baseline"
cp "$ROOT/package.json" "$ORIGINAL_PKG"
cp "$LOCKFILE"          "$ORIGINAL_LOCK"
cp "$ORIGINAL_PKG"  "$BASELINE_PKG"
cp "$ORIGINAL_LOCK" "$BASELINE_LOCK"

reset_baseline_to_original() {
  cp "$ORIGINAL_PKG"  "$BASELINE_PKG"
  cp "$ORIGINAL_LOCK" "$BASELINE_LOCK"
  cp "$ORIGINAL_PKG"  "$ROOT/package.json"
  cp "$ORIGINAL_LOCK" "$LOCKFILE"
}

TOTAL=$(jq 'length' "$INPUT_JSON")
PROBE_COUNT=0
START_TS=$(date +%s)

human_elapsed() {
  local secs=$(( $(date +%s) - START_TS ))
  printf '%02d:%02d' $((secs / 60)) $((secs % 60))
}

count_lines() { wc -l < "$1" 2>/dev/null | tr -d ' '; }

log() {
  printf '[%s] %s\n' "$(date +%H:%M:%S)" "$*" >&2
}

progress() {
  local adopted rejected unknown
  adopted=$(count_lines /tmp/passing.txt)
  rejected=$(count_lines /tmp/failing.txt)
  unknown=$(( TOTAL - adopted - rejected ))
  log "  ▸ probes=${PROBE_COUNT} | adopted=${adopted} | rejected=${rejected} | unknown=${unknown} | elapsed=$(human_elapsed)"
}

apply_set() {
  local set_json="$1"
  jq --argjson set "$set_json" '
    reduce ($set | to_entries[]) as $e (.;
      if (.dependencies // {})[$e.key]      then .dependencies[$e.key]     = $e.value
      elif (.devDependencies // {})[$e.key]  then .devDependencies[$e.key]  = $e.value
      elif (.peerDependencies // {})[$e.key] then .peerDependencies[$e.key] = $e.value
      else . end)
  ' "$BASELINE_PKG" > "$ROOT/package.json.tmp"
  mv "$ROOT/package.json.tmp" "$ROOT/package.json"
}

revert_to_baseline() {
  cp "$BASELINE_PKG"  "$ROOT/package.json"
  cp "$BASELINE_LOCK" "$LOCKFILE"
}

commit_baseline() {
  cp "$ROOT/package.json" "$BASELINE_PKG"
  cp "$LOCKFILE"          "$BASELINE_LOCK"
}

VERIFY_MODE="${VERIFY_MODE:-fast}"

run_step() {
  local name="$1" log_file="$2"
  shift 2
  if ! (cd "$ROOT" && "$@") >> "$log_file" 2>&1; then
    log "  ✗ $name failed"
    dump_probe_log "$log_file"
    return 1
  fi
}

verify() {
  local label="$1"
  local log_file="$LOG_DIR/probe-$(printf '%03d' "$PROBE_COUNT")-${label}.log"
  : > "$log_file"

  log "  ⤷ install + check + build $([ "$VERIFY_MODE" = "full" ] && echo "+ tests") (mode=$VERIFY_MODE, log: $log_file)"
  run_step install "$log_file" bun install || return 1
  run_step check   "$log_file" bun run check || return 1
  run_step build   "$log_file" bun run build || return 1
  if [ "$VERIFY_MODE" = "full" ]; then
    run_step tests "$log_file" bun run test || return 1
  fi
  log "  ✓ verify passed"
}

DUMPED_PROBES=0
dump_probe_log() {
  local log_file="$1"
  if [ "$DUMPED_PROBES" -ge 5 ]; then return; fi
  DUMPED_PROBES=$((DUMPED_PROBES + 1))
  log "  ── tail of $log_file ──"
  tail -n 40 "$log_file" 2>/dev/null | sed 's/^/       /' >&2
  log "  ── end of $log_file ──"
}

find_adoptable() {
  local set_json="$1"
  local count
  count=$(echo "$set_json" | jq 'length')
  [ "$count" -eq 0 ] && return

  PROBE_COUNT=$((PROBE_COUNT + 1))
  local names
  names=$(echo "$set_json" | jq -r 'keys | join(", ")')
  log "── probe #${PROBE_COUNT} | trying ${count} pkg(s): ${names}"

  apply_set "$set_json"
  if verify "n${count}"; then
    echo "$set_json" | jq -r 'to_entries[] | "\(.key)=\(.value)"' >> /tmp/passing.txt
    commit_baseline
    progress
    return
  fi

  if [ "$count" -eq 1 ]; then
    local bad bad_name
    bad=$(echo "$set_json" | jq -r 'to_entries[0] | "\(.key)=\(.value)"')
    bad_name=$(echo "$set_json" | jq -r 'keys[0]')
    echo "$bad" >> /tmp/failing.txt
    cp "$LOG_DIR/probe-$(printf '%03d' "$PROBE_COUNT")-n1.log" \
       "$LOG_DIR/rejected-${bad_name//\//__}.log" 2>/dev/null || true
    revert_to_baseline
    log "  ⛔ rejected: $bad"
    progress
    return
  fi

  local mid=$((count / 2))
  local left_json right_json
  left_json=$(echo  "$set_json" | jq --argjson m "$mid" 'to_entries | .[:$m]  | from_entries')
  right_json=$(echo "$set_json" | jq --argjson m "$mid" 'to_entries | .[$m:] | from_entries')

  log "  ↳ splitting: left=${mid}, right=$((count - mid))"
  find_adoptable "$left_json"
  find_adoptable "$right_json"
}

log "╔══════════════════════════════════════════════════════════════════"
log "║ Bisection start: $TOTAL candidate(s)"
log "║ Phase 1: install + check + build"
log "╚══════════════════════════════════════════════════════════════════"

VERIFY_MODE=fast find_adoptable "$(cat "$INPUT_JSON")"

log ""
log "▶ Phase 2: tests on adopted set"
TESTS_OK=0
if (cd "$ROOT" && bun install && bun run test) > "$LOG_DIR/final-tests.log" 2>&1; then
  log "  ✓ tests passed"
else
  log "  ✗ tests failed - re-bisecting adopted set with full verify"
  TESTS_OK=1
fi

if [ "$TESTS_OK" -ne 0 ] && [ -s /tmp/passing.txt ]; then
  ADOPTED_JSON=$(jq -nR '[inputs | split("=") | {(.[0]): .[1:] | join("=")}] | add // {}' < /tmp/passing.txt)
  : > /tmp/passing.txt
  reset_baseline_to_original
  log ""
  log "── re-bisecting $(echo "$ADOPTED_JSON" | jq 'length') previously-adopted pkg(s) with tests"
  VERIFY_MODE=full find_adoptable "$ADOPTED_JSON"
fi

log ""
log "▶ Phase 3: final build on adopted set"
FINAL_BUILD_OK=0
if (cd "$ROOT" && bun install && bun run build) > "$LOG_DIR/final-build.log" 2>&1; then
  log "  ✓ final build passed"
else
  log "  ✗ final build failed (log: $LOG_DIR/final-build.log)"
  FINAL_BUILD_OK=1
fi

ADOPTED_FINAL=$(count_lines /tmp/passing.txt)
REJECTED_FINAL=$(count_lines /tmp/failing.txt)
log ""
log "═══════════════════════════════════════════════════════════════════"
log " Summary: probes=${PROBE_COUNT} | adopted=${ADOPTED_FINAL} | rejected=${REJECTED_FINAL} | elapsed=$(human_elapsed)"
log " final build: $([ "$FINAL_BUILD_OK" -eq 0 ] && echo OK || echo FAIL)"
log "═══════════════════════════════════════════════════════════════════"

echo ""
echo "=== Passing ==="
cat /tmp/passing.txt || true
echo ""
echo "=== Failing ==="
cat /tmp/failing.txt || true

exit $FINAL_BUILD_OK
