import { createScene } from './scene.js';

const raf = self.requestAnimationFrame
	? (fn) => self.requestAnimationFrame(fn)
	: (fn) => setTimeout(() => fn(performance.now()), 16);

let scene = null;

self.onmessage = ({ data }) => {
	if (data.type !== 'init') return scene?.handle(data);
	scene = createScene({
		paint: data.paint,
		embers: data.embers,
		makeCanvas: (w, h) => new OffscreenCanvas(w, h),
		raf,
		reduce: data.reduce,
		timeShift: data.timeOrigin - performance.timeOrigin,
		emit: (msg) => self.postMessage(msg)
	});
	self.postMessage({ type: 'ready' });
};
