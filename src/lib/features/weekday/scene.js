import GRID from './logo-grid.json';
import { createFireGL } from './fire-gl.js';

export const BLAZE_MS = 4600;

function createPaint(cv, makeCanvas) {
	const ctx = cv.getContext('2d');
	const strokes = makeCanvas(1, 1);
	let scale = 1,
		px = 2,
		w = 0,
		h = 0,
		colors = { k: 1 },
		t0 = -1,
		last = 0;
	const blobs = Array.from({ length: 6 }, (_, i) => ({
		k: ['blob-a', 'blob-b', 'blob-c', 'blob-d', 'blob-a', 'blob-c'][i],
		ax: 0.15 + Math.random() * 0.55,
		ay: 0.15 + Math.random() * 0.7,
		rx: 0.12 + Math.random() * 0.18,
		ry: 0.1 + Math.random() * 0.2,
		sx: 0.00004 + Math.random() * 0.00006,
		sy: 0.00003 + Math.random() * 0.00006,
		ph: Math.random() * 6.28,
		r: 0.35 + Math.random() * 0.3
	}));
	function paintStrokes() {
		strokes.width = w;
		strokes.height = h;
		const s = strokes.getContext('2d');
		s.lineCap = 'round';
		const n = Math.round((w * h) / (900 * px * px));
		for (let i = 0; i < n; i++) {
			const x = Math.random() * w,
				y = Math.random() * h,
				len = (20 + Math.random() * 90) * px,
				a = -0.6 + Math.random() * 0.5;
			s.strokeStyle = Math.random() < 0.5 ? colors.ink : colors.bg;
			s.globalAlpha = (0.012 + Math.random() * 0.035) * colors.k;
			s.lineWidth = (2 + Math.random() * 14) * px;
			s.beginPath();
			s.moveTo(x, y);
			s.quadraticCurveTo(
				x + Math.cos(a) * len * 0.5,
				y + Math.sin(a) * len * 0.5 + (-10 + Math.random() * 20) * px,
				x + Math.cos(a) * len,
				y + Math.sin(a) * len
			);
			s.stroke();
		}
		s.globalAlpha = 0.07;
		s.strokeStyle = colors.ember;
		for (let i = 0; i < 6; i++) {
			const x = Math.random() * w,
				y = Math.random() * h;
			s.lineWidth = (3 + Math.random() * 6) * px;
			s.beginPath();
			s.moveTo(x, y);
			s.bezierCurveTo(
				x + 40 * px,
				y - 20 * px,
				x + 80 * px,
				y + 30 * px,
				x + 140 * px,
				y - 10 * px
			);
			s.stroke();
		}
	}
	function frame(now, force) {
		if (t0 < 0) t0 = now;
		if (!force && now - last < 33) return;
		last = now;
		const t = now - t0;
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 1;
		ctx.fillStyle = colors.bg;
		ctx.fillRect(0, 0, w, h);
		for (const b of blobs) {
			const x = (b.ax + Math.sin(t * b.sx + b.ph) * b.rx) * w;
			const y = (b.ay + Math.cos(t * b.sy + b.ph) * b.ry) * h;
			const r = b.r * Math.max(w, h);
			const g = ctx.createRadialGradient(x, y, 0, x, y, r);
			g.addColorStop(0, colors[b.k]);
			g.addColorStop(1, 'transparent');
			ctx.globalAlpha = 0.75;
			ctx.fillStyle = g;
			const x0 = Math.max(0, x - r),
				y0 = Math.max(0, y - r);
			ctx.fillRect(x0, y0, Math.min(w, x + r) - x0, Math.min(h, y + r) - y0);
		}
		const g2 = ctx.createRadialGradient(
			w * 0.4,
			h * 0.45,
			Math.min(w, h) * 0.2,
			w * 0.4,
			h / 2,
			Math.max(w, h) * 0.8
		);
		g2.addColorStop(0, 'transparent');
		g2.addColorStop(1, colors['bg-deep']);
		ctx.globalAlpha = 0.8 * colors.k;
		ctx.fillStyle = g2;
		ctx.fillRect(0, 0, w, h);
		ctx.globalAlpha = 1;
		ctx.drawImage(strokes, Math.sin(t * 0.00005) * 12 * px, Math.cos(t * 0.00004) * 8 * px);
	}
	return {
		get ready() {
			return w > 0;
		},
		resize(vw, vh, dpr, now) {
			scale = Math.min(dpr || 1, 2);
			px = scale / 0.5;
			w = Math.ceil(vw * scale);
			h = Math.ceil(vh * scale);
			cv.width = w;
			cv.height = h;
			paintStrokes();
			frame(now, true);
		},
		setColors(next, now) {
			colors = next;
			if (!w) return;
			paintStrokes();
			frame(now, true);
		},
		frame
	};
}

function ramp(stops, n = 96) {
	const rgb = stops.map(([p, hex]) => [
		p,
		parseInt(hex.slice(1, 3), 16),
		parseInt(hex.slice(3, 5), 16),
		parseInt(hex.slice(5, 7), 16)
	]);
	return Array.from({ length: n }, (_, i) => {
		const t = i / (n - 1);
		let k = 0;
		while (k < rgb.length - 2 && t > rgb[k + 1][0]) k++;
		const [p0, r0, g0, b0] = rgb[k],
			[p1, r1, gg1, b1] = rgb[k + 1];
		const u = Math.min(1, Math.max(0, (t - p0) / (p1 - p0)));
		return `rgb(${Math.round(r0 + (r1 - r0) * u)},${Math.round(g0 + (gg1 - g0) * u)},${Math.round(b0 + (b1 - b0) * u)})`;
	});
}
const COAL = ramp([
	[0, '#0d0807'],
	[0.22, '#2b100a'],
	[0.45, '#7a210c'],
	[0.62, '#d4481a'],
	[0.78, '#ff8a2e'],
	[0.9, '#ffc266'],
	[1, '#fff3d1']
]);
const CAP = ramp([
	[0, '#1f0407'],
	[0.3, '#6d0716'],
	[0.5, '#c80f2b'],
	[0.65, '#fa1d3c'],
	[0.8, '#ff5a3a'],
	[0.92, '#ffa061'],
	[1, '#ffe6c2']
]);
const ASH = ramp([
	[0, '#0a0909'],
	[0.4, '#1c1412'],
	[0.7, '#4a2016'],
	[1, '#a2401c']
]);
const LUTS = [ASH, COAL, CAP];
const LUT32 = LUTS.map((lut) =>
	Uint32Array.from(lut, (c) => {
		const [r, g, b] = c.match(/\d+/g).map(Number);
		return ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0;
	})
);

function flameSprites(makeCanvas) {
	return [
		['255,255,245', '255,236,170'],
		['255,244,190', '255,196,90'],
		['255,214,120', '255,140,40'],
		['255,160,60', '240,80,20'],
		['240,100,30', '190,40,20'],
		['200,60,25', '120,20,15']
	].map(([core, edge]) => {
		const c = makeCanvas(64, 64);
		const g = c.getContext('2d'),
			gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
		gr.addColorStop(0, `rgba(${core},1)`);
		gr.addColorStop(0.35, `rgba(${edge},.75)`);
		gr.addColorStop(1, `rgba(${edge},0)`);
		g.fillStyle = gr;
		g.fillRect(0, 0, 64, 64);
		return c;
	});
}

function createFire2D(cv, makeCanvas, sprites) {
	const ctx = cv.getContext('2d');
	const g1 = makeCanvas(1, 1),
		g1c = g1.getContext('2d');
	const g2 = makeCanvas(1, 1),
		g2c = g2.getContext('2d');
	const cellCv = makeCanvas(1, 1),
		cellCtx = cellCv.getContext('2d');
	const gapCv = makeCanvas(1, 1),
		gapCtx = gapCv.getContext('2d');
	const flameCv = makeCanvas(1, 1),
		flameCtx = flameCv.getContext('2d');
	let W = 1,
		H = 1,
		dpr = 1,
		cs = 6,
		n = 0,
		flaming = false,
		cellImg = null,
		cellBuf = new Uint32Array(0),
		CIDX = new Uint32Array(0),
		gridCols = 1,
		gridRows = 1,
		rowTop = 0,
		rowSpan = 1;
	return {
		dispose() {},
		layout(width, height, ratio, size, CX, CY, count) {
			W = width;
			H = height;
			dpr = ratio;
			cs = size;
			n = count;
			cv.width = Math.round(W * dpr);
			cv.height = Math.round(H * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			g1.width = Math.max(1, cv.width >> 2);
			g1.height = Math.max(1, cv.height >> 2);
			g2.width = Math.max(1, Math.round(cv.width / 10));
			g2.height = Math.max(1, Math.round(cv.height / 10));
			gridCols = Math.max(1, Math.ceil(W / cs) + 1);
			gridRows = Math.max(1, Math.ceil(H / cs) + 1);
			cellCv.width = gridCols;
			cellCv.height = gridRows;
			cellImg = cellCtx.createImageData(gridCols, gridRows);
			cellBuf = new Uint32Array(cellImg.data.buffer);
			CIDX = new Uint32Array(n);
			for (let i = 0; i < n; i++) {
				const col = Math.round(CX[i] / cs),
					row = Math.round(CY[i] / cs);
				CIDX[i] =
					row >= 0 && row < gridRows && col >= 0 && col < gridCols ? row * gridCols + col : 0;
			}
			let lo = gridRows,
				hi = 0;
			for (let i = 0; i < n; i++) {
				const row = (CIDX[i] / gridCols) | 0;
				if (row < lo) lo = row;
				if (row > hi) hi = row;
			}
			rowTop = Math.min(lo, hi);
			rowSpan = Math.max(1, hi - rowTop + 1);
			gapCv.width = cv.width;
			gapCv.height = Math.max(1, Math.ceil(rowSpan * cs * dpr));
			gapCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
			gapCtx.fillStyle = '#000';
			for (let c = 0; c < gridCols; c++) gapCtx.fillRect(c * cs + cs - 1, 0, 1, rowSpan * cs);
			for (let r = 0; r < rowSpan; r++) gapCtx.fillRect(0, r * cs + cs - 1, W, 1);
			flameCv.width = Math.max(1, cv.width >> 1);
			flameCv.height = Math.max(1, cv.height >> 1);
			flameCtx.setTransform(dpr / 2, 0, 0, dpr / 2, 0, 0);
			flameCtx.globalCompositeOperation = 'lighter';
			flameCtx.globalAlpha = 0.002;
			for (const sprite of sprites) flameCtx.drawImage(sprite, 0, 0, 8, 8);
			flameCtx.globalAlpha = 1;
			ctx.globalCompositeOperation = 'lighter';
			ctx.drawImage(flameCv, 0, 0, 8, 8);
			ctx.globalCompositeOperation = 'source-over';
		},
		begin() {
			flaming = false;
			ctx.clearRect(0, 0, W, H);
		},
		cells(colors) {
			for (let i = 0; i < n; i++) cellBuf[CIDX[i]] = colors[i];
			cellCtx.putImageData(cellImg, 0, 0, 0, rowTop, gridCols, rowSpan);
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(
				cellCv,
				0,
				rowTop,
				gridCols,
				rowSpan,
				0,
				rowTop * cs,
				gridCols * cs,
				rowSpan * cs
			);
			ctx.imageSmoothingEnabled = true;
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.globalCompositeOperation = 'destination-out';
			ctx.drawImage(gapCv, 0, Math.round(rowTop * cs * dpr));
			ctx.restore();
			ctx.globalCompositeOperation = 'lighter';
		},
		ember(x, y, size, lut, index, alpha) {
			ctx.globalAlpha = alpha;
			ctx.fillStyle = LUTS[lut][index];
			ctx.fillRect(x - size / 2, y - size / 2, size, size);
		},
		flamesBegin() {
			flaming = true;
			flameCtx.clearRect(0, 0, W, H);
		},
		flame(index, x, y, size, alpha) {
			flameCtx.globalAlpha = alpha;
			flameCtx.drawImage(sprites[index], x - size / 2, y - size * 0.7, size, size * 1.35);
		},
		end(glowA, glowB) {
			if (flaming) {
				ctx.globalAlpha = 1;
				ctx.drawImage(flameCv, 0, 0, W, H);
			}
			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = 'source-over';
			g1c.clearRect(0, 0, g1.width, g1.height);
			g1c.drawImage(cv, 0, 0, g1.width, g1.height);
			g2c.clearRect(0, 0, g2.width, g2.height);
			g2c.drawImage(g1, 0, 0, g2.width, g2.height);
			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.globalCompositeOperation = 'lighter';
			ctx.imageSmoothingEnabled = true;
			ctx.globalAlpha = glowA;
			ctx.drawImage(g1, 0, 0, cv.width, cv.height);
			ctx.globalAlpha = glowB;
			ctx.drawImage(g2, 0, 0, cv.width, cv.height);
			ctx.restore();
		}
	};
}

function createFireRenderer(cv, makeCanvas, maxEmbers, maxFlames) {
	const sprites = flameSprites(makeCanvas);
	const atlas = makeCanvas(64 * sprites.length, 64);
	const a = atlas.getContext('2d');
	sprites.forEach((sprite, i) => a.drawImage(sprite, i * 64, 0));
	const options = { atlas, lut32: LUT32, maxEmbers, maxFlames };
	try {
		const probe = createFireGL(makeCanvas(1, 1), options);
		if (probe) {
			probe.dispose();
			const gl = createFireGL(cv, options);
			if (gl) return gl;
		}
	} catch {
		return createFire2D(cv, makeCanvas, sprites);
	}
	return createFire2D(cv, makeCanvas, sprites);
}

function createEmbers(cv, makeCanvas, reduce, onIgnite) {
	const MAX_EMBERS = 900,
		MAX_FLAMES = 380;
	const gfx = createFireRenderer(cv, makeCanvas, MAX_EMBERS, MAX_FLAMES);
	const E = {
		x: new Float32Array(MAX_EMBERS),
		y: new Float32Array(MAX_EMBERS),
		vx: new Float32Array(MAX_EMBERS),
		vy: new Float32Array(MAX_EMBERS),
		life: new Float32Array(MAX_EMBERS),
		dur: new Float32Array(MAX_EMBERS),
		s: new Float32Array(MAX_EMBERS),
		heat: new Float32Array(MAX_EMBERS),
		spin: new Float32Array(MAX_EMBERS),
		cap: new Uint8Array(MAX_EMBERS),
		n: 0
	};
	const F = {
		x: new Float32Array(MAX_FLAMES),
		y: new Float32Array(MAX_FLAMES),
		vx: new Float32Array(MAX_FLAMES),
		vy: new Float32Array(MAX_FLAMES),
		life: new Float32Array(MAX_FLAMES),
		dur: new Float32Array(MAX_FLAMES),
		s: new Float32Array(MAX_FLAMES),
		ph: new Float32Array(MAX_FLAMES),
		n: 0
	};
	let N = 0,
		CX,
		CY,
		CK,
		CB,
		CPH,
		CFR,
		CFL,
		CSP,
		CH,
		CC = new Uint32Array(0),
		HOT = new Uint32Array(0);

	const blaze = { t0: -1e9, dur: BLAZE_MS, cool: 0, k: 0, from: 0 };
	let lastFire = 0;
	const fan = {
		dir: 0,
		peak: 0,
		lastX: 0,
		flips: [],
		heat: 0,
		lastFlip: -1e9,
		kicks: 0,
		kx: 0,
		ky: 0
	};
	let W = 0,
		H = 0,
		dpr = 1,
		cs = 6,
		acc = 0,
		burst = 0,
		lastT = 0,
		ready = false;
	const ptr = { x: -9999, y: -9999, vx: 0, vy: 0, t: 0, on: false };

	function layout(width, height, footH, ratio) {
		W = width;
		H = height;
		dpr = Math.min(2, ratio || 1);
		const base = H - footH + 4;
		const pileH = H * (W < 700 ? 0.62 : 0.66);
		const lr = GRID.rows,
			lc = GRID.cols;
		cs = Math.max(3, Math.floor(Math.min(pileH * 0.8, (W * 0.88 * lr) / lc) / lr));
		const lw = lc * cs;
		const cols = Math.ceil(W / cs),
			cx = W / 2;
		const mound = new Uint8Array(cols);
		for (let c = 0; c < cols; c++) {
			const d = (c * cs + cs / 2 - cx) / (lw * 0.7);
			const n = Math.sin(c * 0.37) * 0.8 + Math.sin(c * 0.11 + 2) * 1.1;
			mound[c] = Math.max(1, Math.round(2.2 + 5.5 * Math.exp(-d * d) + n));
		}
		const centerCol = Math.floor(cx / cs);
		const left = centerCol - Math.floor(lc / 2);
		const bottomRow = Math.floor(base / cs) - Math.round(mound[centerCol] * 0.6);
		const topRow = bottomRow - lr;
		const baseRow = Math.floor(base / cs);
		const list = [];
		const taken = new Set();
		for (let j = 0; j < lr; j++)
			for (let i = 0; i < lc; i++) {
				const kind = +GRID.cells[j * lc + i];
				if (!kind) continue;
				const col = left + i,
					row = topRow + j;
				taken.add(col * 4096 + row);
				list.push(
					col * cs,
					row * cs,
					kind,
					kind === 2 ? 0.58 + Math.random() * 0.26 : 0.44 + Math.random() * 0.3,
					0.6 + Math.random() * 2.4
				);
			}
		for (let c = 0; c < cols; c++)
			for (let k = 0; k < mound[c]; k++) {
				const row = baseRow - 1 - k;
				if (taken.has(c * 4096 + row)) continue;
				list.push(
					c * cs,
					row * cs,
					0,
					(k === mound[c] - 1 ? 0.5 : 0.25) + Math.random() * 0.4,
					0.4 + Math.random() * 1.8
				);
			}
		N = list.length / 5;
		CX = new Float32Array(N);
		CY = new Float32Array(N);
		CK = new Uint8Array(N);
		CB = new Float32Array(N);
		CFR = new Float32Array(N);
		CPH = new Float32Array(N);
		CFL = new Float32Array(N);
		CSP = new Float32Array(N);
		CH = new Float32Array(N);
		let hot = 0;
		for (let i = 0; i < N; i++) {
			CX[i] = list[i * 5];
			CY[i] = list[i * 5 + 1];
			CK[i] = list[i * 5 + 2];
			CB[i] = list[i * 5 + 3];
			CFR[i] = list[i * 5 + 4];
			CPH[i] = Math.random() * 6.28;
			if (CK[i]) hot++;
		}
		HOT = new Uint32Array(hot);
		for (let i = 0, h = 0; i < N; i++) if (CK[i]) HOT[h++] = i;
		CC = new Uint32Array(N);
		gfx.layout(W, H, dpr, cs, CX, CY, N);
		E.n = 0;
		F.n = 0;
		ready = true;
	}

	function spawn(i, kick) {
		if (E.n >= MAX_EMBERS) return;
		const j = E.n++;
		E.x[j] = CX[i] + cs / 2;
		E.y[j] = CY[i] + cs / 2;
		E.vx[j] = (Math.random() - 0.5) * 20;
		E.vy[j] = -30 - Math.random() * 50 - kick * Math.random();
		E.life[j] = 1;
		E.dur[j] = 2 + Math.random() * 3.5;
		E.s[j] = cs * (0.45 + Math.random() * 0.5);
		E.heat[j] = Math.min(1, CH[i] + 0.15);
		E.cap[j] = CK[i] === 2 ? 1 : 0;
		E.spin[j] = Math.random() * 6.28;
		CSP[i] = 0.55;
	}
	function spawnFlame(k) {
		if (F.n >= MAX_FLAMES || !HOT.length) return;
		const fromLogo = Math.random() < 0.72;
		const i = fromLogo ? HOT[(Math.random() * HOT.length) | 0] : (Math.random() * N) | 0;
		const j = F.n++;
		const big = (fromLogo ? 1 : 0.8) * (cs * 3.2 + Math.random() * cs * 5) * (0.45 + 0.55 * k);
		F.x[j] = CX[i] + cs / 2 + (Math.random() - 0.5) * cs * 2;
		F.y[j] = CY[i];
		F.vx[j] = (Math.random() - 0.5) * 30;
		F.vy[j] = -(140 + Math.random() * 220) * (H / 700) * (0.55 + 0.45 * k);
		F.life[j] = 1;
		F.dur[j] = 0.5 + Math.random() * 0.8;
		F.s[j] = big;
		F.ph[j] = Math.random() * 6.28;
	}

	function frame(now) {
		const t = now / 1000;
		const dt = Math.min(0.05, lastT ? (now - lastT) / 1000 : 0.016);
		lastT = now;
		const dec = Math.pow(0.95, dt * 60),
			rec = Math.pow(0.982, dt * 60);
		gfx.begin();

		const speed = Math.hypot(ptr.vx, ptr.vy);
		const R = Math.max(110, W * 0.09),
			R2 = R * R;
		fan.heat = Math.max(0, fan.heat - dt * (now - fan.lastFlip < 450 ? 0.06 : 0.32));
		const bt = (now - blaze.t0) / blaze.dur;
		if (bt >= 0 && bt <= 1) {
			const u = Math.min(1, (now - blaze.t0) / 400),
				rise = blaze.from + (1 - blaze.from) * (1 - (1 - u) * (1 - u));
			blaze.k = rise * Math.min(1, (1 - bt) / 0.35);
		} else blaze.k = 0;
		const warm = fan.heat * fan.heat;
		const fire = Math.max(blaze.k, warm * 0.5);
		lastFire = fire;
		const lift = fan.heat * 0.26;
		const fanning = ptr.on && speed > 20;
		const kicking = fan.kicks > 0;
		const kx = fan.kx,
			ky = fan.ky,
			KR2 = R2 * 1.4;
		if (kicking) fan.kicks--;
		for (let i = 0; i < N; i++) {
			const x = CX[i],
				y = CY[i],
				kind = CK[i];
			const ph = CPH[i],
				fr = CFR[i];
			const n = Math.sin(t * fr + ph) * 0.5 + Math.sin(t * fr * 2.3 + ph * 1.7) * 0.3;
			if (fanning) {
				const dx = x - ptr.x,
					dy = y - ptr.y,
					d2 = dx * dx + dy * dy;
				if (d2 < R2) {
					const f = 1 - Math.sqrt(d2) / R;
					CFL[i] = Math.max(CFL[i], f * Math.min(0.6, speed / 1100));
					if (kind && Math.random() < (f * speed) / 60000) spawn(i, 0);
				}
			}
			if (kicking) {
				const dx = x - kx,
					dy = y - ky,
					d2 = dx * dx + dy * dy;
				if (d2 < KR2) {
					const f = 1 - Math.sqrt(d2 / KR2);
					CFL[i] = Math.max(CFL[i], 0.45 * f + 0.15 * fan.heat);
					if (kind && Math.random() < f * 0.05) spawn(i, 90);
				}
			}
			let h = CB[i] + n * 0.13 + CFL[i] - CSP[i] + lift * (kind ? 1 : 0.6);
			if (blaze.k)
				h += ((kind ? 0.8 + 0.16 * (n > 0 ? n : 0) : 0.72) - h) * blaze.k * (kind ? 0.9 : 0.6);
			h = h < 0 ? 0 : h > 1 ? 1 : h;
			CH[i] = h;
			CFL[i] *= dec;
			CSP[i] *= rec;
			CC[i] = LUT32[kind][(h * 95) | 0];
		}
		gfx.cells(CC);

		if (!reduce) {
			acc += dt * (W / 1000) * 38 * (1 + Math.min(2, speed / 800) + fire * 5);
			let guard = 0;
			while (acc >= 1 && guard++ < 40) {
				const i = (Math.random() * N) | 0;
				if (CK[i] && CH[i] > 0.55) {
					spawn(i, 0);
					acc -= 1;
				} else acc -= 0.25;
			}
			if (burst > 0) {
				const b = Math.min(burst, 14);
				burst -= b;
				for (let k = 0; k < b; k++) spawn(HOT[(Math.random() * HOT.length) | 0], 120);
			}
			const pon = ptr.on,
				px = ptr.x,
				py = ptr.y,
				pvx = ptr.vx * 0.8,
				pvy = ptr.vy * 0.8,
				follow = Math.min(1, dt * 6),
				PR2 = R2 * 1.6,
				PR = R * 1.26;
			const drag = Math.pow(0.985, dt * 60);
			for (let j = E.n - 1; j >= 0; j--) {
				let x = E.x[j],
					y = E.y[j],
					vx = E.vx[j],
					vy = E.vy[j];
				const a = x * 0.011 + t * 0.35,
					b = y * 0.013 - t * 0.22,
					c2 = x * 0.027 - y * 0.019 + t * 0.6;
				const dpsiY = -Math.sin(a) * Math.sin(b) * 0.013 - 0.5 * Math.cos(c2) * 0.019;
				const dpsiX = Math.cos(a) * 0.011 * Math.cos(b) + 0.5 * Math.cos(c2) * 0.027;
				vx += dpsiY * 900 * dt;
				vy += -dpsiX * 900 * dt - 36 * dt;
				if (pon) {
					const dx = x - px,
						dy = y - py,
						d2 = dx * dx + dy * dy;
					if (d2 < PR2) {
						const d = Math.sqrt(d2) || 1,
							f = 1 - d / PR;
						vx += ((pvx - vx) * follow + (dx / d) * 380 * dt) * f;
						vy += ((pvy - vy) * follow + (dy / d) * 380 * dt) * f;
					}
				}
				vx *= drag;
				vy *= drag;
				x += vx * dt;
				y += vy * dt;
				const life = E.life[j] - dt / E.dur[j];
				if (life <= 0 || y < -20 || x < -20 || x > W + 20) {
					const l = --E.n;
					E.x[j] = E.x[l];
					E.y[j] = E.y[l];
					E.vx[j] = E.vx[l];
					E.vy[j] = E.vy[l];
					E.life[j] = E.life[l];
					E.dur[j] = E.dur[l];
					E.s[j] = E.s[l];
					E.heat[j] = E.heat[l];
					E.spin[j] = E.spin[l];
					E.cap[j] = E.cap[l];
					continue;
				}
				E.x[j] = x;
				E.y[j] = y;
				E.vx[j] = vx;
				E.vy[j] = vy;
				E.life[j] = life;
				const heat = E.heat[j] * (0.35 + 0.65 * life) + Math.sin(t * 9 + E.spin[j]) * 0.05;
				const sz = E.s[j] * (0.35 + 0.65 * life);
				gfx.ember(
					x,
					y,
					sz,
					E.cap[j] ? 2 : 1,
					heat <= 0 ? 0 : heat >= 1 ? 95 : (heat * 95) | 0,
					life > 0.625 ? 1 : life * 1.6
				);
			}
			if (fire > 0.01 || F.n) drawFlames(dt, t, fire);
		}

		const glow = Math.max(blaze.k, fan.heat * 0.45);
		gfx.end(0.5 + glow * 0.14, 0.55 + glow * 0.16);

		ptr.vx *= Math.pow(0.88, dt * 60);
		ptr.vy *= Math.pow(0.88, dt * 60);
	}
	function drawFlames(dt, t, k) {
		gfx.flamesBegin();
		const want = k * (W / 1000) * 520 * dt;
		for (let i = 0; i < want; i++) spawnFlame(k);
		const pull = ptr.on ? ptr.vx * 0.04 * dt : 0,
			damp = Math.pow(0.96, dt * 60);
		for (let j = F.n - 1; j >= 0; j--) {
			const life = F.life[j] - dt / F.dur[j];
			if (life <= 0) {
				const l = --F.n;
				F.x[j] = F.x[l];
				F.y[j] = F.y[l];
				F.vx[j] = F.vx[l];
				F.vy[j] = F.vy[l];
				F.life[j] = F.life[l];
				F.dur[j] = F.dur[l];
				F.s[j] = F.s[l];
				F.ph[j] = F.ph[l];
				continue;
			}
			F.life[j] = life;
			let vx = F.vx[j] + Math.sin(t * 7 + F.ph[j] + F.y[j] * 0.02) * 260 * dt + pull;
			const x = F.x[j] + vx * dt,
				y = F.y[j] + F.vy[j] * dt;
			F.vx[j] = vx * damp;
			F.x[j] = x;
			F.y[j] = y;
			const age = 1 - life;
			const sz = F.s[j] * (age < 0.2 ? 0.5 + age * 2.5 : 1 - (age - 0.2) * 0.7);
			gfx.flame(age >= 0.8333 ? 5 : (age * 6) | 0, x, y, sz, Math.min(1, life * 2.2) * 0.44);
		}
	}
	function ignite(now) {
		if (now < blaze.cool) return;
		blaze.t0 = now;
		blaze.from = lastFire;
		blaze.cool = now + blaze.dur + 10000;
		if (!reduce) burst = Math.round(HOT.length * 0.08);
		onIgnite();
	}
	function detectFan(nx, ny, now, dt) {
		if (ny < H * 0.3 || ny > H + 20) {
			fan.flips.length = 0;
			return;
		}
		const dx = nx - fan.lastX;
		fan.lastX = nx;
		if (Math.abs(dx) < 3) return;
		const dir = dx > 0 ? 1 : -1;
		fan.peak = Math.max(fan.peak, Math.abs(dx) / dt);
		if (dir !== fan.dir) {
			if (fan.dir && fan.peak > 650) {
				fan.flips.push(now);
				fan.lastFlip = now;
				if (now >= blaze.cool) {
					fan.heat = Math.min(1, fan.heat + 0.22);
					fan.kicks = 3;
					fan.kx = nx;
					fan.ky = ny;
				}
			}
			fan.dir = dir;
			fan.peak = 0;
			while (fan.flips.length && now - fan.flips[0] > 1200) fan.flips.shift();
			if (fan.flips.length >= 4 && fan.heat >= 0.7) {
				fan.flips.length = 0;
				ignite(now);
			}
		}
	}
	function track(nx, ny, now) {
		const dt = Math.max(8, now - ptr.t) / 1000;
		if (ptr.on && now - ptr.t < 120) {
			ptr.vx = ptr.vx * 0.5 + ((nx - ptr.x) / dt) * 0.5;
			ptr.vy = ptr.vy * 0.5 + ((ny - ptr.y) / dt) * 0.5;
		}
		detectFan(nx, ny, now, dt);
		ptr.x = nx;
		ptr.y = ny;
		ptr.t = now;
		ptr.on = ny > -80 && ny < H + 40;
	}
	function flareAround(x, y, R, amt, chance, lift) {
		for (let i = 0; i < N; i++) {
			const d = lift
				? Math.abs(CX[i] - x) + Math.max(0, H - CY[i] - H * 0.5) * 0.6
				: Math.hypot(CX[i] - x, CY[i] - y);
			if (d < R) {
				CFL[i] = Math.max(CFL[i], amt * (1 - d / R));
				if (CK[i] && Math.random() < chance * (1 - d / R)) spawn(i, 120);
			}
		}
	}
	return {
		get ready() {
			return ready;
		},
		layout(width, height, footH, ratio) {
			layout(width, height, footH, ratio);
			lastT = 0;
		},
		frame,
		track,
		press(nx, ny, now) {
			track(nx, ny, now);
			if (!ptr.on || reduce || !N) return;
			flareAround(ptr.x, ptr.y, Math.max(160, W * 0.14), 0.7, 0.12, false);
		},
		hover(x) {
			if (!ready || reduce) return;
			flareAround(x, 0, Math.max(140, W * 0.1), 0.55, 0.05, true);
		},
		restart() {
			lastT = 0;
		}
	};
}

export function createScene({ paint, embers, makeCanvas, raf, reduce, timeShift = 0, emit }) {
	const now = () => performance.now();
	const bg = createPaint(paint, makeCanvas);
	const fire = createEmbers(embers, makeCanvas, reduce, () => emit({ type: 'ignite' }));
	let alive = true,
		pending = 0,
		hidden = false,
		footerLive = false,
		pitVisible = false;

	const animating = () => alive && !reduce && !hidden;
	function tick(t) {
		pending = 0;
		if (!animating()) return;
		const paintOn = bg.ready && !footerLive;
		const fireOn = fire.ready && pitVisible;
		if (paintOn) bg.frame(t);
		if (fireOn) fire.frame(t);
		if (paintOn || fireOn) pending = raf(tick);
	}
	function wake() {
		if (!pending && animating()) pending = raf(tick);
	}

	const handlers = {
		paint({ vw, vh, dpr, colors }) {
			bg.setColors(colors, now());
			bg.resize(vw, vh, dpr, now());
			emit({ type: 'paint-ready' });
			wake();
		},
		resize({ vw, vh, dpr }) {
			if (bg.ready) bg.resize(vw, vh, dpr, now());
		},
		colors({ colors, id }) {
			bg.setColors(colors, now());
			raf(() => emit({ type: 'painted', id }));
		},
		pit({ width, height, footH, dpr }) {
			fire.layout(width, height, footH, dpr);
			fire.frame(now());
			wake();
		},
		run(state) {
			if ('hidden' in state) hidden = state.hidden;
			if ('footerLive' in state) footerLive = state.footerLive;
			if ('pitVisible' in state) {
				if (state.pitVisible && !pitVisible) fire.restart();
				pitVisible = state.pitVisible;
			}
			wake();
		},
		pointer({ samples }) {
			for (let i = 0; i < samples.length; i += 3)
				fire.track(samples[i], samples[i + 1], samples[i + 2] + timeShift);
		},
		press({ x, y, t }) {
			fire.press(x, y, t + timeShift);
		},
		hover({ x }) {
			fire.hover(x);
		},
		stop() {
			alive = false;
		}
	};
	return {
		handle(msg) {
			handlers[msg.type]?.(msg);
		}
	};
}
