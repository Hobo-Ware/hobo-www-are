import { createMosaic, createPaint } from './scene.js';

const raf = self.requestAnimationFrame
	? (fn) => self.requestAnimationFrame(fn)
	: (fn) => setTimeout(() => fn(performance.now()), 16);
const makeCanvas = (w, h) => new OffscreenCanvas(w, h);

let paint = null,
	mosaic = null,
	reduce = false,
	drowsy = 0,
	paintOn = true,
	mosaicOn = false,
	pending = null,
	looping = false,
	trace = null,
	pendingDrawn = [],
	fontReady = null;

function loadFonts(syneUrl) {
	if (!self.fonts || typeof FontFace === 'undefined') return Promise.resolve();
	const faces = [
		new FontFace('Syne Mono', `url(${syneUrl})`),
		new FontFace('Syne Mono Fallback', "local('Courier New')", {
			sizeAdjust: '91.65%',
			ascentOverride: '100.93%',
			descentOverride: '30%',
			lineGapOverride: '0%'
		})
	];
	return Promise.all(
		faces.map((f) =>
			f
				.load()
				.then((loaded) => self.fonts.add(loaded))
				.catch(() => {})
		)
	);
}

function loop(now) {
	looping = false;
	if (paint && paintOn) paint.frame(now, drowsy, reduce);
	if (mosaic && mosaicOn && mosaic.laidOut && !reduce) {
		mosaic.tick(now, drowsy);
		if (trace) trace.push(now);
	}
	if (pendingDrawn.length) {
		pendingDrawn.forEach((id) => self.postMessage({ type: 'drawn', id }));
		pendingDrawn = [];
	}
	schedule();
}
function schedule() {
	if (looping) return;
	const wants =
		(paint && paintOn && !reduce) || (mosaic && mosaicOn && !reduce) || pendingDrawn.length;
	if (!wants) return;
	looping = true;
	raf(loop);
}

async function layoutMosaic(size) {
	await fontReady;
	if (!mosaic.init()) {
		self.postMessage({ type: 'fail', which: 'mosaic' });
		mosaic = null;
		return;
	}
	mosaic.layout(size.W, size.H, size.dpr, performance.now());
	schedule();
}

const handlers = {
	init(m) {
		reduce = m.reduce;
		fontReady = loadFonts(m.fontUrl);
		if (m.paint) {
			paint = createPaint(m.paint, { makeCanvas });
			paint.setColors(m.paintColors);
			paint.resize(m.view.w, m.view.h, m.view.scale);
			paint.frame(performance.now(), drowsy, true);
		}
		if (m.mosaic) {
			mosaic = createMosaic(m.mosaic, {
				makeCanvas,
				lines: m.lines,
				mosaic: { grid: new Uint8Array(m.grid), rows: m.rows, cols: m.cols, aspect: m.aspect },
				reduce,
				later: (fn, ms) => setTimeout(fn, ms)
			});
			mosaic.setColors(m.mosaicColors, performance.now());
		}
		schedule();
	},
	theme(m) {
		const now = performance.now();
		if (paint) {
			paint.setColors(m.paintColors);
			paint.frame(now, drowsy, true);
		}
		if (mosaic) mosaic.setColors(m.mosaicColors, now);
		pendingDrawn.push(m.id);
		schedule();
	},
	view(m) {
		if (!paint) return;
		paint.resize(m.w, m.h, m.scale);
		paint.frame(performance.now(), drowsy, true);
	},
	mosaicSize(m) {
		if (!mosaic) return;
		pending = m;
		if (!mosaicOn && !mosaic.laidOut) return;
		if (mosaic.laidOut) mosaic.layout(m.W, m.H, m.dpr, performance.now());
		else layoutMosaic(m);
	},
	mosaicVisible(m) {
		mosaicOn = m.on;
		if (!mosaic) return;
		if (m.on && !mosaic.laidOut && pending) layoutMosaic(pending);
		else if (m.on && reduce && mosaic.laidOut) mosaic.render(performance.now());
		schedule();
	},
	paintVisible(m) {
		paintOn = m.on;
		schedule();
	},
	pointer(m) {
		if (mosaic) mosaic.pointer(m.x, m.y, performance.now());
	},
	leave() {
		if (mosaic) mosaic.leave();
	},
	down(m) {
		if (mosaic) mosaic.down(m.x, m.y, performance.now());
	},
	rewrite(m) {
		if (mosaic) mosaic.rewrite(m.text, performance.now());
	},
	unforce() {
		if (mosaic) mosaic.unforce();
	},
	drowsy(m) {
		drowsy = m.k;
	},
	freeze(m) {
		const now = performance.now();
		if (paint) paint.frame(now, drowsy, true);
		if (mosaic && mosaic.laidOut) mosaic.render(now);
		const grab = (c) => (c && c.width > 1 ? createImageBitmap(c).catch(() => null) : null);
		Promise.all([
			grab(paint && paint.canvas),
			grab(mosaic && mosaic.laidOut && mosaic.canvas)
		]).then(([p, q]) =>
			self.postMessage({ type: 'frozen', id: m.id, paint: p, mosaic: q }, [p, q].filter(Boolean))
		);
	},
	trace(m) {
		if (m.on) trace = [];
		else {
			self.postMessage({ type: 'trace', frames: trace || [] });
			trace = null;
		}
	}
};

self.onmessage = (e) => handlers[e.data.type]?.(e.data);
