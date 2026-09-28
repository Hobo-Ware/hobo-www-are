import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const write = (path, data) => writeFileSync(new URL(path, root), JSON.stringify(data));

const logo = read('src/lib/components/icons/HoboLogo.svelte')
	.match(/<svg\s+class="logo"[\s\S]*<\/svg\s*>/)[0]
	.replace(/<title>.*?<\/title>/, '')
	.replace(/\s+(width|height)=\{[^}]*\}/g, '')
	.replace(/ style="[^"]*"/g, '');

const withViewBox = (viewBox, size) =>
	logo.replace(
		/<svg\s+class="logo"[^>]*>/,
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(' ')}" width="${size[0]}" height="${size[1]}">`
	);

const coalSvg = withViewBox([0, 0, 541.2, 398.6], [541, 399])
	.replace(/fill="var\(--red\)"/g, 'fill="#ff0000"')
	.replace(/fill="currentColor"/g, 'fill="#ffffff"');

const HEAD = [104, 0, 336, 296];
const mosaicSvg = withViewBox(HEAD, [HEAD[2] * 4, HEAD[3] * 4])
	.replace(/fill="var\(--red\)"/g, 'fill="#ff0000"')
	.replace(/fill="currentColor"/g, 'fill="#000000"');

const browser = await chromium.launch(
	process.env.CHROME ? { executablePath: process.env.CHROME } : undefined
);
const page = await browser.newPage();

const coals = await page.evaluate(async (svg) => {
	const ROWS = 66,
		COLS = Math.round((ROWS * 541.2) / 398.6);
	const img = new Image();
	img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
	await img.decode();
	const c = document.createElement('canvas');
	c.width = COLS;
	c.height = ROWS;
	const x = c.getContext('2d');
	x.drawImage(img, 0, 0, COLS, ROWS);
	const d = x.getImageData(0, 0, COLS, ROWS).data;
	let cells = '';
	for (let j = 0; j < ROWS; j++)
		for (let i = 0; i < COLS; i++) {
			const u = i / COLS,
				v = j / ROWS,
				k = (j * COLS + i) * 4;
			const isTrademark = u > 0.93 && v > 0.7 && v < 0.842;
			cells += isTrademark || d[k + 3] < 110 ? '0' : d[k] > 150 && d[k + 1] < 120 ? '2' : '1';
		}
	return { cols: COLS, rows: ROWS, cells };
}, coalSvg);

const mosaic = await page.evaluate(async (svg) => {
	const COLS = 168;
	const img = new Image();
	img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
	await img.decode();
	const W = img.width,
		H = img.height;
	const c = document.createElement('canvas');
	c.width = W;
	c.height = H;
	const g = c.getContext('2d');
	g.drawImage(img, 0, 0);
	const d = g.getImageData(0, 0, W, H).data;
	const cell = W / COLS,
		ROWS = Math.round(H / cell);
	const bytes = new Uint8Array(COLS * ROWS);
	for (let r = 0; r < ROWS; r++)
		for (let q = 0; q < COLS; q++) {
			let a = 0,
				red = 0,
				n = 0;
			for (let y = Math.floor(r * cell); y < Math.min(H, (r + 1) * cell); y++)
				for (let x = Math.floor(q * cell); x < Math.min(W, (q + 1) * cell); x++) {
					const i = (y * W + x) * 4,
						al = d[i + 3] / 255;
					n++;
					a += al;
					if (d[i] > 128 && al > 0.2) red += al;
				}
			const coverage = n ? a / n : 0,
				redShare = a ? red / a : 0;
			bytes[r * COLS + q] = (Math.round(coverage * 15) << 4) | Math.round(redShare * 15);
		}
	let bin = '';
	bytes.forEach((b) => (bin += String.fromCharCode(b)));
	return { cols: COLS, rows: ROWS, aspect: W / H, grid: btoa(bin) };
}, mosaicSvg);

await browser.close();

write('src/lib/features/weekday/logo-grid.json', coals);
write('src/lib/features/weekend/mosaic.json', mosaic);
console.log(`coals ${coals.cols}x${coals.rows}, mosaic ${mosaic.cols}x${mosaic.rows}`);
