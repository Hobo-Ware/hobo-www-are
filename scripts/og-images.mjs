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
const fontDir = (name) => join(root, 'node_modules/@fontsource', name, 'files');
const LOCALES = ['en', 'nl', 'ro'];
const WIDTH = 1200;
const HEIGHT = 630;
const PALETTE_COLORS = 128;

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

const messages = (locale) =>
	JSON.parse(readFileSync(join(root, `paraglide/messages/${locale}.json`), 'utf8'));

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

const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' });
const psnr = (a, b) => {
	try {
		run('magick', ['compare', '-metric', 'PSNR', a, b, 'null:']);
	} catch (error) {
		return String(error.stderr).trim().split(' ')[0];
	}
	return 'inf';
};

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
for (const locale of LOCALES) {
	const tab = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
	const raw = join(out, `og-${locale}.raw.png`);
	const png = join(out, `og-${locale}.png`);
	await tab.setContent(page(messages(locale)), { waitUntil: 'load' });
	await tab.evaluate(() => document.fonts.ready);
	await tab.screenshot({ path: raw });
	run('pngquant', [
		'--force',
		'--speed',
		'1',
		'--strip',
		String(PALETTE_COLORS),
		'--output',
		png,
		raw
	]);
	run('oxipng', ['-q', '-o', '6', '--strip', 'safe', png]);
	console.log(
		`og-${locale}.png  ${(statSync(raw).size / 1024).toFixed(0)} kB -> ${(statSync(png).size / 1024).toFixed(0)} kB  PSNR ${psnr(raw, png)} dB`
	);
	rmSync(raw);
	await tab.close();
}
await browser.close();
