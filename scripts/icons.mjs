import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'static/favicon');
const logo = JSON.parse(
	readFileSync(join(root, 'src/lib/features/weekday/logo-grid.json'), 'utf8')
);
const mosaic = JSON.parse(readFileSync(join(root, 'src/lib/features/weekend/mosaic.json'), 'utf8'));
const hype = JSON.parse(readFileSync(join(root, 'src/lib/hype/en.json'), 'utf8'))
	.flatMap((h) => [...h.messages, h.slogan.trim()])
	.join(' · ')
	.replace(/\s+/g, ' ');
const syne = readFileSync(
	join(root, 'node_modules/@fontsource/syne-mono/files/syne-mono-latin-400-normal.woff2')
).toString('base64');
const HEAD = { x: 18, y: 0, size: 50 };
const PALETTE_STEPS = [64, 128, 256];
const MIN_PSNR = 40;
const SETS = {
	weekday: { suffix: '', tile: '#0f1215', colors: [null, '#ff7a2e', '#fa1d3c', '#ff7a2e'] },
	weekend: { suffix: '-weekend', tile: '#160f24', colors: [null, '#e9dff2', '#e0479f', '#5cdcc2'] }
};

const head = Array.from({ length: HEAD.size }, (_, j) =>
	Array.from({ length: HEAD.size }, (_, i) => {
		const x = HEAD.x + i,
			y = HEAD.y + j;
		return x < logo.cols && y < logo.rows ? +logo.cells[y * logo.cols + x] : 0;
	})
);

function downsample(n) {
	const k = HEAD.size / n;
	return Array.from({ length: n }, (_, j) =>
		Array.from({ length: n }, (_, i) => {
			const count = [0, 0, 0];
			for (let y = Math.floor(j * k); y < Math.ceil((j + 1) * k); y++)
				for (let x = Math.floor(i * k); x < Math.ceil((i + 1) * k); x++) count[head[y][x]]++;
			const lit = count[1] + count[2];
			if (lit * 2 < count[0] + lit) return 0;
			if (count[2] >= count[1]) return 2;
			const u = i / n,
				v = j / n;
			return Math.abs(v - (0.4 + (u - 0.5) * 0.14)) < 0.045 && u > 0.3 && u < 0.85 ? 3 : 1;
		})
	);
}

function runs(cells, kind) {
	let d = '';
	cells.forEach((row, y) => {
		for (let x = 0; x < row.length; x++) {
			if (row[x] !== kind) continue;
			let w = 1;
			while (row[x + w] === kind) w++;
			d += `M${x} ${y}h${w}v1h-${w}z`;
			x += w - 1;
		}
	});
	return d;
}

function svgIcon(set) {
	const n = 25,
		pad = 3.5,
		box = n + pad * 2;
	const cells = downsample(n);
	const kinds = set.colors[3] === set.colors[1] ? [1, 2] : [1, 2, 3];
	const merged = kinds.length === 2 ? cells.map((row) => row.map((k) => (k === 3 ? 1 : k))) : cells;
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${box} ${box}">` +
		`<rect x="${-pad}" y="${-pad}" width="${box}" height="${box}" rx="7" fill="${set.tile}"/>` +
		kinds.map((k) => `<path fill="${set.colors[k]}" d="${runs(merged, k)}"/>`).join('') +
		'</svg>'
	);
}

const pixelIcon = (set, size, inner) => ({
	size,
	draw: `
		const cells = ${JSON.stringify(downsample(inner))};
		const colors = ${JSON.stringify(set.colors)};
		const o = ${(size - inner) / 2};
		ctx.fillStyle = '${set.tile}';
		ctx.beginPath(); ctx.roundRect(0, 0, ${size}, ${size}, ${Math.round(size * 0.22)}); ctx.fill();
		cells.forEach((row, y) => row.forEach((k, x) => {
			if (!k) return;
			ctx.fillStyle = colors[k];
			ctx.fillRect(o + x, o + y, 1, 1);
		}));`
});

const coalIcon = (set, size, scale) => ({
	size,
	draw: `
		const head = ${JSON.stringify(head)};
		let seed = 7;
		const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
		ctx.fillStyle = '${set.tile}';
		ctx.fillRect(0, 0, ${size}, ${size});
		const glow = ctx.createRadialGradient(${size / 2}, ${size * 0.62}, 0, ${size / 2}, ${size * 0.55}, ${size * 0.62});
		glow.addColorStop(0, 'rgba(255,106,31,.30)');
		glow.addColorStop(.5, 'rgba(250,29,60,.08)');
		glow.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.fillStyle = glow;
		ctx.fillRect(0, 0, ${size}, ${size});
		const cell = ${(size * scale) / HEAD.size}, gap = cell * 0.12, o = (${size} - cell * ${HEAD.size}) / 2;
		const coal = (k, heat) => k === 2
			? 'hsl(' + (350 + heat * 12) + ' 96% ' + (48 + heat * 22) + '%)'
			: 'hsl(' + (16 + heat * 24) + ' 100% ' + (48 + heat * 22) + '%)';
		for (const pass of [0, 1]) {
			ctx.shadowBlur = pass ? 0 : cell * 2.6;
			head.forEach((row, y) => row.forEach((k, x) => {
				if (!k) return;
				const heat = Math.round(rand() * 4) / 4;
				ctx.fillStyle = ctx.shadowColor = coal(k, heat);
				ctx.globalAlpha = pass ? .78 + heat * .22 : .45;
				ctx.fillRect(o + x * cell, o + y * cell, cell - gap, cell - gap);
			}));
		}`
});

const mosaicIcon = (set, size, scale, cs) => ({
	size,
	draw: `
		const M = ${JSON.stringify(mosaic)};
		const TEXT = ${JSON.stringify(hype)};
		const grid = Uint8Array.from(atob(M.grid), (c) => c.charCodeAt(0));
		const S = ${size}, cs = ${cs};
		const glow = (x, y, r, color) => {
			const g = ctx.createRadialGradient(x, y, 0, x, y, r);
			g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
			ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
		};
		ctx.fillStyle = '${set.tile}';
		ctx.fillRect(0, 0, S, S);
		glow(S * .22, S * .2, S * .7, 'rgba(77,24,96,.9)');
		glow(S * .85, S * .88, S * .6, 'rgba(13,70,66,.75)');
		glow(S * .5, S * .52, S * .42, 'rgba(148,116,255,.18)');
		const hw = S * ${scale}, hh = hw / M.aspect, dx = (S - hw) / 2, dy = (S - hh) / 2 + S * .01;
		const sample0 = (u, v) => (u < 0 || v < 0 || u >= 1 || v >= 1) ? 0 : grid[Math.floor(v * M.rows) * M.cols + Math.floor(u * M.cols)];
		const pc = hw / 34;
		for (let y = dy; y < dy + hh; y += pc) for (let x = dx; x < dx + hw; x += pc) {
			const b = sample0((x + pc / 2 - dx) / hw, (y + pc / 2 - dy) / hh), a = (b >> 4) / 15;
			if (a <= .35) continue;
			const red = (b & 15) / 15 > .5;
			ctx.globalAlpha = red ? .24 : .12;
			ctx.fillStyle = red ? '${set.colors[2]}' : '${set.colors[1]}';
			ctx.fillRect(x + pc * .06, y + pc * .06, pc * .88, pc * .88);
		}
		ctx.globalAlpha = 1;
		const cols = Math.ceil(S / cs), rows = Math.ceil(S / cs);
		const sample = (u, v) => (u < 0 || v < 0 || u >= 1 || v >= 1) ? 0 : grid[Math.floor(v * M.rows) * M.cols + Math.floor(u * M.cols)];
		ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
		let hi = 0;
		for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
			const u = ((x + .5) * cs - dx) / hw, v = ((y + .5) * cs - dy) / hh;
			const b = sample(u, v), a = (b >> 4) / 15;
			if (a <= .12) continue;
			const red = (b & 15) / 15 > .5 && a > .2;
			let ch; do { ch = TEXT[hi++ % TEXT.length]; } while (ch === ' ');
			const trail = !red && Math.abs(v - (.42 + (u - .5) * .1)) < .05 && u > .2 && u < .9;
			const color = red ? '${set.colors[2]}' : trail ? '${set.colors[3]}' : '${set.colors[1]}';
			ctx.shadowColor = color; ctx.shadowBlur = trail ? cs * .9 : red ? cs * .4 : 0;
			ctx.globalAlpha = red ? .88 + .12 * a : trail ? 1 : .62 + .38 * a;
			ctx.fillStyle = color;
			ctx.font = Math.round(cs * (.82 + .42 * a)) + 'px Syne, monospace';
			ctx.fillText(ch, (x + .5) * cs, (y + .5) * cs);
		}
		ctx.shadowBlur = 0; ctx.globalAlpha = 1;
`
});

const ICONS = {};
for (const [mode, set] of Object.entries(SETS)) {
	const big =
		mode === 'weekday'
			? [coalIcon(set, 180, 0.78), coalIcon(set, 192, 0.7), coalIcon(set, 512, 0.7)]
			: [
					mosaicIcon(set, 180, 0.74, 5),
					mosaicIcon(set, 192, 0.68, 5),
					mosaicIcon(set, 512, 0.68, 9)
				];
	ICONS[`favicon${set.suffix}-16x16.png`] = pixelIcon(set, 16, 14);
	ICONS[`favicon${set.suffix}-32x32.png`] = pixelIcon(set, 32, 26);
	ICONS[`apple-touch-icon${set.suffix}.png`] = big[0];
	ICONS[`icon${set.suffix}-192.png`] = big[1];
	ICONS[`icon${set.suffix}-512.png`] = big[2];
}

const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'pipe' });
const psnr = (a, b) => {
	try {
		run('magick', ['compare', '-metric', 'PSNR', a, b, 'null:']);
	} catch (error) {
		return String(error.stderr).trim().split(' ')[0];
	}
	return 'inf';
};
const kb = (file) => `${(statSync(file).size / 1024).toFixed(1)} kB`;

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const set of Object.values(SETS)) {
	const name = `favicon${set.suffix}.svg`;
	writeFileSync(join(out, name), svgIcon(set));
	console.log(`${name}  ${kb(join(out, name))}`);
}

const browser = await chromium.launch({ channel: 'chrome' });
const tab = await browser.newPage();
await tab.setContent(
	`<style>@font-face{font-family:Syne;src:url(data:font/woff2;base64,${syne}) format('woff2')}</style><span style="font-family:Syne">A</span>`
);
await tab.evaluate(() => document.fonts.ready);
for (const [name, icon] of Object.entries(ICONS)) {
	const data = await tab.evaluate(
		({ size, draw }) => {
			const canvas = document.createElement('canvas');
			canvas.width = canvas.height = size;
			const ctx = canvas.getContext('2d');
			new Function('ctx', draw)(ctx);
			return canvas.toDataURL('image/png');
		},
		{ size: icon.size, draw: icon.draw }
	);
	const raw = join(out, `${name}.raw.png`);
	const png = join(out, name);
	writeFileSync(raw, Buffer.from(data.split(',')[1], 'base64'));
	let colors = 'lossless';
	for (const step of PALETTE_STEPS) {
		run('pngquant', ['--force', '--speed', '1', '--strip', String(step), '--output', png, raw]);
		run('oxipng', ['-q', '-o', '6', '--strip', 'safe', png]);
		const score = psnr(raw, png);
		if (score === 'inf' || Number(score) >= MIN_PSNR) {
			colors = step;
			break;
		}
	}
	if (colors === 'lossless') run('oxipng', ['-q', '-o', '6', '--strip', 'safe', '--out', png, raw]);
	console.log(`${name}  ${kb(raw)} -> ${kb(png)}  ${colors} colors  PSNR ${psnr(raw, png)} dB`);
	rmSync(raw);
}
await browser.close();

for (const [mode, set] of Object.entries(SETS)) {
	const manifest = {
		name: 'Hoboware',
		short_name: 'Hoboware',
		start_url: mode === 'weekend' ? '/#weekend' : '/',
		display: 'browser',
		theme_color: mode === 'weekend' ? '#0d0a15' : set.tile,
		background_color: mode === 'weekend' ? '#0d0a15' : set.tile,
		icons: [192, 512].map((n) => ({
			src: `/favicon/icon${set.suffix}-${n}.png`,
			sizes: `${n}x${n}`,
			type: 'image/png',
			purpose: 'any maskable'
		}))
	};
	const file = `manifest${set.suffix}.webmanifest`;
	writeFileSync(join(root, 'static', file), JSON.stringify(manifest, null, '\t') + '\n');
	console.log(`${file} written`);
}
