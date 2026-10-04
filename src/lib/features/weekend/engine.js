import MOSAIC from './mosaic.json';
import { createMosaic, createPaint, readMosaicColors, readPaintColors } from './scene.js';
import syneUrl from '@fontsource/syne-mono/files/syne-mono-latin-400-normal.woff2?url';
import { attachLens } from './lens.js';
import { isDark, switchTheme } from '$lib/features/site/theme';

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const lazyLog = { slept: false, woke: false };

export function mount(rootEl, copy) {
	const HYPE = copy.hype,
		SKILLS = copy.skills,
		LEVELS = copy.levels;
	const $ = (s) => rootEl.querySelector(s),
		$$ = (s) => rootEl.querySelectorAll(s);
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	let alive = true;
	const frames = new Set(),
		timers = new Set(),
		observers = [],
		cleanups = [];
	const raf = (fn) => {
		const id = requestAnimationFrame((t) => {
			frames.delete(id);
			if (alive) fn(t);
		});
		frames.add(id);
		return id;
	};
	const later = (fn, ms) => {
		const id = setTimeout(() => {
			timers.delete(id);
			if (alive) fn();
		}, ms);
		timers.add(id);
		return id;
	};
	const listen = (t, type, fn, o) => {
		t.addEventListener(type, fn, o);
		cleanups.push(() => t.removeEventListener(type, fn, o));
	};
	const afterPaint = (fn) => raf(() => later(fn, 0));
	const observe = (el, fn, opts) => {
		if (!('IntersectionObserver' in window)) {
			fn(true);
			return;
		}
		const io = new IntersectionObserver(([en]) => fn(en.isIntersecting), opts);
		io.observe(el);
		observers.push(io);
	};

	rootEl.classList.add('mode-weekend');
	$$('.sigil').forEach((s) => {
		s.classList.remove('busy', 'done');
		s.style.removeProperty('--we-p');
	});
	$('#we-cab').classList.remove('full');
	$('#we-cnt').textContent = '0';
	$$('.tarot').forEach((c) => {
		c.classList.remove('flipped');
		c.querySelector('.front').inert = false;
		c.querySelector('.back').inert = true;
	});
	$('#we-year').textContent = new Date().getFullYear();
	const dreamAnim = $('#we-dream-anim');
	if (reduce && dreamAnim) dreamAnim.remove();

	const themeListeners = [];
	const css = (k) =>
		getComputedStyle(rootEl)
			.getPropertyValue('--' + k)
			.trim();
	function syncThemeUi() {
		$('#we-theme-lbl').textContent = isDark() ? copy.dreaming : copy.awake;
		return Promise.all(themeListeners.map((fn) => fn()));
	}
	listen($('#we-theme'), 'click', (e) => {
		const origin = e.currentTarget;
		scene.freeze().then(() => switchTheme(origin, '#d6479f', syncThemeUi));
	});

	const clockEl = $('#we-clock');
	const tickClock = () => {
		clockEl.textContent = copy.clock(new Date());
		later(tickClock, 60000 - (Date.now() % 60000) + 50);
	};
	afterPaint(tickClock);

	const sleep = { k: 0, target: 0 };
	const drowsy = () => {
		const k = sleep.k;
		return k * k * (3 - 2 * k);
	};

	(() => {
		const logo = $('.logo');
		const orbit = $('#we-cab');
		const wave = $('#we-wave');
		const INNER = 0.33;
		const SIGMA = 0.52;
		const state = [...logo.querySelectorAll('.px')].map((el) => ({
			el,
			x: 0,
			y: 0,
			r: 0,
			seed: Math.random() * 100,
			speed: 0.05 + Math.random() * 0.09,
			spin: (Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 34),
			a: 0,
			rest: null,
			mass: 0.045 + Math.random() * 0.045,
			g: 0,
			gv: 0
		}));
		const angDiff = (a, b) => {
			let d = (a - b) % (Math.PI * 2);
			if (d > Math.PI) d -= Math.PI * 2;
			if (d < -Math.PI) d += Math.PI * 2;
			return d;
		};
		const ring = (a, t) => {
			let r = 1 + (reduce ? 0 : 0.006 * Math.sin(t * 0.5) + 0.004 * Math.sin(2 * a + t * 0.3));
			for (const s of state) {
				const d = angDiff(a, s.a) / SIGMA;
				r += s.mass * s.g * Math.exp(-d * d);
			}
			return r;
		};
		const base = Math.random() * Math.PI * 2;
		state.forEach((s, i) => {
			s.a = base + (i * Math.PI * 2) / state.length + (Math.random() - 0.5) * 0.35;
		});
		let together = false,
			geo = null,
			visible = true,
			running = false;
		const start = performance.now();
		let pxWrap = null;
		cleanups.push(() => {
			state.forEach((s) => {
				s.path.style.removeProperty('visibility');
				s.el = s.path;
			});
			pxWrap?.remove();
		});
		state.forEach((s) => {
			s.path = s.el;
		});
		function lift(s, b) {
			if (!pxWrap) {
				pxWrap = document.createElement('div');
				pxWrap.className = 'logo-px';
				pxWrap.setAttribute('aria-hidden', 'true');
				logo.after(pxWrap);
			}
			const ov = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			ov.setAttribute('class', 'pxs');
			ov.setAttribute('viewBox', `${b.x} ${b.y} ${b.width} ${b.height}`);
			const path = s.path.cloneNode(true);
			path.removeAttribute('class');
			path.removeAttribute('style');
			ov.appendChild(path);
			Object.assign(ov.style, {
				left: `${b.x / 5.412}%`,
				top: `${b.y / 3.986}%`,
				width: `${b.width / 5.412}%`,
				height: `${b.height / 3.986}%`
			});
			pxWrap.appendChild(ov);
			s.path.style.visibility = 'hidden';
			s.el = ov;
		}
		function drawWave(t) {
			let d = '';
			for (let i = 0; i <= 96; i++) {
				const a = (i / 96) * Math.PI * 2,
					r = 100 * INNER * ring(a, t);
				d += `${i ? 'L' : 'M'}${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`;
			}
			wave.setAttribute('d', d + 'Z');
		}
		function measure() {
			const lr = logo.getBoundingClientRect(),
				or = orbit.getBoundingClientRect();
			if (!lr.width) return;
			const scale = lr.width / 541.2;
			geo = {
				cx: (or.left + or.width / 2 - lr.left) / scale,
				cy: (or.top + or.height / 2 - lr.top) / scale,
				r: (or.width * INNER) / scale,
				scale
			};
			state.forEach((s) => {
				const b = s.path.getBBox();
				if (s.el === s.path) lift(s, b);
				s.rest = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
			});
		}
		function gravity(ease, dt, snap) {
			for (const s of state) {
				const target = together ? 0 : ease * (1 - 0.85 * drowsy());
				if (snap) {
					s.g = target;
					s.gv = 0;
					continue;
				}
				s.gv += (target - s.g) * 60 * dt;
				s.gv *= Math.pow(0.02, dt);
				s.g += s.gv * dt;
			}
		}
		function place(t, ease, dt, snap) {
			if (!geo) measure();
			if (!geo) return;
			const lazy = 1 - 0.93 * drowsy();
			for (const s of state) {
				s.a += s.speed * dt * ease * lazy;
				s.tum = (s.tum || 0) + s.spin * dt * lazy;
			}
			for (const s of state) {
				const rad = geo.r * ring(s.a, t);
				const tx = geo.cx + Math.cos(s.a) * rad - s.rest.x;
				const ty = geo.cy + Math.sin(s.a) * rad - s.rest.y;
				const drift = together ? 0 : ease;
				const nr = reduce ? 0 : drift * (Math.sin(t * 0.6 + s.seed) * 25 + s.tum);
				const k = snap ? 1 : together ? 0.16 : 0.14;
				s.x += (tx * drift - s.x) * k;
				s.y += (ty * drift - s.y) * k;
				s.r += (nr - s.r) * k;
				s.el.style.transform = `translate(${(s.x * geo.scale).toFixed(2)}px, ${(s.y * geo.scale).toFixed(2)}px) rotate(${s.r.toFixed(1)}deg)`;
			}
		}
		const setTogether = (v) => {
			together = v;
			if (reduce) {
				gravity(1, 0, true);
				drawWave(0);
				place(0, 1, 0, true);
			}
		};
		listen(logo, 'pointerenter', (e) => e.pointerType !== 'touch' && setTogether(true));
		listen(logo, 'pointerleave', (e) => e.pointerType !== 'touch' && setTogether(false));
		listen(logo, 'touchstart', () => setTogether(!together), { passive: true });
		listen(window, 'resize', () => {
			geo = null;
			if (reduce) {
				drawWave(0);
				place(0, 1, 0, true);
			}
		});
		drawWave(0);
		if (reduce) {
			afterPaint(() => {
				gravity(1, 0, true);
				drawWave(0);
				place(0, 1, 0, true);
			});
			return;
		}
		let last = start;
		function tick(now) {
			if (!visible) {
				running = false;
				return;
			}
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			const t = (now - start) / 1000;
			const out = Math.min(1, Math.max(0, (t - 0.6) / 1.2));
			const ease = 1 - Math.pow(1 - out, 3);
			gravity(ease, dt, false);
			place(t, ease, dt, false);
			drawWave(t);
			raf(tick);
		}
		const run = () => {
			if (!running) {
				running = true;
				last = performance.now();
				raf(tick);
			}
		};
		observe(orbit, (on) => {
			visible = on;
			if (on) run();
		});
		run();
	})();

	const logEl = $('#we-log');
	let run = 0,
		current = -1;
	const wait = (ms, id) =>
		new Promise((res, rej) => later(() => (id === run ? res() : rej('stale')), reduce ? 0 : ms));
	const MAX_LINES = 7;
	function addLine(skill, attr, cls) {
		[...logEl.children].forEach((li) => li.classList.add('past'));
		while (logEl.children.length >= MAX_LINES) logEl.firstElementChild.remove();
		const li = document.createElement('li');
		li.className = 'line new' + (cls ? ' ' + cls : '');
		li.innerHTML = `<span class="speaker" data-attr="${attr}">${skill}</span><span class="check"><span></span></span> <span class="said"></span>`;
		logEl.appendChild(li);
		return li;
	}
	async function roll(li, id, fixed) {
		const c = li.querySelector('.check'),
			s = c.firstElementChild;
		c.classList.add('rolling');
		const end = performance.now() + 600;
		while (performance.now() < end && !reduce) {
			s.textContent = copy.check(pick(LEVELS), Math.random() < 0.5);
			await wait(60, id);
		}
		c.classList.remove('rolling');
		const fail = !fixed && Math.random() < 0.15;
		s.textContent = fixed || copy.check(pick(LEVELS.slice(0, 6)), !fail);
		c.classList.toggle('fail', fail);
	}
	async function type(li, text, id) {
		const el = li.querySelector('.said');
		el.classList.add('typing');
		if (reduce) {
			el.textContent = text;
			el.classList.remove('typing');
			return;
		}
		for (let i = 1; i <= text.length; i++) {
			el.textContent = text.slice(0, i);
			await wait(/[.,!?]/.test(text[i - 1]) ? 130 : 26, id);
		}
		el.classList.remove('typing');
	}
	async function play(forced, epilogue) {
		const id = ++run;
		let idx = forced;
		if (idx == null) {
			do {
				idx = Math.floor(Math.random() * HYPE.length);
			} while (idx === current && HYPE.length > 1);
		}
		current = idx;
		const entry = HYPE[idx];
		try {
			let prev;
			for (const msg of entry.messages) {
				let s;
				do {
					s = pick(SKILLS);
				} while (s === prev);
				prev = s;
				const li = addLine(s[0], s[1]);
				await roll(li, id);
				await type(li, msg, id);
				await wait(500 + msg.length * 14, id);
			}
			const li = addLine('Hoboware', 'hobo', 'slogan');
			await roll(li, id, copy.legendary);
			await type(li, entry.slogan.trim(), id);
			if (epilogue) {
				await wait(900, id);
				const e = addLine(copy.epilogue.skill, 'psyche');
				await roll(e, id, copy.epilogue.check);
				await type(e, epilogue, id);
			}
		} catch (e) {
			if (e !== 'stale') throw e;
		}
	}
	current = +logEl.dataset.entry;
	listen($('#we-reroll'), 'click', () => play());
	listen($('#we-to-founders'), 'click', (e) => {
		e.preventDefault();
		$('#we-founders').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
	});
	listen(window, 'keydown', (e) => {
		if (
			e.metaKey ||
			e.ctrlKey ||
			e.altKey ||
			e.target.closest('input, textarea, select, [contenteditable]')
		)
			return;
		const opts = $$('.options li > *');
		const n = parseInt(e.key, 10);
		if (n >= 1 && n <= opts.length) opts[n - 1].click();
	});

	(() => {
		const cab = $('#we-cab');
		const cnt = $('#we-cnt');
		const caption = $('#we-caption');
		const HINT = caption.textContent;
		const esc = (s) =>
			s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
		let done = 0,
			hovered = null,
			busy = null,
			busyText = '',
			reward = null,
			rewardTimer;
		function render() {
			const s = hovered || busy || reward;
			caption.classList.toggle('thought', !!s);
			caption.style.removeProperty('--hue');
			if (!s) {
				caption.textContent = HINT;
				return;
			}
			caption.style.setProperty('--hue', s.style.getPropertyValue('--hue'));
			const entry = HYPE[+s.dataset.entry];
			if (s === busy && (!hovered || hovered === busy))
				caption.innerHTML = `<span><span class="tag">${esc(copy.internalizing)}</span>${esc(busyText)}</span>`;
			else if (s.classList.contains('done'))
				caption.innerHTML = `<span><span class="tag">${esc(s.dataset.bonus)}</span><span class="fx">${esc(entry.slogan.trim())}</span></span>`;
			else caption.innerHTML = `<span>“${esc(entry.messages[0])}”</span>`;
		}
		$$('.sigil').forEach((sigil) => {
			const idx = +sigil.dataset.entry;
			const entry = HYPE[idx];
			const lit = [...sigil.querySelectorAll('.glyph i.on')];
			const total = +sigil.dataset.minutes;
			const enter = () => {
				hovered = sigil;
				render();
			};
			const leave = () => {
				if (hovered === sigil) {
					hovered = null;
					render();
				}
			};
			listen(sigil, 'pointerenter', enter);
			listen(sigil, 'focus', enter);
			listen(sigil, 'pointerleave', leave);
			listen(sigil, 'blur', leave);
			listen(sigil, 'click', () => {
				if (sigil.classList.contains('busy')) return;
				if (sigil.classList.contains('done')) {
					play(idx);
					return;
				}
				sigil.classList.add('busy');
				busy = sigil;
				const dur = reduce ? 0 : 2200,
					t0 = performance.now();
				const step = (now) => {
					const p = dur ? Math.min(1, (now - t0) / dur) : 1;
					sigil.style.setProperty('--we-p', p.toFixed(3));
					lit.forEach((el, k) => el.classList.toggle('lit', p >= (k + 1) / (lit.length + 1)));
					const left = Math.round(total * (1 - p));
					busyText = `${Math.floor(left / 60)}h ${String(left % 60).padStart(2, '0')}m`;
					if (busy === sigil) render();
					if (p < 1) return raf(step);
					sigil.classList.remove('busy');
					sigil.classList.add('done');
					sigil.setAttribute(
						'aria-label',
						copy.sigilDone(entry.messages[0], sigil.dataset.bonus, entry.slogan.trim())
					);
					if (busy === sigil) busy = null;
					reward = sigil;
					clearTimeout(rewardTimer);
					rewardTimer = later(() => {
						reward = null;
						render();
					}, 5000);
					render();
					done++;
					cnt.textContent = done;
					if (done === 8) {
						cab.classList.add('full');
						play(idx, copy.epilogue.text);
					} else play(idx);
				};
				raf(step);
			});
		});
	})();

	const detachLenses = [];
	$$('.tarot').forEach((card) => {
		card.tabIndex = 0;
		const front = card.querySelector('.front'),
			back = card.querySelector('.back');
		const tilt = card.querySelector('.tilt');
		const win = card.querySelector('.window');
		const grads = [...card.querySelectorAll('.foil-grad')];
		detachLenses.push(attachLens(win, { photo: win.querySelector('img') }));
		const isFlipped = () => card.classList.contains('flipped');
		const toggle = () => {
			const to = !isFlipped();
			card.classList.toggle('flipped', to);
			front.inert = to;
			back.inert = !to;
			['--rx', '--ry'].forEach((k) => tilt.style.removeProperty(k));
		};
		listen(card, 'click', (e) => {
			if (!e.target.closest('a')) toggle();
		});
		listen(card.querySelector('.turn-back'), 'click', (e) => {
			e.stopPropagation();
			toggle();
			card.focus({ preventScroll: true });
		});
		listen(card, 'keydown', (e) => {
			if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
				e.preventDefault();
				toggle();
			}
			if (e.key === 'Escape' && isFlipped()) {
				toggle();
				card.focus({ preventScroll: true });
			}
		});
		const shine = (x, y) => {
			const dx = (x - 0.5) * 260,
				dy = (y - 0.5) * 220;
			grads.forEach((g) =>
				g.setAttribute('gradientTransform', `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`)
			);
		};
		const move = (e) => {
			const r = card.getBoundingClientRect();
			const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
				y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
			card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
			card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
			card.style.setProperty('--fx', (x * 100).toFixed(1) + '%');
			card.style.setProperty('--fy', (y * 100).toFixed(1) + '%');
			shine(x, y);
			if (reduce) return;
			tilt.style.setProperty('--rx', ((0.5 - y) * 12).toFixed(2) + 'deg');
			tilt.style.setProperty('--ry', ((x - 0.5) * 14).toFixed(2) + 'deg');
		};
		listen(card, 'pointermove', (e) => {
			if (e.pointerType === 'mouse') move(e);
		});
		listen(card, 'pointerleave', () => {
			['--rx', '--ry'].forEach((k) => tilt.style.removeProperty(k));
			shine(0.5, 0.5);
		});
	});

	const scene = (() => {
		const stack = $('.mosaic-stack');
		const lines = HYPE.flatMap((h) => [...h.messages, h.slogan.trim()]);
		const SCALE = Math.min(devicePixelRatio || 1, 2);
		const dprNow = () => Math.min(2, devicePixelRatio || 1);
		const makeCanvas = (w, h) => {
			const c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			return c;
		};
		const replaceCanvas = (old) => {
			const fresh = old.cloneNode(false);
			old.replaceWith(fresh);
			return fresh;
		};
		const decodeGrid = () => Uint8Array.from(atob(MOSAIC.grid), (c) => c.charCodeAt(0));
		const fontReady = () => {
			if (!document.fonts) return Promise.resolve();
			return Promise.race([
				document.fonts.load('12px "Syne Mono"').catch(() => {}),
				new Promise((r) => later(r, 1200))
			]);
		};
		let pageLeft = 0,
			pageTop = 0,
			mosaicVisible = false,
			pointerX = 0,
			pointerY = 0,
			pointerOver = false;
		const mosaicCanvas = () => $('#we-mosaic');
		function measurePage() {
			const r = mosaicCanvas().getBoundingClientRect();
			pageLeft = r.left + scrollX;
			pageTop = r.top + scrollY;
		}
		function paintGlow() {
			const cv = mosaicCanvas();
			const W = cv.clientWidth,
				H = cv.clientHeight;
			if (!W) return;
			const glow = isDark() ? '148,116,255,.16' : '214,71,159,.10';
			stack.style.background = `radial-gradient(circle ${Math.round(Math.min(W, H) * 0.55)}px at 50% 50%, rgba(${glow}), rgba(${glow.replace(/,[^,]+$/, ',0')}))`;
		}
		const local = () => [pointerX + scrollX - pageLeft, pointerY + scrollY - pageTop];

		function mainPaint(cv) {
			const p = createPaint(cv, { makeCanvas });
			let started = false;
			function loop(now) {
				if (!document.hidden) p.frame(now, drowsy());
				raf(loop);
			}
			return {
				start() {
					started = true;
					p.setColors(readPaintColors(css, isDark()));
					p.resize(innerWidth, innerHeight, SCALE);
					p.frame(performance.now(), drowsy(), true);
					cv.classList.add('on');
					listen(window, 'resize', () => {
						p.resize(innerWidth, innerHeight, SCALE);
						p.frame(performance.now(), drowsy(), true);
					});
					if (!reduce) raf(loop);
				},
				refresh() {
					if (!started) return;
					p.setColors(readPaintColors(css, isDark()));
					p.frame(performance.now(), drowsy(), true);
				}
			};
		}

		function mainMosaic(cv) {
			const m = createMosaic(cv, {
				makeCanvas,
				replaceCanvas,
				lines,
				mosaic: { grid: decodeGrid(), rows: MOSAIC.rows, cols: MOSAIC.cols, aspect: MOSAIC.aspect },
				reduce,
				later
			});
			m.setColors(readMosaicColors(css, isDark()), performance.now());
			let running = false;
			const layout = () => {
				const el = m.canvas;
				m.layout(el.clientWidth, el.clientHeight, dprNow(), performance.now());
				measurePage();
				paintGlow();
			};
			function tick(now) {
				if (!mosaicVisible || !alive) {
					running = false;
					return;
				}
				m.tick(now, drowsy());
				raf(tick);
			}
			function startLoop() {
				if (!running && m.laidOut && m.ready) {
					running = true;
					raf(tick);
				}
			}
			listen(m.canvas, 'webglcontextlost', (e) => {
				e.preventDefault();
				m.contextLost();
			});
			listen(m.canvas, 'webglcontextrestored', () => m.contextRestored(performance.now()));
			let rt;
			listen(window, 'resize', () => {
				clearTimeout(rt);
				rt = later(() => {
					if (m.laidOut) layout();
				}, 150);
			});
			return {
				visible(on) {
					if (!on) return;
					if (m.laidOut) {
						measurePage();
						return reduce ? m.render(performance.now()) : startLoop();
					}
					fontReady().then(() => {
						if (!alive || !m.init()) return;
						layout();
						if (!reduce) startLoop();
					});
				},
				pointer: () => m.pointer(...local(), performance.now()),
				leave: () => m.leave(),
				down: (x, y) => m.down(x, y, performance.now()),
				rewrite: (text) => m.rewrite(text, performance.now()),
				unforce: () => m.unforce(),
				refresh() {
					m.setColors(readMosaicColors(css, isDark()), performance.now());
					paintGlow();
				}
			};
		}

		function workerScene() {
			const paintCv = $('#we-paint'),
				mosaicCv = mosaicCanvas();
			let worker;
			try {
				worker = new Worker(new URL('./scene.worker.js', import.meta.url), { type: 'module' });
			} catch {
				return null;
			}
			const offPaint = paintCv.transferControlToOffscreen();
			const offMosaic = mosaicCv.transferControlToOffscreen();
			const grid = decodeGrid();
			let sizeSent = false,
				pointerQueued = false,
				nextId = 1;
			const waiting = new Map();
			const frozen = [];
			const thaw = () => frozen.splice(0).forEach((c) => c.remove());
			const overlay = (bitmap, parent) => {
				if (!bitmap) return;
				const c = document.createElement('canvas');
				c.width = bitmap.width;
				c.height = bitmap.height;
				c.className = 'on';
				c.setAttribute('aria-hidden', 'true');
				c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
				c.getContext('bitmaprenderer').transferFromImageBitmap(bitmap);
				parent.append(c);
				frozen.push(c);
			};
			const post = (msg, transfer) => worker.postMessage(msg, transfer || []);
			const sendSize = () => {
				const cv = mosaicCanvas();
				if (!cv.clientWidth) return;
				post({ type: 'mosaicSize', W: cv.clientWidth, H: cv.clientHeight, dpr: dprNow() });
				sizeSent = true;
			};
			const host = {
				paint: {
					start() {
						paintCv.classList.add('on');
					},
					refresh() {}
				},
				mosaic: {
					visible(on) {
						if (on) {
							if (!sizeSent) sendSize();
							measurePage();
							paintGlow();
						}
						post({ type: 'mosaicVisible', on });
					},
					pointer() {
						if (pointerQueued) return;
						pointerQueued = true;
						raf(() => {
							pointerQueued = false;
							if (!pointerOver) return;
							const [x, y] = local();
							post({ type: 'pointer', x, y });
						});
					},
					leave: () => post({ type: 'leave' }),
					down: (x, y) => post({ type: 'down', x, y }),
					rewrite: (text) => post({ type: 'rewrite', text }),
					unforce: () => post({ type: 'unforce' }),
					refresh() {
						paintGlow();
					}
				},
				freeze() {
					const id = nextId++;
					post({ type: 'freeze', id });
					return new Promise((resolve) => {
						waiting.set(id, (m) => {
							thaw();
							overlay(m.paint, paintCv.parentElement);
							overlay(m.mosaic, stack);
							resolve();
						});
						later(() => {
							if (waiting.delete(id)) resolve();
						}, 120);
					});
				},
				theme() {
					const id = nextId++;
					post({
						type: 'theme',
						id,
						paintColors: readPaintColors(css, isDark()),
						mosaicColors: readMosaicColors(css, isDark())
					});
					return new Promise((resolve) => {
						const done = () => {
							thaw();
							resolve();
						};
						waiting.set(id, done);
						later(() => {
							if (waiting.delete(id)) done();
						}, 160);
					});
				},
				drowsy: (k) => post({ type: 'drowsy', k }),
				start() {
					post(
						{
							type: 'init',
							reduce,
							fontUrl: new URL(syneUrl, location.href).href,
							paint: offPaint,
							mosaic: offMosaic,
							view: { w: innerWidth, h: innerHeight, scale: SCALE },
							paintColors: readPaintColors(css, isDark()),
							mosaicColors: readMosaicColors(css, isDark()),
							lines,
							grid: grid.buffer,
							rows: MOSAIC.rows,
							cols: MOSAIC.cols,
							aspect: MOSAIC.aspect
						},
						[offPaint, offMosaic, grid.buffer]
					);
					paintCv.classList.add('on');
					listen(window, 'resize', () =>
						post({ type: 'view', w: innerWidth, h: innerHeight, scale: SCALE })
					);
					let rt;
					listen(window, 'resize', () => {
						clearTimeout(rt);
						rt = later(() => {
							sendSize();
							measurePage();
							paintGlow();
						}, 150);
					});
					listen(document, 'visibilitychange', () =>
						post({ type: 'paintVisible', on: !document.hidden })
					);
					listen(rootEl, 'we-trace', (e) => post({ type: 'trace', on: e.detail.on }));
				}
			};
			worker.onmessage = (e) => {
				const m = e.data;
				if (m.type === 'drawn' || m.type === 'frozen') {
					waiting.get(m.id)?.(m);
					waiting.delete(m.id);
				} else if (m.type === 'trace') {
					rootEl.dispatchEvent(new CustomEvent('we-trace-result', { detail: m.frames }));
				} else if (m.type === 'fail') fallBack(m.which);
			};
			worker.onerror = () => {
				fallBack('paint');
				fallBack('mosaic');
			};
			cleanups.push(() => {
				worker.terminate();
				thaw();
			});
			return host;
		}

		const canWork =
			typeof OffscreenCanvas !== 'undefined' &&
			typeof Worker !== 'undefined' &&
			'transferControlToOffscreen' in HTMLCanvasElement.prototype;
		const viaWorker = canWork ? workerScene() : null;
		let paint = viaWorker ? viaWorker.paint : mainPaint($('#we-paint'));
		let mosaic = viaWorker ? viaWorker.mosaic : mainMosaic(mosaicCanvas());
		let started = false;
		const fellBack = new Set();
		function fallBack(which) {
			if (fellBack.has(which) || !alive) return;
			fellBack.add(which);
			if (which === 'paint') {
				paint = mainPaint(replaceCanvas($('#we-paint')));
				if (started) paint.start();
			} else {
				mosaic = mainMosaic(replaceCanvas(mosaicCanvas()));
				if (started && mosaicVisible) mosaic.visible(true);
			}
		}

		listen(
			stack,
			'pointermove',
			(e) => {
				pointerX = e.clientX;
				pointerY = e.clientY;
				pointerOver = true;
				mosaic.pointer();
			},
			{ passive: true }
		);
		listen(
			window,
			'scroll',
			() => {
				if (pointerOver) mosaic.pointer();
			},
			{ passive: true }
		);
		listen(
			stack,
			'pointerleave',
			() => {
				pointerOver = false;
				mosaic.leave();
			},
			{ passive: true }
		);
		listen(stack, 'pointerdown', (e) => {
			pointerX = e.clientX;
			pointerY = e.clientY;
			mosaic.down(...local());
		});
		$$('.proj').forEach((a) => {
			const on = () => mosaic.rewrite(a.dataset.rewrite);
			const off = () => mosaic.unforce();
			listen(a, 'pointerenter', on);
			listen(a, 'focus', on);
			listen(a, 'pointerleave', off);
			listen(a, 'blur', off);
		});

		return {
			start() {
				started = true;
				if (viaWorker) viaWorker.start();
				paint.start();
				observe(
					stack,
					(on) => {
						mosaicVisible = on;
						mosaic.visible(on);
					},
					{ rootMargin: '300px 0px' }
				);
			},
			refresh() {
				paint.refresh();
				mosaic.refresh();
				return viaWorker && fellBack.size < 2 ? viaWorker.theme() : undefined;
			},
			drowsy() {
				if (viaWorker) viaWorker.drowsy(drowsy());
			},
			freeze() {
				return viaWorker && fellBack.size < 2 ? viaWorker.freeze() : Promise.resolve();
			}
		};
	})();
	themeListeners.push(() => scene.refresh());

	(() => {
		const IDLE_MS = 20000;
		let timer = 0,
			stepping = false,
			sleeping = false;
		const step = (now) => {
			const dt = Math.min(0.05, (now - (step.last || now)) / 1000);
			step.last = now;
			const rate = sleep.target ? 1 / 3 : 1 / 0.8;
			sleep.k +=
				Math.sign(sleep.target - sleep.k) * Math.min(Math.abs(sleep.target - sleep.k), rate * dt);
			scene.drowsy();
			if (sleep.k !== sleep.target) raf(step);
			else {
				stepping = false;
				step.last = 0;
			}
		};
		const ease = () => {
			if (!stepping) {
				stepping = true;
				raf(step);
			}
		};
		async function say(skill, attr, check, text) {
			const id = ++run;
			try {
				const li = addLine(skill, attr);
				await roll(li, id, check);
				await type(li, text, id);
			} catch (e) {
				if (e !== 'stale') throw e;
			}
		}
		function fallAsleep() {
			if (document.hidden || sleeping) return;
			sleeping = true;
			sleep.target = 1;
			ease();
			rootEl.classList.remove('yawn');
			rootEl.classList.add('asleep');
			if (!lazyLog.slept) {
				lazyLog.slept = true;
				say(copy.sleep.skill, 'laziness', copy.sleep.check, copy.sleep.text);
			}
		}
		function wake() {
			sleeping = false;
			sleep.target = 0;
			ease();
			rootEl.classList.remove('asleep');
			if (!reduce) {
				rootEl.classList.add('yawn');
				later(() => rootEl.classList.remove('yawn'), 900);
			}
			if (!lazyLog.woke) {
				lazyLog.woke = true;
				say(copy.wake.skill, 'psyche', copy.wake.check, copy.wake.text);
			}
		}
		const arm = () => {
			clearTimeout(timer);
			timers.delete(timer);
			if (!document.hidden) timer = later(fallAsleep, IDLE_MS);
		};
		const poke = () => {
			if (sleeping) wake();
			arm();
		};
		['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach((t) =>
			listen(window, t, poke, { passive: true })
		);
		listen(document, 'visibilitychange', () => {
			if (document.hidden) {
				clearTimeout(timer);
			} else arm();
		});
		arm();
	})();

	syncThemeUi();
	afterPaint(() => scene.start());

	return function unmount() {
		alive = false;
		run++;
		frames.forEach((id) => cancelAnimationFrame(id));
		frames.clear();
		timers.forEach((id) => clearTimeout(id));
		timers.clear();
		observers.forEach((o) => o.disconnect());
		cleanups.forEach((fn) => fn());
		rootEl.classList.remove('asleep', 'yawn');
		detachLenses.forEach((fn) => fn());
	};
}
