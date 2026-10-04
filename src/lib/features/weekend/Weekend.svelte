<script lang="ts">
	import './lens.css';
	import './weekend.css';
	import * as m from '$lib/paraglide/messages';
	import HoboLogo from '$lib/components/icons/HoboLogo.svelte';
	import IconGitHub from '$lib/components/icons/IconGitHub.svelte';
	import ModeSwitch from '$lib/features/site/ModeSwitch.svelte';
	import ProjectLinks from '$lib/features/site/ProjectLinks.svelte';
	import {
		FOUNDERS,
		GITHUB_URL,
		SKILL_ATTRIBUTE,
		check,
		hype,
		skillName,
		type SkillKey
	} from '$lib/features/site/content';
	import { weekendClock } from '$lib/features/site/copy';
	import cabinet from './cabinet.json';
	import { restingWave } from './geometry';
	import TarotCard from './TarotCard.svelte';
	import WeekendDefs from './WeekendDefs.svelte';

	const entries = hype();
	const opening = entries[cabinet.opening];
	const year = new Date().getFullYear();
	const lineCount = entries.length;

	const bonus = (amount: number, skill: string) =>
		m.we_bonus({
			amount: amount > 0 ? `+${amount}` : `${amount}`,
			skill: skillName(skill as SkillKey)
		});

	const log: [SkillKey | 'hoboware', Parameters<typeof check>[0], string, string][] = [
		['laziness', 'legendary', m.we_weekend_line(), ' past'],
		['inland_empire', 'medium', opening.messages[0], ' past'],
		['shivers', 'easy', opening.messages[1], ' past'],
		['hoboware', 'legendary', opening.slogan.trim(), ' slogan']
	];
</script>

<div id="we-root" class="mode-weekend">
	<WeekendDefs />
	<div class="we-atmos" aria-hidden="true">
		<canvas id="we-paint"></canvas>
	</div>
	<div class="page">
		<header class="topbar">
			<a
				class="icon-btn"
				href={GITHUB_URL}
				target="_blank"
				rel="noopener"
				aria-label={m.github_description()}
			>
				<IconGitHub />
				<span>GitHub</span>
			</a>
			<ModeSwitch />
			<button class="icon-btn" id="we-theme" type="button" aria-label={m.theme_toggle()}>
				<span id="we-theme-lbl">{m.we_theme_dreaming()}</span>
				<span class="eye" aria-hidden="true"></span>
			</button>
		</header>

		<section class="hero">
			<div class="stage">
				<h2 class="stage-title">{m.we_title()} <em>{m.we_title_em()}</em></h2>
				<div class="orbit" id="we-cab">
					<svg class="orbit-dash" viewBox="0 0 100 100" aria-hidden="true"
						><circle cx="50" cy="50" r="46" /></svg
					>
					<svg
						class="orbit-line"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden="true"
						><defs
							><radialGradient id="we-disc" cx="50" cy="50" r="34" gradientUnits="userSpaceOnUse"
								><stop offset="0" class="disc-core" /><stop offset=".72" class="disc-mid" /><stop
									offset="1"
									class="disc-edge"
								/></radialGradient
							></defs
						><path class="wave" id="we-wave" d={restingWave()} /></svg
					>
					<HoboLogo sized />
					{#each cabinet.sigils as sigil, n (n)}
						{@const thought = entries[sigil.entry].messages[0]}
						{@const reward = bonus(sigil.amount, sigil.skill)}
						<button
							type="button"
							class="sigil"
							style="--x:{sigil.x.toFixed(2)}%;--y:{sigil.y.toFixed(2)}%;--d:{sigil.delay.toFixed(
								1
							)}s;--hue:var(--{sigil.hue})"
							data-entry={sigil.entry}
							data-minutes={sigil.minutes}
							data-bonus={reward}
							aria-label={m.we_sigil_label({ n: n + 1, thought, bonus: reward })}
						>
							<svg viewBox="0 0 48 48" aria-hidden="true"
								><circle class="track" cx="24" cy="24" r="20" /><circle
									class="prog"
									cx="24"
									cy="24"
									r="20"
								/></svg
							><span class="glyph" aria-hidden="true"
								>{#each sigil.pattern as on, k (k)}<i class={on ? 'on' : ''}></i>{/each}</span
							>
						</button>
					{/each}
					<span class="zzz" aria-hidden="true"><i>z</i><i>z</i><i>Z</i></span>
				</div>
				<p class="caption" id="we-caption" aria-live="polite">{m.we_caption()}</p>
				<p class="count"><b id="we-cnt">0</b> {m.we_count()}</p>
			</div>

			<div class="dialogue" aria-live="polite">
				<div class="kicker">
					<span class="kicker-line"
						>{m.we_kicker()} &middot; <span id="we-clock">{weekendClock(new Date())}</span></span
					>
				</div>
				<ol class="log" id="we-log" data-entry={cabinet.opening}>
					{#each log as [skill, level, said, cls], i (i)}
						<li class="line{cls}">
							<span
								class="speaker"
								data-attr={skill === 'hoboware' ? 'hobo' : SKILL_ATTRIBUTE[skill]}
								>{skill === 'hoboware' ? 'Hoboware' : skillName(skill)}</span
							><span class="check"><span>{check(level)}</span></span>
							<span class="said">{said}</span>
						</li>
					{/each}
				</ol>
				<ol class="options">
					<li>
						<button type="button" id="we-reroll"><span class="n">1.</span>{m.option_roll()}</button>
					</li>
					<li>
						<a href="#we-founders" id="we-to-founders"
							><span class="n">2.</span>{m.we_option_founders()}</a
						>
					</li>
					<li>
						<a href={GITHUB_URL} target="_blank" rel="noopener"
							><span class="n">3.</span>{m.option_code()}
							<span class="n">{m.option_leave()}</span></a
						>
					</li>
				</ol>
			</div>
		</section>

		<section class="arcana" id="we-founders">
			<div class="arcana-head">
				<h2>{m.we_arcana_title()} <em>{m.we_arcana_title_em()}</em></h2>
				<p>{m.we_arcana_sub()}</p>
			</div>
			<div class="deal">
				{#each FOUNDERS as founder (founder.id)}
					<TarotCard {founder} />
				{/each}
			</div>
		</section>
	</div>

	<footer class="mosaic-foot">
		<p class="mosaic-cap">
			{m.we_mosaic_cap_start()} <b>{lineCount}</b>
			{m.we_mosaic_cap_end()}
		</p>
		<div class="mosaic-stack">
			<canvas id="we-mosaic" aria-hidden="true"></canvas>
		</div>
		<div class="footbar">
			<div class="works">
				<span class="works-lbl">{m.projects_label()}</span>
				<ProjectLinks iconSize={40} />
			</div>
			<span class="copy">&copy; <span id="we-year">{year}</span> Hoboware</span>
		</div>
	</footer>
</div>
