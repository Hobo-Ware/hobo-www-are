import MOSAIC from './mosaic.json';
import { attachLens } from './lens.js';
import { isDark, toggleTheme } from '$lib/features/site/theme';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=?!/<>~';
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
		themeListeners.forEach((fn) => fn());
	}
	listen($('#we-theme'), 'click', () => {
		toggleTheme();
		syncThemeUi();
	});

	const sleep = { k: 0, target: 0 };
	const clear = (hex) => {
		const m = /^#?([0-9a-f]{6})$/i.exec(hex);
		if (!m) return 'rgba(0,0,0,0)';
		const v = parseInt(m[1], 16);
		return `rgba(${v >> 16},${(v >> 8) & 255},${v & 255},0)`;
	};
	const drowsy = () => {
		const k = sleep.k;
		return k * k * (3 - 2 * k);
	};

	const paint = (() => {
		const cv = $('#we-paint');
		const ctx = cv.getContext('2d');
		const strokes = document.createElement('canvas');
		const SCALE = Math.min(devicePixelRatio || 1, 2);
		const PX = SCALE / 0.5;
		let w = 0,
			h = 0,
			colors = {},
			last = 0,
			started = false;
		const blobs = Array.from({ length: 6 }, (_, i) => ({
			k: ['blob-a', 'blob-b', 'blob-c', 'blob-d', 'blob-b', 'blob-a'][i],
			ax: 0.15 + Math.random() * 0.7,
			ay: 0.1 + Math.random() * 0.8,
			rx: 0.14 + Math.random() * 0.2,
			ry: 0.12 + Math.random() * 0.2,
			sx: 0.00005 + Math.random() * 0.00007,
			sy: 0.00004 + Math.random() * 0.00007,
			ph: Math.random() * 6.28,
			r: 0.32 + Math.random() * 0.3
		}));
		const motes = Array.from({ length: 22 }, () => ({
			x: Math.random(),
			y: Math.random(),
			s: 0.4 + Math.random(),
			v: 0.00001 + Math.random() * 0.00002,
			ph: Math.random() * 6.28,
			k: Math.random() < 0.5 ? 'teal' : 'magenta'
		}));
		function readColors() {
			['bg', 'bg-deep', 'blob-a', 'blob-b', 'blob-c', 'blob-d', 'magenta', 'teal'].forEach(
				(k) => (colors[k] = css(k))
			);
			colors.k = parseFloat(css('stroke-k')) || 1;
			colors.light = !isDark();
			colors.clear = {};
			['blob-a', 'blob-b', 'blob-c', 'blob-d', 'magenta', 'teal'].forEach(
				(k) => (colors.clear[k] = clear(colors[k]))
			);
		}
		const vignette = document.createElement('canvas');
		function paintVignette() {
			vignette.width = w;
			vignette.height = h;
			const v = vignette.getContext('2d');
			const g2 = v.createRadialGradient(
				w / 2,
				h * 0.45,
				Math.min(w, h) * 0.25,
				w / 2,
				h / 2,
				Math.max(w, h) * 0.8
			);
			g2.addColorStop(0, clear(colors['bg-deep']));
			g2.addColorStop(1, colors['bg-deep']);
			v.fillStyle = g2;
			v.fillRect(0, 0, w, h);
		}
		function paintStrokes() {
			strokes.width = w;
			strokes.height = h;
			const s = strokes.getContext('2d');
			s.lineCap = 'round';
			const n = Math.round((w * h) / (1400 * PX * PX));
			for (let i = 0; i < n; i++) {
				const x = Math.random() * w,
					y = Math.random() * h,
					len = (30 + Math.random() * 120) * PX,
					a = Math.random() * 6.28;
				s.strokeStyle =
					Math.random() < 0.6 ? colors.bg : Math.random() < 0.5 ? colors.magenta : colors.teal;
				s.globalAlpha = (0.01 + Math.random() * 0.03) * colors.k;
				s.lineWidth = (3 + Math.random() * 18) * PX;
				s.beginPath();
				s.moveTo(x, y);
				s.bezierCurveTo(
					x + Math.cos(a) * len * 0.3 + 20 * PX,
					y + Math.sin(a) * len * 0.3 - 20 * PX,
					x + Math.cos(a + 1) * len * 0.7,
					y + Math.sin(a + 1) * len * 0.7,
					x + Math.cos(a) * len,
					y + Math.sin(a) * len
				);
				s.stroke();
			}
		}
		function resize() {
			w = Math.ceil(innerWidth * SCALE);
			h = Math.ceil(innerHeight * SCALE);
			cv.width = w;
			cv.height = h;
			paintStrokes();
			paintVignette();
			frame(performance.now(), true);
		}
		let vt = 0,
			vLast = performance.now();
		function frame(now, force) {
			if (!force && now - last < 33) return;
			last = now;
			vt += (now - vLast) * (1 - 0.88 * drowsy());
			vLast = now;
			const t = vt;
			ctx.globalCompositeOperation = 'source-over';
			ctx.globalAlpha = 1;
			ctx.fillStyle = colors.bg;
			ctx.fillRect(0, 0, w, h);
			for (const b of blobs) {
				const x = (b.ax + Math.sin(t * b.sx + b.ph) * b.rx) * w;
				const y = (b.ay + Math.cos(t * b.sy + b.ph) * b.ry) * h;
				const r = b.r * Math.max(w, h) * (1 + Math.sin(t * 0.0003 + b.ph) * 0.12);
				const g = ctx.createRadialGradient(x, y, 0, x, y, r);
				g.addColorStop(0, colors[b.k]);
				g.addColorStop(1, colors.clear[b.k]);
				ctx.globalAlpha = colors.light ? 0.55 : 0.8;
				ctx.fillStyle = g;
				const x0 = Math.max(0, x - r),
					y0 = Math.max(0, y - r);
				ctx.fillRect(x0, y0, Math.min(w, x + r) - x0, Math.min(h, y + r) - y0);
			}
			ctx.globalAlpha = colors.light ? 0.5 : 0.85 * colors.k;
			ctx.drawImage(vignette, 0, 0);
			ctx.globalAlpha = 1;
			ctx.drawImage(strokes, Math.sin(t * 0.00005) * 14 * PX, Math.cos(t * 0.00004) * 10 * PX);
			ctx.globalCompositeOperation = 'lighter';
			for (const m of motes) {
				const x = ((m.x + Math.sin(t * m.v * 3 + m.ph) * 0.04) % 1) * w;
				const y = ((m.y - t * m.v + 10) % 1) * h;
				const a = (0.25 + 0.25 * Math.sin(t * 0.001 + m.ph)) * colors.k * (1 - 0.65 * drowsy());
				const r = (2 + m.s * 3) * PX;
				const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
				g.addColorStop(0, colors[m.k]);
				g.addColorStop(1, colors.clear[m.k]);
				ctx.globalAlpha = a;
				ctx.fillStyle = g;
				ctx.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
			}
			ctx.globalCompositeOperation = 'source-over';
		}
		function loop(now) {
			if (!document.hidden) frame(now);
			raf(loop);
		}
		return {
			start() {
				started = true;
				readColors();
				resize();
				cv.classList.add('on');
				listen(window, 'resize', resize);
				if (!reduce) raf(loop);
			},
			refresh() {
				if (started)
					raf(() => {
						readColors();
						paintStrokes();
						paintVignette();
						frame(performance.now(), true);
					});
			}
		};
	})();
	themeListeners.push(() => paint.refresh());

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
		listen(logo, 'pointerenter', () => setTogether(true));
		listen(logo, 'pointerleave', () => setTogether(false));
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

	const mosaic = (() => {
		const stack = $('.mosaic-stack');
		let cv = $('#we-mosaic');
		const LINES = HYPE.flatMap((h) => [...h.messages, h.slogan.trim()]);
		const TEXT = LINES.join(' · ').replace(/\s+/g, ' ');
		const M = MOSAIC;
		const grid = Uint8Array.from(atob(M.grid), (c) => c.charCodeAt(0));
		const GLYPH_CODES = Uint16Array.from(GLYPHS, (c) => c.charCodeAt(0));
		const SPACE = 32,
			DOT = 0xb7;
		const HEAD = 1,
			RED = 2,
			ACTIVE = 4;
		const INK = 0,
			RED_C = 1,
			TEAL = 2,
			MAGENTA = 3;
		const DYN = 8;
		let W = 0,
			H = 0,
			dpr = 1,
			cs = 12,
			cols = 0,
			rows = 0,
			n = 0,
			colors = {},
			dark = true,
			fieldPx = 7;
		let chs,
			amt,
			flags,
			until,
			settle,
			heat,
			headIdx,
			headCount = 0,
			active,
			activeCount = 0,
			hitBuf,
			dyn,
			dirtyLo = 0,
			dirtyHi = -1;
		let zz = 0,
			visible = false,
			hasPointer = false,
			pClientX = 0,
			pClientY = 0,
			pageLeft = 0,
			pageTop = 0;
		let lastMove = -1e9,
			ghostT = 0,
			running = false,
			laidOut = false,
			forced = '';
		const writer = { line: '', pos: 0 };

		let gl = null,
			isGL2 = false,
			inst = null,
			prog = null,
			buffers = {},
			atlasTex = null,
			lost = false,
			flat = null;
		let codeOf, pxOf;
		const atlas = document.createElement('canvas');
		const spriteTab = new Float32Array(256 * 64 * 3);
		const slotOf = new Uint8Array(65536);
		const VS = `
      attribute vec2 a_corner; attribute vec3 a_cell; attribute vec4 a_spr; attribute vec4 a_par;
      uniform vec2 u_res; uniform float u_cs; uniform float u_time; uniform float u_wave; uniform vec2 u_atlas; uniform float u_halo; uniform float u_dpr;
      uniform vec3 u_colors[4];
      varying vec2 v_uv; varying vec2 v_q; varying vec3 v_col; varying float v_a;
      void main() {
        if (a_par.w < .5 || (u_halo > .5 && a_par.z < .5)) { gl_Position = vec4(2., 2., 0., 1.); return; }
        vec2 center = (a_cell.xy + .5) * u_cs;
        float wave = (a_cell.z > .5 && u_wave > .5) ? .7 + .3 * sin(u_time * 1.3 - a_cell.x * .07 - a_cell.y * .05) : 1.;
        float a = min(1., max(a_par.x * wave, a_par.y));
        float size = a_spr.z;
        if (u_halo > .5) {
          size = floor((size - 4. * u_dpr) / 1.35 * 1.9 + .5);
          float g = a_par.z < 1.5 ? .45 : a_par.z < 2.5 ? .7 : 1.;
          a *= g;
        }
        vec2 pos = floor(center - size * .5 + .5) + a_corner * size;
        v_uv = (a_spr.xy + a_corner * a_spr.z) / u_atlas;
        v_q = a_corner;
        int ci = int(a_spr.w + .5);
        v_col = ci == 0 ? u_colors[0] : ci == 1 ? u_colors[1] : ci == 2 ? u_colors[2] : u_colors[3];
        v_a = a;
        gl_Position = vec4(pos / u_res * vec2(2., -2.) + vec2(-1., 1.), 0., 1.);
      }`;
		const FS = `
      precision highp float;
      uniform sampler2D u_tex; uniform float u_halo;
      varying vec2 v_uv; varying vec2 v_q; varying vec3 v_col; varying float v_a;
      void main() {
        float m;
        if (u_halo > .5) { float d = length(v_q - .5) * 2.; m = .22 * (d < .25 ? 1. : max(0., 1. - (d - .25) / .75)); }
        else m = texture2D(u_tex, v_uv).a;
        float a = m * v_a;
        gl_FragColor = vec4(v_col * a, a);
      }`;
		function compile(type, src) {
			const s = gl.createShader(type);
			gl.shaderSource(s, src);
			gl.compileShader(s);
			return s;
		}
		function initGL() {
			gl = cv.getContext('webgl2', { premultipliedAlpha: true, antialias: false }) || null;
			isGL2 = !!gl;
			if (!gl) {
				gl = cv.getContext('webgl', { premultipliedAlpha: true, antialias: false });
				inst = gl && gl.getExtension('ANGLE_instanced_arrays');
				if (!inst) {
					gl = null;
					return false;
				}
			}
			prog = gl.createProgram();
			gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
			gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
			gl.linkProgram(prog);
			if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
				console.warn('mosaic: WebGL link failed', gl.getProgramInfoLog(prog));
				gl = null;
				return false;
			}
			gl.useProgram(prog);
			const loc = (k) => gl.getAttribLocation(prog, k);
			buffers.loc = {
				corner: loc('a_corner'),
				cell: loc('a_cell'),
				spr: loc('a_spr'),
				par: loc('a_par')
			};
			buffers.u = {};
			[
				'u_res',
				'u_cs',
				'u_time',
				'u_wave',
				'u_atlas',
				'u_halo',
				'u_dpr',
				'u_tex',
				'u_colors'
			].forEach((k) => (buffers.u[k] = gl.getUniformLocation(prog, k)));
			buffers.corner = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.corner);
			gl.bufferData(
				gl.ARRAY_BUFFER,
				new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
				gl.STATIC_DRAW
			);
			buffers.cell = gl.createBuffer();
			buffers.dyn = gl.createBuffer();
			atlasTex = gl.createTexture();
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
			return true;
		}
		const divisor = (l, d) =>
			isGL2 ? gl.vertexAttribDivisor(l, d) : inst.vertexAttribDivisorANGLE(l, d);
		const drawInst = (count) =>
			isGL2
				? gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, count)
				: inst.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, count);

		function useFlat() {
			flat = cv.getContext('2d');
			if (flat) return;
			const fresh = cv.cloneNode(false);
			cv.replaceWith(fresh);
			cv = fresh;
			flat = cv.getContext('2d');
		}
		function buildAtlas() {
			const codes = new Set();
			for (const ch of TEXT + GLYPHS + '·zZ') codes.add(ch.charCodeAt(0));
			codes.delete(SPACE);
			const maxPx = Math.min(63, Math.ceil(cs * 1.44 * 1.45) + 1);
			const pad = Math.ceil(2 * dpr);
			const AW = 2048;
			let x = 0,
				y = 0,
				rowH = 0;
			const place = [];
			for (const code of codes)
				for (let px = 4; px <= maxPx; px++) {
					const box = Math.ceil(px * 1.35 * dpr) + pad * 2;
					if (x + box > AW) {
						x = 0;
						y += rowH;
						rowH = 0;
					}
					place.push([code, px, x, y, box]);
					x += box;
					rowH = Math.max(rowH, box);
				}
			const AH = Math.min(8192, 1 << Math.ceil(Math.log2(y + rowH)));
			atlas.width = AW;
			atlas.height = AH;
			const a = atlas.getContext('2d');
			a.clearRect(0, 0, atlas.width, atlas.height);
			a.fillStyle = '#fff';
			a.textAlign = 'center';
			a.textBaseline = 'middle';
			let lastPx = -1;
			spriteTab.fill(0);
			slotOf.fill(0);
			let slots = 1;
			for (const code of codes) if (slots < 256) slotOf[code] = slots++;
			for (const [code, px, sx, sy, box] of place) {
				if (px !== lastPx) {
					a.font = `${Math.round(px * dpr)}px "Syne Mono", "Syne Mono Fallback", monospace`;
					lastPx = px;
				}
				a.fillText(String.fromCharCode(code), sx + box / 2, sy + box / 2);
				const k = (slotOf[code] * 64 + px) * 3;
				spriteTab[k] = sx;
				spriteTab[k + 1] = sy;
				spriteTab[k + 2] = box;
			}
			gl.bindTexture(gl.TEXTURE_2D, atlasTex);
			gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			atlas.width = atlas.height = 1;
			buffers.atlasSize = [AW, AH];
		}

		const hex = (h) => {
			const v = parseInt(h.replace('#', ''), 16);
			return [(v >> 16) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
		};
		function readColors() {
			dark = isDark();
			colors = {
				ink: css('mosaic-ink'),
				red: css('red'),
				teal: css('teal'),
				magenta: css('magenta'),
				field: parseFloat(css('mosaic-field')) || 0.07
			};
			colors.rgb = new Float32Array([
				...hex(colors.ink),
				...hex(colors.red),
				...hex(colors.teal),
				...hex(colors.magenta)
			]);
			const glow = dark ? '148,116,255,.16' : '214,71,159,.10';
			if (W)
				stack.style.background = `radial-gradient(circle ${Math.round(Math.min(W, H) * 0.55)}px at 50% 50%, rgba(${glow}), rgba(${glow.replace(/,[^,]+$/, ',0')}))`;
		}
		function measurePage() {
			const r = cv.getBoundingClientRect();
			pageLeft = r.left + scrollX;
			pageTop = r.top + scrollY;
		}
		const sample = (u, v) =>
			u < 0 || v < 0 || u >= 1 || v >= 1
				? 0
				: grid[Math.floor(v * M.rows) * M.cols + Math.floor(u * M.cols)];

		function put(i, code, px, color, alphaBase, minAlpha, glow, vis) {
			const o = i * DYN,
				k = (slotOf[code] * 64 + px) * 3;
			dyn[o] = spriteTab[k];
			dyn[o + 1] = spriteTab[k + 1];
			dyn[o + 2] = spriteTab[k + 2];
			dyn[o + 3] = color;
			dyn[o + 4] = alphaBase;
			dyn[o + 5] = minAlpha;
			dyn[o + 6] = glow;
			dyn[o + 7] = vis && (flat || spriteTab[k + 2] > 0) ? 1 : 0;
			codeOf[i] = code;
			pxOf[i] = px;
			if (i < dirtyLo) dirtyLo = i;
			if (i > dirtyHi) dirtyHi = i;
		}
		const clampPx = (px) => (px < 4 ? 4 : px > 63 ? 63 : px);
		function writeRest(i) {
			if (flags[i] & HEAD) {
				put(
					i,
					chs[i],
					clampPx(Math.round(cs * (dark ? 0.8 + 0.5 * amt[i] : 0.88 + 0.56 * amt[i]))),
					flags[i] & RED ? RED_C : INK,
					dark ? 0.5 + 0.5 * amt[i] : 0.72 + 0.4 * amt[i],
					0,
					0,
					chs[i] !== SPACE
				);
			} else put(i, chs[i], fieldPx, INK, colors.field, 0, 0, chs[i] !== SPACE && !until[i]);
		}

		function layout() {
			W = cv.clientWidth;
			H = cv.clientHeight;
			dpr = Math.min(2, devicePixelRatio || 1);
			if (!W || !H || !(gl || flat)) return;
			cs = W < 640 ? 7 : 10;
			cv.width = Math.round(W * dpr);
			cv.height = Math.round(H * dpr);
			cols = Math.ceil(W / cs);
			rows = Math.ceil(H / cs);
			n = cols * rows;
			chs = new Uint16Array(n);
			amt = new Float32Array(n);
			flags = new Uint8Array(n);
			until = new Float64Array(n);
			settle = new Float64Array(n);
			heat = new Float32Array(n);
			headIdx = new Int32Array(n);
			active = new Int32Array(n);
			hitBuf = new Int32Array(n);
			dyn = new Float32Array(n * DYN);
			codeOf = new Uint16Array(n);
			pxOf = new Uint8Array(n);
			headCount = 0;
			activeCount = 0;
			const hh = H * 0.92,
				hw = hh * M.aspect;
			const scale = Math.min(1, (W * 0.94) / hw);
			const dw = hw * scale,
				dh = hh * scale;
			const dx = (W - dw) / 2,
				dy = (H - dh) / 2 + (W < 640 ? cs * 1.5 : 0);
			const cellData = new Float32Array(n * 3);
			let hi = 0,
				fi = Math.floor(TEXT.length / 2);
			for (let y = 0, i = 0; y < rows; y++)
				for (let x = 0; x < cols; x++, i++) {
					const b = sample(((x + 0.5) * cs - dx) / dw, ((y + 0.5) * cs - dy) / dh);
					const a = (b >> 4) / 15;
					amt[i] = a;
					if (a > 0.12) {
						flags[i] = HEAD | ((b & 15) / 15 > 0.5 && a > 0.2 ? RED : 0);
						let code;
						do {
							code = TEXT.charCodeAt(hi++ % TEXT.length);
						} while (code === SPACE);
						chs[i] = code;
						headIdx[headCount++] = i;
					} else chs[i] = TEXT.charCodeAt(fi++ % TEXT.length);
					cellData[i * 3] = x;
					cellData[i * 3 + 1] = y;
					cellData[i * 3 + 2] = flags[i] & HEAD ? 1 : 0;
				}
			fieldPx = Math.max(4, Math.round(cs * 0.72));
			if (gl) buildAtlas();
			readColors();
			if (gl) bindCells(cellData);
			for (let i = 0; i < n; i++) writeRest(i);
			measurePage();
			laidOut = true;
			render(performance.now());
		}
		function bindCells(cellData) {
			const L = buffers.loc;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.cell);
			gl.bufferData(gl.ARRAY_BUFFER, cellData, gl.STATIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.dyn);
			gl.bufferData(gl.ARRAY_BUFFER, dyn.byteLength, gl.DYNAMIC_DRAW);
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.corner);
			gl.enableVertexAttribArray(L.corner);
			gl.vertexAttribPointer(L.corner, 2, gl.FLOAT, false, 0, 0);
			divisor(L.corner, 0);
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.cell);
			gl.enableVertexAttribArray(L.cell);
			gl.vertexAttribPointer(L.cell, 3, gl.FLOAT, false, 0, 0);
			divisor(L.cell, 1);
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.dyn);
			gl.enableVertexAttribArray(L.spr);
			gl.vertexAttribPointer(L.spr, 4, gl.FLOAT, false, DYN * 4, 0);
			divisor(L.spr, 1);
			gl.enableVertexAttribArray(L.par);
			gl.vertexAttribPointer(L.par, 4, gl.FLOAT, false, DYN * 4, 16);
			divisor(L.par, 1);
		}
		function activate(i) {
			if (flags[i] & ACTIVE) return;
			flags[i] |= ACTIVE;
			active[activeCount++] = i;
		}
		function nextLine() {
			writer.line = (forced || pick(LINES)) + ' · ';
			writer.pos = 0;
		}
		function disturb(px, py, R, now, burst) {
			const r2 = R * R;
			let hits = 0;
			const cx0 = Math.max(0, Math.floor((px - R) / cs)),
				cx1 = Math.min(cols - 1, Math.ceil((px + R) / cs));
			const cy0 = Math.max(0, Math.floor((py - R) / cs)),
				cy1 = Math.min(rows - 1, Math.ceil((py + R) / cs));
			for (let y = cy0; y <= cy1; y++)
				for (let x = cx0; x <= cx1; x++) {
					const i = y * cols + x;
					const ddx = (x + 0.5) * cs - px,
						ddy = (y + 0.5) * cs - py,
						d2 = ddx * ddx + ddy * ddy;
					if (d2 > r2) continue;
					const h = 1 - Math.sqrt(d2) / R;
					if (h > heat[i]) heat[i] = h;
					activate(i);
					if (!until[i] && (burst || now - settle[i] > 900)) hitBuf[hits++] = i;
				}
			if (!hits) return;
			if (!writer.line) nextLine();
			for (let k = 0; k < hits; k++) {
				const i = hitBuf[k];
				let code = writer.line.charCodeAt(writer.pos++);
				if (writer.pos >= writer.line.length) nextLine();
				if (flags[i] & HEAD && code === SPACE) code = DOT;
				chs[i] = code;
				until[i] = now + 160 + k * 14 + Math.random() * 180;
			}
		}
		function rewriteAll(text) {
			if (!laidOut) return;
			forced = text;
			nextLine();
			const now = performance.now();
			lastMove = now;
			for (let k = 0; k < headCount; k++) {
				const i = headIdx[k];
				const code = writer.line.charCodeAt(writer.pos++);
				if (writer.pos >= writer.line.length) writer.pos = 0;
				activate(i);
				chs[i] = code === SPACE ? DOT : code;
				heat[i] = 0.6;
				until[i] = reduce ? 0 : now + 80 + (((i / cols) | 0) / rows) * 700 + Math.random() * 160;
			}
			if (reduce) render(now);
		}
		function render(now) {
			if ((!gl && !flat) || lost || !laidOut) return;
			for (let k = 0; k < activeCount; k++) {
				const i = active[k];
				const isHead = flags[i] & HEAD;
				if (until[i] && now >= until[i]) {
					until[i] = 0;
					settle[i] = now;
				}
				const scrambling = until[i] > 0;
				const h = heat[i];
				if (!scrambling && h <= 0.02) {
					heat[i] = 0;
					flags[i] &= ~ACTIVE;
					active[k--] = active[--activeCount];
					writeRest(i);
					continue;
				}
				const code = scrambling ? GLYPH_CODES[(Math.random() * GLYPH_CODES.length) | 0] : chs[i];
				let px, alpha, color;
				if (isHead) {
					px = cs * (dark ? 0.8 + 0.5 * amt[i] : 0.88 + 0.56 * amt[i]) * (1 + h * 0.45);
					alpha = dark ? 0.5 + 0.5 * amt[i] : 0.72 + 0.4 * amt[i];
					color = flags[i] & RED ? RED_C : INK;
				} else {
					px = cs * 0.72 * (1 + h * 0.5);
					alpha = colors.field + h * 0.75;
					color = INK;
				}
				if (h > 0.05 && !(flags[i] & RED))
					color = ((i % cols) + ((i / cols) | 0)) % 3 === 0 ? MAGENTA : TEAL;
				if (scrambling) color = flags[i] & RED ? RED_C : TEAL;
				const glow = h > 0.3 && dark ? (h > 0.8 ? 3 : h > 0.55 ? 2 : 1) : 0;
				put(
					i,
					code,
					clampPx(Math.round(px)),
					color,
					alpha,
					scrambling ? 0.85 : 0,
					glow,
					code !== SPACE
				);
				heat[i] = code === SPACE ? h * 0.9 : h * 0.93;
			}
			if (flat) return drawFlat(now);
			if (dirtyHi >= dirtyLo) {
				gl.bindBuffer(gl.ARRAY_BUFFER, buffers.dyn);
				gl.bufferSubData(
					gl.ARRAY_BUFFER,
					dirtyLo * DYN * 4,
					dyn.subarray(dirtyLo * DYN, (dirtyHi + 1) * DYN)
				);
				dirtyLo = n;
				dirtyHi = -1;
			}
			const U = buffers.u;
			gl.viewport(0, 0, cv.width, cv.height);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.uniform2f(U.u_res, cv.width, cv.height);
			gl.uniform1f(U.u_cs, cs * dpr);
			gl.uniform1f(U.u_dpr, dpr);
			gl.uniform1f(U.u_time, now * 0.001);
			gl.uniform1f(U.u_wave, reduce ? 0 : 1);
			gl.uniform2f(U.u_atlas, buffers.atlasSize[0], buffers.atlasSize[1]);
			gl.uniform3fv(U.u_colors, colors.rgb);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, atlasTex);
			gl.uniform1i(U.u_tex, 0);
			if (dark) {
				gl.uniform1f(U.u_halo, 1);
				drawInst(n);
			}
			gl.uniform1f(U.u_halo, 0);
			drawInst(n);
		}
		function drawFlat(now) {
			const palette = [colors.ink, colors.red, colors.teal, colors.magenta];
			const t = now * 0.001;
			flat.setTransform(dpr, 0, 0, dpr, 0, 0);
			flat.clearRect(0, 0, W, H);
			flat.textAlign = 'center';
			flat.textBaseline = 'middle';
			let font = -1,
				fill = -1;
			for (let i = 0; i < n; i++) {
				const o = i * DYN;
				if (!dyn[o + 7]) continue;
				const x = i % cols,
					y = (i / cols) | 0;
				const wave =
					flags[i] & HEAD && !reduce ? 0.7 + 0.3 * Math.sin(t * 1.3 - x * 0.07 - y * 0.05) : 1;
				const alpha = Math.min(1, Math.max(dyn[o + 4] * wave, dyn[o + 5]));
				if (alpha < 0.004) continue;
				if (pxOf[i] !== font) {
					font = pxOf[i];
					flat.font = `${font}px "Syne Mono", "Syne Mono Fallback", monospace`;
				}
				if (dyn[o + 3] !== fill) {
					fill = dyn[o + 3];
					flat.fillStyle = palette[fill];
				}
				flat.globalAlpha = alpha;
				flat.fillText(String.fromCharCode(codeOf[i]), (x + 0.5) * cs, (y + 0.5) * cs);
			}
			flat.globalAlpha = 1;
		}
		function tick(now) {
			if (!visible || !alive) {
				running = false;
				return;
			}
			if (drowsy() > 0.5 && !reduce) {
				forced = 'z Z z';
				zz += 1 / 60;
				const span = H * 0.42;
				disturb(
					W / 2 + W * 0.1 + Math.sin(zz * 1.7) * 26,
					H * 0.36 - ((zz * 30) % span),
					W < 640 ? 26 : 38,
					now
				);
			} else if (now - lastMove > 3500 && !reduce) {
				if (forced === 'z Z z') forced = '';
				ghostT += 1 / 60;
				disturb(
					W / 2 + Math.sin(ghostT * 0.45) * W * 0.22,
					H / 2 + Math.sin(ghostT * 0.7 + 1) * H * 0.32,
					W < 640 ? 34 : 50,
					now
				);
			} else if (hasPointer)
				disturb(
					pClientX + scrollX - pageLeft,
					pClientY + scrollY - pageTop,
					W < 640 ? 60 : 84,
					now
				);
			if (Math.random() < 0.5 && headCount) {
				const i = headIdx[(Math.random() * headCount) | 0];
				if (!until[i]) {
					activate(i);
					until[i] = now + 120;
				}
			}
			render(now);
			raf(tick);
		}
		function startLoop() {
			if (!running && laidOut && (gl || flat)) {
				running = true;
				raf(tick);
			}
		}
		listen(
			stack,
			'pointermove',
			(e) => {
				if (!laidOut) return;
				pClientX = e.clientX;
				pClientY = e.clientY;
				hasPointer = true;
				lastMove = performance.now();
				if (reduce) {
					disturb(pClientX + scrollX - pageLeft, pClientY + scrollY - pageTop, 84, lastMove);
					render(lastMove);
				}
			},
			{ passive: true }
		);
		listen(
			stack,
			'pointerleave',
			() => {
				hasPointer = false;
			},
			{ passive: true }
		);
		listen(stack, 'pointerdown', (e) => {
			if (!laidOut) return;
			lastMove = performance.now();
			nextLine();
			disturb(
				e.clientX + scrollX - pageLeft,
				e.clientY + scrollY - pageTop,
				W < 640 ? 110 : 170,
				lastMove,
				true
			);
			if (reduce) later(() => render(performance.now() + 1e4), 50);
		});
		listen(cv, 'webglcontextlost', (e) => {
			e.preventDefault();
			lost = true;
		});
		listen(cv, 'webglcontextrestored', () => {
			lost = false;
			if (initGL()) layout();
		});
		$$('.proj').forEach((a) => {
			const on = () => rewriteAll(a.dataset.rewrite);
			const off = () => {
				forced = '';
			};
			listen(a, 'pointerenter', on);
			listen(a, 'focus', on);
			listen(a, 'pointerleave', off);
			listen(a, 'blur', off);
		});
		let rt;
		listen(window, 'resize', () => {
			clearTimeout(rt);
			rt = later(() => {
				if (laidOut) layout();
			}, 150);
		});
		const fontReady = () => {
			if (!document.fonts) return Promise.resolve();
			return Promise.race([
				document.fonts.load('12px "Syne Mono"').catch(() => {}),
				new Promise((r) => later(r, 1200))
			]);
		};
		return {
			start() {
				observe(
					stack,
					(on) => {
						visible = on;
						if (!on) return;
						if (laidOut) {
							measurePage();
							return reduce ? render(performance.now()) : startLoop();
						}
						fontReady().then(() => {
							if (!alive) return;
							if (!gl && !flat && !initGL()) useFlat();
							layout();
							if (!reduce) startLoop();
						});
					},
					{ rootMargin: '300px 0px' }
				);
			},
			refresh() {
				if (!laidOut) return;
				readColors();
				for (let i = 0; i < n; i++) if (!(flags[i] & ACTIVE)) writeRest(i);
				render(performance.now());
			}
		};
	})();
	themeListeners.push(() => mosaic.refresh());

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
	afterPaint(() => {
		paint.start();
		mosaic.start();
	});

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
