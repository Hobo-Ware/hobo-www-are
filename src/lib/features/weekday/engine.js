import { switchTheme } from '$lib/features/site/theme';
import { BLAZE_MS, createScene } from './scene.js';

const transferred = new WeakSet();

function freshCanvas(cv) {
	if (!transferred.has(cv)) return cv;
	const copy = cv.cloneNode(false);
	copy.classList.remove('ready');
	cv.replaceWith(copy);
	return copy;
}

export function mount(rootEl, copy) {
	const $ = (s) => rootEl.querySelector(s),
		$$ = (s) => rootEl.querySelectorAll(s),
		$id = (id) => rootEl.querySelector('#' + id);
	let alive = true;
	const regs = [],
		rafs = new Set(),
		timeouts = new Set(),
		intervals = new Set(),
		ios = [];
	const requestAnimationFrame = (fn) => {
		const id = window.requestAnimationFrame((t) => {
			rafs.delete(id);
			if (alive) fn(t);
		});
		rafs.add(id);
		return id;
	};
	const setTimeout = (fn, ms) => {
		const id = window.setTimeout(() => {
			timeouts.delete(id);
			if (alive) fn();
		}, ms);
		timeouts.add(id);
		return id;
	};
	const setInterval = (fn, ms) => {
		const id = window.setInterval(() => {
			if (alive) fn();
		}, ms);
		intervals.add(id);
		return id;
	};
	const addEventListener = (type, fn, opts) => {
		regs.push([window, type, fn, opts]);
		window.addEventListener(type, fn, opts);
	};
	const IntersectionObserver = class extends window.IntersectionObserver {
		constructor(...a) {
			super(...a);
			ios.push(this);
		}
	};
	const afterPaint = (fn) => requestAnimationFrame(() => setTimeout(fn, 0));
	const nativeAdd = EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener = function (type, fn, opts) {
		regs.push([this, type, fn, opts]);
		return nativeAdd.call(this, type, fn, opts);
	};
	let canvases = null;
	try {
		const HYPE = copy.hype;
		const FOUNDERS = copy.founders;
		const STAT_NAMES = copy.statNames;
		const CROWN = `<svg class="crown" viewBox="0 0 7 5" aria-label="${copy.crown}" role="img"><path fill="currentColor" d="M0 0h1v1H0zM3 0h1v1H3zM6 0h1v1H6zM0 1h2v1H0zM3 1h1v1H3zM5 1h2v1H5zM0 2h7v2H0zM1 4h5v1H1z"/><rect x="3" y="2" width="1" height="1" fill="#fa1d3c"/></svg>`;

		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const root = document.documentElement;
		$id('year').textContent = new Date().getFullYear();

		$id('theme').addEventListener('click', (e) => {
			switchTheme(e.currentTarget, '#ff7a2e', () => canvases.recolor());
		});
		afterPaint(() => {
			const g = document.createElement('canvas');
			g.width = g.height = 160;
			const gc = g.getContext('2d');
			const id = gc.createImageData(160, 160);
			for (let i = 0; i < id.data.length; i += 4) {
				const v = Math.random() * 255;
				id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
				id.data[i + 3] = 255;
			}
			gc.putImageData(id, 0, 0);
			$id('grain').style.backgroundImage = `url(${g.toDataURL()})`;
		});

		(() => {
			const logo = $('.logo');
			const state = [...logo.querySelectorAll('.px')].map((el) => ({
				el,
				x: 0,
				y: 0,
				r: 0,
				seed: Math.random() * 100,
				dirx: -1 - Math.random() * 1.6,
				diry: (Math.random() - 0.5) * 1.8
			}));
			let together = false;
			const start = performance.now();
			logo.addEventListener('pointerenter', (e) => {
				if (e.pointerType !== 'touch') together = true;
			});
			logo.addEventListener('pointerleave', (e) => {
				if (e.pointerType !== 'touch') together = false;
			});
			logo.addEventListener(
				'touchstart',
				() => {
					together = !together;
				},
				{ passive: true }
			);
			if (reduce) return;
			function tick(now) {
				const t = (now - start) / 1000;
				const spread = Math.min(1, Math.max(0, (t - 1.2) / 2.2));
				const ease = spread * spread * (3 - 2 * spread);
				for (const s of state) {
					const drift = together ? 0 : ease;
					const nx = s.dirx * 34 * drift + Math.sin(t * 0.7 + s.seed) * 9 * drift;
					const ny =
						s.diry * 26 * drift +
						Math.cos(t * 0.6 + s.seed) * 9 * drift -
						Math.max(0, Math.sin(t * 0.4 + s.seed)) * 14 * drift;
					const nr = Math.sin(t * 0.5 + s.seed) * 40 * drift;
					const k = together ? 0.22 : 0.06;
					s.x += (nx - s.x) * k;
					s.y += (ny - s.y) * k;
					s.r += (nr - s.r) * k;
					s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.r}deg)`;
				}
				requestAnimationFrame(tick);
			}
			requestAnimationFrame(tick);
		})();

		function renderStats(ul, vals) {
			ul.innerHTML = STAT_NAMES.map(([n, a], row) => {
				const v = vals[row],
					crowned = v === 6;
				return `<li class="stat${crowned ? ' maxed' : ''}" data-attr="${a}" style="--row:${row}">
      <span class="stat-name">${n.toUpperCase()}</span>
      <span class="pips" aria-hidden="true">${Array.from({ length: 6 }, (_, k) => `<i class="pip${k < v ? ' full' : ''}" style="--k:${k}"></i>`).join('')}</span>
      <span class="stat-val" aria-label="${copy.statLabel(a, v)}">${v}${crowned ? CROWN : ''}</span>
    </li>`;
			}).join('');
		}
		if (!reduce && 'IntersectionObserver' in window) {
			const io = new IntersectionObserver(
				(entries) =>
					entries.forEach((en) => {
						if (!en.isIntersecting) return;
						en.target.classList.remove('replay');
						void en.target.offsetWidth;
						en.target.classList.add('replay');
					}),
				{ threshold: 0.45 }
			);
			$$('.sheet').forEach((s) => io.observe(s));
		}

		const SKILLS = copy.skills;
		const LEVELS = copy.levels;
		const pick = (a) => a[Math.floor(Math.random() * a.length)];
		const logEl = $id('log');
		let run = 0,
			current = -1;
		const wait = (ms, id) =>
			new Promise((res, rej) =>
				setTimeout(() => (id === run ? res() : rej('stale')), reduce ? 0 : ms)
			);
		const narrow = matchMedia('(max-width: 999px)');
		const optionsEl = $('.options');
		const winEl = $id('log-window');
		const earlierEl = $id('earlier');
		let expanded = false,
			settleQueued = false;
		function settle() {
			if (!narrow.matches || expanded) {
				logEl.style.removeProperty('--log-shift');
				earlierEl.classList.toggle('empty', !expanded);
				return;
			}
			const shift = Math.min(0, winEl.clientHeight - logEl.offsetHeight);
			logEl.style.setProperty('--log-shift', shift + 'px');
			let gone = 0;
			for (const n of logEl.children) {
				if (n.offsetTop + n.offsetHeight + shift > 0) break;
				if (!n.classList.contains('sep')) gone++;
			}
			earlierEl.classList.toggle('empty', !gone);
			earlierEl.textContent = copy.earlier(gone);
		}
		function fold() {
			if (settleQueued) return;
			settleQueued = true;
			requestAnimationFrame(() => {
				settleQueued = false;
				settle();
			});
		}
		earlierEl.addEventListener('click', () => {
			expanded = !expanded;
			winEl.classList.toggle('expanded', expanded);
			earlierEl.setAttribute('aria-expanded', String(expanded));
			if (expanded) earlierEl.textContent = copy.collapse;
			settle();
		});
		narrow.addEventListener('change', settle);
		addEventListener('resize', fold);
		settle();
		requestAnimationFrame(() => winEl.classList.add('ready'));
		let following = 0;
		function stick() {
			if (!narrow.matches) {
				logEl.scrollTop = logEl.scrollHeight;
				return;
			}
			fold();
			const mono = winEl.parentElement.getBoundingClientRect();
			const reading = mono.top < innerHeight * 0.85 && mono.bottom > innerHeight * 0.3;
			if (!reading) return;
			const over = optionsEl.getBoundingClientRect().bottom - (innerHeight - 12);
			if (over <= 0) return;
			const now = performance.now();
			if (now - following < 250) return;
			following = now;
			scrollBy({ top: over, behavior: reduce ? 'auto' : 'smooth' });
		}

		(() => {
			const el = $id('clock');
			const draw = () => {
				el.textContent = copy.clock(new Date());
			};
			const tick = () => {
				draw();
				setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
			};
			requestAnimationFrame(() => setTimeout(tick, 0));
		})();

		function randomizeHype() {
			const slot = $id('hype-slot');
			const idx = Math.floor(Math.random() * HYPE.length);
			current = idx;
			const entry = HYPE[idx];
			const esc = (s) =>
				s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
			let prev;
			const rows = entry.messages.map((msg) => {
				let s;
				do {
					s = pick(SKILLS);
				} while (s === prev);
				prev = s;
				return `<li class="line past"><span class="speaker" data-attr="${s[1]}">${s[0]}</span><span class="check"><span>${copy.check(pick(LEVELS.slice(0, 6)), true)}</span></span> <span class="said">${esc(msg)}</span></li>`;
			});
			rows.push(
				`<li class="line slogan"><span class="speaker" data-attr="hobo">Hoboware</span><span class="check"><span>${copy.legendary}</span></span> <span class="said">${esc(entry.slogan.trim())}</span></li>`
			);
			afterPaint(() => {
				slot.style.minHeight = slot.offsetHeight + 'px';
				const group = document.createElement('ol');
				group.className = reduce ? 'hype-group' : 'hype-group swap';
				group.innerHTML = rows.join('');
				slot.replaceChildren(group);
			});
		}
		function append(li) {
			[...logEl.children].forEach((n) => n.classList.add('past'));
			li.classList.add('new');
			logEl.appendChild(li);
			while (logEl.children.length > 40) logEl.firstElementChild.remove();
			fold();
			stick();
			return li;
		}
		function addSep() {
			if (!logEl.lastElementChild || logEl.lastElementChild.classList.contains('sep')) return;
			const li = document.createElement('li');
			li.className = 'line sep';
			li.setAttribute('aria-hidden', 'true');
			li.textContent = '· · ·';
			append(li);
		}
		function addLine(skill, attr, cls) {
			const li = document.createElement('li');
			li.className = 'line' + (cls ? ' ' + cls : '');
			li.innerHTML = `<span class="speaker" data-attr="${attr}">${skill}</span><span class="check"><span></span></span> <span class="said"></span>`;
			return append(li);
		}
		async function roll(li, id, fixed) {
			const c = li.querySelector('.check'),
				s = c.firstElementChild;
			c.classList.add('rolling');
			const end = performance.now() + 650;
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
				stick();
				return;
			}
			try {
				for (let i = 1; i <= text.length; i++) {
					el.textContent = text.slice(0, i);
					stick();
					await wait(/[.,!?]/.test(text[i - 1]) ? 140 : 26, id);
				}
			} catch (e) {
				el.textContent = text;
				throw e;
			} finally {
				el.classList.remove('typing');
			}
		}
		async function play(delay = 0) {
			const id = ++run;
			let idx;
			do {
				idx = Math.floor(Math.random() * HYPE.length);
			} while (idx === current && HYPE.length > 1);
			current = idx;
			const entry = HYPE[idx];
			try {
				await wait(delay, id);
				addSep();
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
					await wait(600 + msg.length * 16, id);
				}
				const li = addLine('Hoboware', 'hobo', 'slogan');
				await roll(li, id, copy.legendary);
				await type(li, entry.slogan.trim(), id);
			} catch (e) {
				if (e !== 'stale') throw e;
			}
		}
		async function introduce(key) {
			const id = ++run;
			const f = FOUNDERS[key];
			addSep();
			const li = document.createElement('li');
			li.className = 'line';
			li.innerHTML = `<div class="intro-card">
      <img src="${f.img}" alt="${copy.portraitAlt(f.name)}" width="88" height="88" draggable="false">
      <div><h3>${f.name}</h3><p class="role">${f.role}</p><p class="d">${f.desc}</p></div>
      <ul class="stats mini"></ul>
      <a class="to-sheet" href="#sheet-${key}">${copy.readSheet}</a>
    </div>`;
			renderStats(li.querySelector('.stats'), f.stats);
			append(li);
			li.querySelector('img').addEventListener('load', stick);
			try {
				await wait(500, id);
				const [skill, attr, text] = pick(f.lines);
				const c = addLine(skill, attr);
				await roll(c, id);
				await type(c, text, id);
			} catch (e) {
				if (e !== 'stale') throw e;
			}
		}
		addEventListener('hobo:blaze', () => {
			const li = addLine(copy.blaze.skill, copy.blaze.attr);
			li.querySelector('.check span').textContent = copy.blaze.check;
			const el = li.querySelector('.said'),
				text = copy.blaze.text;
			if (reduce) {
				el.textContent = text;
				stick();
				return;
			}
			el.classList.add('typing');
			let i = 0;
			const step = () => {
				el.textContent = text.slice(0, ++i);
				stick();
				if (i < text.length) setTimeout(step, /[.,]/.test(text[i - 1]) ? 140 : 24);
				else el.classList.remove('typing');
			};
			step();
		});
		$$('.options [data-act]').forEach((b) =>
			b.addEventListener('click', () => {
				const a = b.dataset.act;
				if (a === 'roll') play();
				else introduce(a);
			})
		);
		addEventListener('keydown', (e) => {
			if (e.target.closest('input, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
			const opts = $$('.options li > *');
			const n = parseInt(e.key, 10);
			if (n >= 1 && n <= opts.length) opts[n - 1].click();
		});
		randomizeHype();

		$$('.portrait').forEach((p) => {
			let fullTimer;
			const vars = ['--fx', '--fy', '--px', '--py', '--tx', '--ty'];
			const move = (e) => {
				const r = p.getBoundingClientRect();
				const x = (e.clientX - r.left) / r.width,
					y = (e.clientY - r.top) / r.height;
				p.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
				p.style.setProperty('--my', (y * 100).toFixed(1) + '%');
				p.style.setProperty('--fx', ((0.5 - x) * 26).toFixed(1) + 'px');
				p.style.setProperty('--fy', ((0.5 - y) * 26).toFixed(1) + 'px');
				p.style.setProperty('--px', ((x - 0.5) * 8).toFixed(1) + 'px');
				p.style.setProperty('--py', ((y - 0.5) * 8).toFixed(1) + 'px');
				if (reduce) return;
				p.style.setProperty('--tx', ((0.5 - y) * 7).toFixed(2) + 'deg');
				p.style.setProperty('--ty', ((x - 0.5) * 9).toFixed(2) + 'deg');
			};
			const on = (e) => {
				move(e);
				p.classList.add('on');
				clearTimeout(fullTimer);
				fullTimer = setTimeout(() => p.classList.add('full'), 1800);
			};
			const off = () => {
				clearTimeout(fullTimer);
				p.classList.remove('on', 'full');
				vars.forEach((k) => p.style.removeProperty(k));
			};
			p.addEventListener('pointerenter', (e) => {
				if (e.pointerType === 'mouse') on(e);
			});
			p.addEventListener('pointermove', (e) => {
				if (e.pointerType === 'mouse') move(e);
			});
			p.addEventListener('pointerleave', (e) => {
				if (e.pointerType === 'mouse') off();
			});
			p.addEventListener('click', (e) => {
				move(e);
				clearTimeout(fullTimer);
				p.classList.add('on', 'full');
			});
			p.addEventListener('focus', () => p.classList.add('on', 'full'));
			p.addEventListener('blur', off);
		});

		canvases = (() => {
			const pit = $('.pit');
			const foot = $id('foot');
			let paintCv = freshCanvas($id('paint'));
			let embersCv = freshCanvas($id('embers'));
			let worker = null,
				scene = null,
				started = false,
				recolors = 0;
			const waiting = new Map();
			const replay = new Map();

			function onMessage(msg) {
				if (msg.type === 'ready') started = true;
				else if (msg.type === 'paint-ready') paintCv.classList.add('ready');
				else if (msg.type === 'painted') waiting.get(msg.id)?.();
				else if (msg.type === 'ignite') {
					pit.classList.add('blazing');
					setTimeout(() => pit.classList.remove('blazing'), reduce ? 1400 : BLAZE_MS - 1200);
					setTimeout(() => window.dispatchEvent(new CustomEvent('hobo:blaze')), reduce ? 0 : 450);
				}
			}
			function send(msg, key) {
				if (key) replay.set(key, msg);
				if (worker) worker.postMessage(msg);
				else scene?.handle(msg);
			}
			function runHere() {
				scene = createScene({
					paint: paintCv,
					embers: embersCv,
					makeCanvas: (w, h) =>
						Object.assign(document.createElement('canvas'), { width: w, height: h }),
					raf: requestAnimationFrame,
					reduce,
					emit: onMessage
				});
				replay.forEach((msg) => scene.handle(msg));
			}
			function fallBack() {
				worker?.terminate();
				worker = null;
				paintCv = freshCanvas(paintCv);
				embersCv = freshCanvas(embersCv);
				runHere();
			}
			if (typeof OffscreenCanvas === 'function' && 'transferControlToOffscreen' in paintCv) {
				try {
					const paint = paintCv.transferControlToOffscreen();
					transferred.add(paintCv);
					const embers = embersCv.transferControlToOffscreen();
					transferred.add(embersCv);
					worker = new Worker(new URL('./canvas.worker.js', import.meta.url), { type: 'module' });
					worker.addEventListener('message', (e) => onMessage(e.data));
					worker.addEventListener('error', () => {
						if (!started) fallBack();
					});
					worker.postMessage(
						{ type: 'init', paint, embers, reduce, timeOrigin: performance.timeOrigin },
						[paint, embers]
					);
				} catch {
					fallBack();
				}
			} else runHere();

			function readColors() {
				const cs = getComputedStyle(root);
				const colors = {};
				['bg', 'bg-deep', 'ink', 'blob-a', 'blob-b', 'blob-c', 'blob-d', 'red', 'ember'].forEach(
					(k) => (colors[k] = cs.getPropertyValue('--' + k).trim())
				);
				colors.k = parseFloat(cs.getPropertyValue('--stroke-k')) || 1;
				return colors;
			}
			const viewport = () => ({ vw: innerWidth, vh: innerHeight, dpr: devicePixelRatio || 1 });
			function layoutPit() {
				const footH = foot.offsetHeight;
				pit.style.setProperty('--foot-h', footH + 'px');
				const r = pit.getBoundingClientRect();
				send(
					{ type: 'pit', width: r.width, height: r.height, footH, dpr: devicePixelRatio || 1 },
					'pit'
				);
			}
			const state = { hidden: document.hidden, footerLive: false, pitVisible: false };
			const run = (patch) => {
				Object.assign(state, patch);
				send({ type: 'run', ...state }, 'run');
			};

			let rect = null,
				batch = [],
				flushing = 0;
			const local = (x, y) => {
				const r = rect || (rect = embersCv.getBoundingClientRect());
				return [x - r.left, y - r.top];
			};
			function flush() {
				flushing = 0;
				if (!batch.length) return;
				send({ type: 'pointer', samples: batch });
				batch = [];
			}
			function sample(x, y, t) {
				batch.push(...local(x, y), t);
				if (!flushing) flushing = requestAnimationFrame(flush);
			}
			addEventListener(
				'scroll',
				() => {
					rect = null;
				},
				{ passive: true }
			);
			addEventListener('pointermove', (e) => sample(e.clientX, e.clientY, e.timeStamp), {
				passive: true
			});
			addEventListener(
				'touchmove',
				(e) => {
					const p = e.touches[0];
					if (p) sample(p.clientX, p.clientY, e.timeStamp);
				},
				{ passive: true }
			);
			addEventListener('pointerdown', (e) => {
				if (e.target.closest('a, button')) return sample(e.clientX, e.clientY, e.timeStamp);
				flush();
				const [x, y] = local(e.clientX, e.clientY);
				send({ type: 'press', x, y, t: e.timeStamp });
			});

			$$('.proj').forEach((a) => {
				let iv = 0;
				const flare = () => {
					const r = a.getBoundingClientRect();
					send({ type: 'hover', x: local(r.left + 15, 0)[0] });
				};
				const on = () => {
					flare();
					clearInterval(iv);
					iv = setInterval(flare, 160);
				};
				const off = () => clearInterval(iv);
				a.addEventListener('pointerenter', on);
				a.addEventListener('focus', on);
				a.addEventListener('pointerleave', off);
				a.addEventListener('blur', off);
			});

			let rt;
			addEventListener('resize', () => {
				rect = null;
				replay.set('paint', { ...replay.get('paint'), ...viewport() });
				send({ type: 'resize', ...viewport() });
				clearTimeout(rt);
				rt = setTimeout(() => {
					if (replay.has('pit')) layoutPit();
				}, 150);
			});
			document.addEventListener('visibilitychange', () => run({ hidden: document.hidden }));
			new IntersectionObserver((es) => run({ pitVisible: es[0].isIntersecting }), {
				rootMargin: '120px'
			}).observe(pit);
			new IntersectionObserver(
				(es) => {
					const live = es[0].intersectionRatio >= 0.5;
					root.classList.toggle('footer-live', live);
					run({ footerLive: live });
				},
				{ threshold: [0, 0.5] }
			).observe(pit);
			if (reduce) $id('pit-hint').hidden = true;

			afterPaint(() => {
				send({ type: 'paint', ...viewport(), colors: readColors() }, 'paint');
				layoutPit();
			});

			return {
				recolor() {
					const id = ++recolors;
					const colors = readColors();
					if (replay.has('paint')) replay.set('paint', { ...replay.get('paint'), colors });
					return new Promise((resolve) => {
						const done = () => {
							waiting.delete(id);
							resolve();
						};
						waiting.set(id, done);
						setTimeout(done, 160);
						send({ type: 'colors', colors, id });
					});
				},
				stop() {
					send({ type: 'stop' });
					worker?.terminate();
				}
			};
		})();
	} finally {
		EventTarget.prototype.addEventListener = nativeAdd;
	}
	return function unmount() {
		canvases?.stop();
		alive = false;
		rafs.forEach((id) => cancelAnimationFrame(id));
		timeouts.forEach((id) => clearTimeout(id));
		intervals.forEach((id) => clearInterval(id));
		ios.forEach((io) => io.disconnect());
		regs.forEach(([t, type, fn, opts]) => t.removeEventListener(type, fn, opts));
	};
}
