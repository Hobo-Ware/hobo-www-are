import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'static/og');
const grid = JSON.parse(
	readFileSync(join(root, 'src/lib/features/weekday/logo-grid.json'), 'utf8')
);
const mosaic = JSON.parse(readFileSync(join(root, 'src/lib/features/weekend/mosaic.json'), 'utf8'));
const fontDir = (name) => join(root, 'node_modules/@fontsource', name, 'files');
const LOCALES = ['en', 'nl', 'ro'];
const WIDTH = 1200;
const HEIGHT = 630;
const PALETTE_STEPS = [128, 192, 256];
const MIN_PSNR = 40;

const font = (family, pkg, file, style = 'normal') =>
	['latin', 'latin-ext']
		.map(
			(subset) =>
				`@font-face{font-family:'${family}';font-style:${style};src:url(data:font/woff2;base64,${readFileSync(
					join(fontDir(pkg), `${pkg}-${subset}-${file}.woff2`)
				).toString('base64')}) format('woff2');}`
		)
		.join('');

const fonts = [
	font('Caslon', 'libre-caslon-display', '400-normal'),
	font('Crimson', 'crimson-pro', '400-italic', 'italic'),
	font('Sofia', 'sofia-sans-extra-condensed', '800-normal')
].join('');

const weekendFonts = [
	font('Unicase', 'cormorant-unicase', '600-normal'),
	font('Alegreya', 'alegreya-sans', '500-normal'),
	font('Alegreya', 'alegreya-sans', '700-normal'),
	font('AlegreyaItalic', 'alegreya-sans', '500-italic', 'italic'),
	font('Syne', 'syne-mono', '400-normal')
].join('');

const messages = (locale) =>
	JSON.parse(readFileSync(join(root, `paraglide/messages/${locale}.json`), 'utf8'));
const hypeText = (locale) =>
	JSON.parse(readFileSync(join(root, `src/lib/hype/${locale}.json`), 'utf8'))
		.flatMap((h) => [...h.messages, h.slogan.trim()])
		.join(' · ')
		.replace(/\s+/g, ' ');

const keepHyphenated = (text) =>
	text.replace(/\S+-\S+/g, (word) => `<span style="white-space:nowrap">${word}</span>`);

const page = (m) => `<!doctype html><meta charset="utf-8"><style>${fonts}
*{margin:0;box-sizing:border-box}
body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;background:#0b0d10;color:#e8dfcf}
canvas{position:absolute;inset:0}
.copy{position:absolute;left:640px;right:64px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:26px}
.kicker{font:800 22px/1 Sofia,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#a39b8e}
.kicker b{color:#ff7a2e}
h1{font:400 58px/1.08 Caslon,serif;text-wrap:balance}
h1 em{display:block;margin-top:10px;font:italic 400 54px/1.1 Crimson,serif;color:#ff7a2e}
.url{font:800 24px/1 Sofia,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#e8dfcf}
.url i{display:inline-block;width:10px;height:10px;margin-right:14px;background:#fa1d3c;vertical-align:2px}
</style>
<canvas id="c" width="${WIDTH}" height="${HEIGHT}"></canvas>
<div class="copy">
<div class="kicker">${m.wd_kicker} &middot; <b>${m.wd_kicker_hot}</b></div>
<h1>${keepHyphenated(m.wd_tagline)}<em>${keepHyphenated(m.wd_tagline_em)}</em></h1>
<div class="url"><i></i>hoboware.dev</div>
</div>
<script>
const grid = ${JSON.stringify(grid)};
const ctx = document.getElementById('c').getContext('2d');
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const bg = ctx.createRadialGradient(330, 560, 20, 330, 470, 620);
bg.addColorStop(0, 'rgba(255,106,31,.34)');
bg.addColorStop(.45, 'rgba(250,29,60,.08)');
bg.addColorStop(1, 'rgba(0,0,0,0)');
ctx.fillStyle = bg;
ctx.fillRect(0, 0, ${WIDTH}, ${HEIGHT});
const cell = 6.2, gap = 1.4, x0 = 330 - (grid.cols * cell) / 2, y0 = 316 - (grid.rows * cell) / 2;
const coal = (k, heat) => k === 2
	? 'hsl(' + (350 + heat * 12) + ' 96% ' + (48 + heat * 22) + '%)'
	: 'hsl(' + (14 + heat * 26) + ' 100% ' + (38 + heat * 28) + '%)';
for (const pass of [0, 1]) {
	ctx.shadowBlur = pass ? 0 : 18;
	for (let j = 0; j < grid.rows; j++) for (let i = 0; i < grid.cols; i++) {
		const k = +grid.cells[j * grid.cols + i];
		if (!k) continue;
		const heat = rand();
		ctx.fillStyle = ctx.shadowColor = coal(k, heat);
		ctx.globalAlpha = pass ? .72 + heat * .28 : .5;
		ctx.fillRect(x0 + i * cell, y0 + j * cell, cell - gap, cell - gap);
	}
}
ctx.globalAlpha = 1;
ctx.shadowBlur = 8;
for (let n = 0; n < 46; n++) {
	const rise = rand() ** 2, x = x0 + (0.22 + rand() * 0.56) * grid.cols * cell + (rand() - 0.5) * rise * 120, y = y0 + 40 - rise * 150, s = (1.2 + rand() * 2.6) * (1 - rise * 0.5);
	ctx.fillStyle = ctx.shadowColor = 'hsl(' + (20 + rand() * 30) + ' 100% ' + (55 + rand() * 25) + '%)';
	ctx.globalAlpha = .25 + rand() * .6;
	ctx.fillRect(x, y, s, s);
}
</script>`;

const weekendPage = (m, text) => `<!doctype html><meta charset="utf-8"><style>${weekendFonts}
*{margin:0;box-sizing:border-box}
body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;background:#0d0a15;color:#ece4f2}
canvas{position:absolute;inset:0}
.copy{position:absolute;left:668px;right:60px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px}
.kicker{display:flex;align-items:center;gap:14px;font:400 19px/1 Syne,monospace;letter-spacing:.2em;text-transform:uppercase;color:#a99cba}
.kicker::before{content:'';width:10px;height:10px;background:#d6479f;box-shadow:0 0 14px #d6479f}
h1{font:600 74px/1 Unicase,serif;letter-spacing:.01em;filter:url(#dream);text-wrap:balance}
h1 em{font-style:normal;color:#d6479f}
.line{font:500 29px/1.4 AlegreyaItalic,serif;font-style:italic;color:#ece4f2;text-wrap:pretty}
.line b{font:700 19px/1 Alegreya,sans-serif;font-style:normal;letter-spacing:.12em;text-transform:uppercase;color:#8cc39c;margin-right:10px}
.line s{text-decoration:none;font:400 16px/1 Syne,monospace;font-style:normal;color:#a99cba;margin-right:12px;white-space:nowrap}
.url{display:flex;align-items:center;gap:14px;font:400 22px/1 Syne,monospace;letter-spacing:.22em;text-transform:uppercase;color:#ece4f2}
.url i{width:11px;height:11px;background:#fa1d3c}
</style>
<svg width="0" height="0" style="position:absolute"><filter id="dream" x="-5%" y="-20%" width="110%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter></svg>
<canvas id="c" width="${WIDTH}" height="${HEIGHT}"></canvas>
<div class="copy">
<div class="kicker">${m.we_kicker}</div>
<h1>${m.we_title} <em>${m.we_title_em}</em></h1>
<p class="line"><b>${m.skill_laziness}</b><s>[${m.level_legendary}: ${m.result_success}]</s>${keepHyphenated(m.we_weekend_line)}</p>
<div class="url"><i></i>hoboware.dev</div>
</div>
<script>
const M = ${JSON.stringify(mosaic)};
const TEXT = ${JSON.stringify(text)};
const grid = Uint8Array.from(atob(M.grid), (c) => c.charCodeAt(0));
const ctx = document.getElementById('c').getContext('2d');
let seed = 11;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const glow = (x, y, r, color) => {
	const g = ctx.createRadialGradient(x, y, 0, x, y, r);
	g.addColorStop(0, color);
	g.addColorStop(1, 'rgba(0,0,0,0)');
	ctx.fillStyle = g;
	ctx.fillRect(x - r, y - r, r * 2, r * 2);
};
glow(170, 120, 420, 'rgba(61,24,72,.95)');
glow(1060, 560, 460, 'rgba(13,59,58,.9)');
glow(640, 640, 360, 'rgba(77,18,50,.85)');
glow(330, 330, 300, 'rgba(148,116,255,.16)');
const cs = 9, W = 640, H = ${HEIGHT};
const cols = Math.ceil(W / cs), rows = Math.ceil(H / cs);
const hh = H * 0.9, hw = hh * M.aspect, dx = (W - hw) / 2 + 12, dy = (H - hh) / 2 + 8;
const sample = (u, v) => (u < 0 || v < 0 || u >= 1 || v >= 1) ? 0 : grid[Math.floor(v * M.rows) * M.cols + Math.floor(u * M.cols)];
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
const trail = (x, y) => {
	const t = (x - 0.16 * cols) / (0.66 * cols);
	const cy = 0.4 * rows + (t - 0.5) * 0.12 * rows - Math.sin(t * Math.PI) * 0.06 * rows;
	return t > 0 && t < 1 ? Math.max(0, 1 - Math.abs(y - cy) / 4.2) * Math.sin(t * Math.PI) ** 0.6 : 0;
};
let hi = 0, fi = Math.floor(TEXT.length / 2);
for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
	const b = sample(((x + 0.5) * cs - dx) / hw, ((y + 0.5) * cs - dy) / hh);
	const a = (b >> 4) / 15;
	const head = a > 0.12, red = head && (b & 15) / 15 > 0.5 && a > 0.2;
	let ch;
	if (head) { do { ch = TEXT[hi++ % TEXT.length]; } while (ch === ' '); }
	else ch = TEXT[fi++ % TEXT.length];
	if (ch === ' ') continue;
	const heat = trail(x, y);
	const cx = (x + 0.5) * cs, cy = (y + 0.5) * cs;
	let color = red ? '#fa1d3c' : '#e9dff2', alpha, px;
	if (head) {
		const wave = 0.84 + 0.16 * Math.sin(-x * 0.07 - y * 0.05 + 2.2);
		alpha = (red ? 0.78 + 0.22 * a : 0.6 + 0.4 * a) * wave;
		px = cs * (0.8 + 0.5 * a) * (1 + heat * 0.45);
	} else {
		alpha = 0.07 * (1 - x / cols * 0.6) + heat * 0.75;
		px = cs * 0.72 * (1 + heat * 0.5);
	}
	if (heat > 0.05 && !red) color = (x + y) % 3 === 0 ? '#d6479f' : '#5cdcc2';
	if (heat > 0.3) { ctx.shadowColor = color; ctx.shadowBlur = 10 * heat; } else ctx.shadowBlur = 0;
	ctx.globalAlpha = Math.min(1, alpha);
	ctx.fillStyle = color;
	ctx.font = Math.round(px) + 'px Syne, monospace';
	ctx.fillText(ch, cx, cy);
}
ctx.shadowBlur = 0;
for (let n = 0; n < 26; n++) {
	const x = rand() * ${WIDTH}, y = rand() * H, r = 3 + rand() * 9;
	ctx.globalAlpha = 0.25 + rand() * 0.35;
	glow(x, y, r * 3, rand() < 0.5 ? 'rgba(92,220,194,.7)' : 'rgba(214,71,159,.7)');
}
ctx.globalAlpha = 1;
</script>`;

const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' });
const psnr = (a, b) => {
	try {
		run('magick', ['compare', '-metric', 'PSNR', a, b, 'null:']);
	} catch (error) {
		return String(error.stderr).trim().split(' ')[0];
	}
	return 'inf';
};

const compress = (raw, png) => {
	for (const colors of PALETTE_STEPS) {
		run('pngquant', ['--force', '--speed', '1', '--strip', String(colors), '--output', png, raw]);
		run('oxipng', ['-q', '-o', '6', '--strip', 'safe', png]);
		const score = psnr(raw, png);
		if (score === 'inf' || Number(score) >= MIN_PSNR) return { colors, score };
	}
	run('oxipng', ['-q', '-o', '6', '--strip', 'safe', '--out', png, raw]);
	return { colors: 'lossless', score: 'inf' };
};

const cards = (locale) => [
	{ name: `og-${locale}`, html: page(messages(locale)) },
	{ name: `og-weekend-${locale}`, html: weekendPage(messages(locale), hypeText(locale)) }
];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
for (const locale of LOCALES)
	for (const card of cards(locale)) {
		const tab = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
		const raw = join(out, `${card.name}.raw.png`);
		const png = join(out, `${card.name}.png`);
		await tab.setContent(card.html, { waitUntil: 'load' });
		await tab.evaluate(() => document.fonts.ready);
		await tab.screenshot({ path: raw });
		const { colors, score } = compress(raw, png);
		console.log(
			`${card.name}.png  ${(statSync(raw).size / 1024).toFixed(0)} kB -> ${(statSync(png).size / 1024).toFixed(0)} kB  ${colors} colors  PSNR ${score} dB`
		);
		rmSync(raw);
		await tab.close();
	}
await browser.close();
