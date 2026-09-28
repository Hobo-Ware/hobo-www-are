import { toggleTheme } from '$lib/features/site/theme';

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
	try {
		const HYPE = copy.hype;
		const FOUNDERS = copy.founders;
		const STAT_NAMES = copy.statNames;
		const CROWN = `<svg class="crown" viewBox="0 0 7 5" aria-label="${copy.crown}" role="img"><path fill="currentColor" d="M0 0h1v1H0zM3 0h1v1H3zM6 0h1v1H6zM0 1h2v1H0zM3 1h1v1H3zM5 1h2v1H5zM0 2h7v2H0zM1 4h5v1H1z"/><rect x="3" y="2" width="1" height="1" fill="#fa1d3c"/></svg>`;

		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const root = document.documentElement;
		$id('year').textContent = new Date().getFullYear();

		function syncThemeUi() {
			paint.refresh();
		}
		$id('theme').addEventListener('click', () => {
			toggleTheme();
			syncThemeUi();
		});

		let footerLive = false;
		const paint = (() => {
			const cv = $id('paint');
			const ctx = cv.getContext('2d');
			const strokes = document.createElement('canvas');
			const SCALE = Math.min(devicePixelRatio || 1, 2);
			const PX = SCALE / 0.5;
			let w = 0,
				h = 0,
				colors = {},
				t0 = performance.now(),
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
			function readColors() {
				const cs = getComputedStyle(root);
				['bg', 'bg-deep', 'ink', 'blob-a', 'blob-b', 'blob-c', 'blob-d', 'red', 'ember'].forEach(
					(k) => (colors[k] = cs.getPropertyValue('--' + k).trim())
				);
				colors.k = parseFloat(cs.getPropertyValue('--stroke-k')) || 1;
			}
			function paintStrokes() {
				strokes.width = w;
				strokes.height = h;
				const s = strokes.getContext('2d');
				s.lineCap = 'round';
				const n = Math.round((w * h) / (900 * PX * PX));
				for (let i = 0; i < n; i++) {
					const x = Math.random() * w,
						y = Math.random() * h,
						len = (20 + Math.random() * 90) * PX,
						a = -0.6 + Math.random() * 0.5;
					s.strokeStyle = Math.random() < 0.5 ? colors.ink : colors.bg;
					s.globalAlpha = (0.012 + Math.random() * 0.035) * colors.k;
					s.lineWidth = (2 + Math.random() * 14) * PX;
					s.beginPath();
					s.moveTo(x, y);
					s.quadraticCurveTo(
						x + Math.cos(a) * len * 0.5,
						y + Math.sin(a) * len * 0.5 + (-10 + Math.random() * 20) * PX,
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
					s.lineWidth = (3 + Math.random() * 6) * PX;
					s.beginPath();
					s.moveTo(x, y);
					s.bezierCurveTo(
						x + 40 * PX,
						y - 20 * PX,
						x + 80 * PX,
						y + 30 * PX,
						x + 140 * PX,
						y - 10 * PX
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
				frame(performance.now(), true);
			}
			function frame(now, force) {
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
				ctx.drawImage(strokes, Math.sin(t * 0.00005) * 12 * PX, Math.cos(t * 0.00004) * 8 * PX);
			}
			function loop(now) {
				if (!footerLive) frame(now);
				requestAnimationFrame(loop);
			}
			function makeGrain() {
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
			}
			return {
				start() {
					readColors();
					makeGrain();
					resize();
					cv.classList.add('ready');
					addEventListener('resize', resize);
					if (!reduce) requestAnimationFrame(loop);
				},
				refresh() {
					if (!w) return;
					requestAnimationFrame(() => {
						readColors();
						paintStrokes();
						frame(performance.now(), true);
					});
				}
			};
		})();
		afterPaint(() => paint.start());

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
			logo.addEventListener('pointerenter', () => (together = true));
			logo.addEventListener('pointerleave', () => (together = false));
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

		(() => {
			const pit = $('.pit');
			const cv = $id('embers');
			const foot = $id('foot');
			const ctx = cv.getContext('2d');
			const g1 = document.createElement('canvas'),
				g1c = g1.getContext('2d');
			const g2 = document.createElement('canvas'),
				g2c = g2.getContext('2d');

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
			const GRID = {
				cols: 90,
				rows: 66,
				cells:
					'000000000000000000000000000000000000000000022222200000000000000000000000000000000000000000000000000000000000000000000000000000022222222222220000000000000000000000000000000000000000000000000000000000000000000000000000222222222222222000000000000000000000000000000000000000000000000000000000000000000000000000222222222222222200000000000000000000000000000000000000000000000000000000000000000000000000222222222222222222222222200000000000000000000000000000000000000000000000000000000000000000222222222222222222222222200000000000000000000000000000000000000000000000000000000000000222222222222222222222222222220000000000000000000000000000000000000000000000000000000000002222222222222222222222222222222000000000000000000000000000000000000000000000000000000000022222222222222222222222222222222200000000000000000000000000000000000000000000000000000000222222222222222000022222222222222220000000000000000000000000000000000000000000000000000000222200222222220011110000022222222220000000000000000000000000000000000000000000000000000002222200222222200111111111102222222220000000000000000000000000000000000000000000000000000000222222222222001111111111110222222200000000000000000000000000000000000000000000000000000000222222222220011101110000011022220000000000000000000000000000000000000000000000000000000000222222222200100000001000000022200000000000000000000000000000000000000000000000000000000000022220000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111000000000000000001111110000000000000000000000000000000000000000000000000000000111100011111111111111111111111111111000000000000000000000000000000000000000000000000000000111100011111111111111111111111111111100000000000000000000000000000000000000000000000000000111100011111111111111110011111111111110000000000000000000000000000000000000000000000000000000000001111111111111110111111111111111000000000000000000000000000000000000000000000000000000000011111011111111110111111111111111000000000000000000000000000000000000000000000000000000000111110011111111100110111111111110000000000000000000000000000000000000000000000000000000001111110001111100000011000000001111000000000000000000000000000000000000000000000011110000000000110000000000000011100000001111000000000000000000000000000000000000000000000011110000000000111000000000000011100000011111000000000000000000000000000000000000000000000011110000000000111100000000111111100000011111000000000000000000000000000000000000000000000000000001110000111100001111111111111100111111000000000000000000000000000000000000000000000000000001110000111110011111111111111111111111100000000000000000000000000000000000000000000000000001110000111110011111111001111111111111100000000000000000000000000000000000000000000000000000000000111110011111110001111111111111110000000000000000000000000000000000000000000000000000000000111110111100000000001111111111110000000000000000000000000000000000000000000000000000000111111110011000000000100011111111100000000000000000000000000000000000000000000000111100000111111111010001110011110011111111100000000000000000000000000000000000000000000000111100000000000111000111111111111011111111100000000000000000000000000000000000000000000000111100000000000111101111111111111111111111100000000000000000000000000000000000000000000000000000000000000111111111111111111111111110000000000000000000000000000000000000000000000000000000001110000111111111111111111111111110000000000000000000000000000000000000000000000000000000011111000111111111000111111111111100000000000000000000000000000000000000000000000000000000011111000111111111000111111111111100000000000000000000000000000000000000000000000000000000011111000000000111000111111111111100000000000000000000000000000000000000000000000000000000011111000000000111111111111111000000000000000000000000000000000000000000000000000000000000000000000000000111111111111110000000000000000000000000000000000000000000000000000000000000000000000011100111111111111110000000000000000000000000000000000000000000000000000000000000000000000011100111111111111100000000000000000000000000000000000000000000000000000000000000000000000011100111111100001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111000011100011111110001111111110000111111100001100000001100000111100001111111100011111111111000011100111111111001111111110001111111110001100110001100000111100001111111110011111111111000011101111000111101110000111001110001111001100111001100001111100001110001110011100000111111111101110000011101111001110011100000111001101111101100001101110001110001110011100000111111111101110000011101111111110011100000111001111111111100011100110001110001110011111110111111111101110000011101111111111011100000111001111101111100011100111001111111110011111110111000011101110000011101110000111011100000111001111000111100111111111001111111100011100000111000011100111101111001111000111001111011111001110000111100111111111101111011100011111111111000011100111111111001111111111000111111110001110000011101110000011101110001110011111111111000011000001111100000111111100000011111000001100000001101110000001100110001110011111111'
			};

			const FLAME_SPRITES = [
				['255,255,245', '255,236,170'],
				['255,244,190', '255,196,90'],
				['255,214,120', '255,140,40'],
				['255,160,60', '240,80,20'],
				['240,100,30', '190,40,20'],
				['200,60,25', '120,20,15']
			].map(([core, edge]) => {
				const c = document.createElement('canvas');
				c.width = c.height = 64;
				const g = c.getContext('2d'),
					gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
				gr.addColorStop(0, `rgba(${core},1)`);
				gr.addColorStop(0.35, `rgba(${edge},.75)`);
				gr.addColorStop(1, `rgba(${edge},0)`);
				g.fillStyle = gr;
				g.fillRect(0, 0, 64, 64);
				return c;
			});

			const MAX_EMBERS = 900,
				MAX_FLAMES = 700;
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
				HOT = new Uint32Array(0);

			const blaze = { t0: -1e9, dur: 4600, cool: 0, k: 0, from: 0 };
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
				visible = false,
				raf = 0,
				lastT = 0,
				ready = false;
			const ptr = { x: -9999, y: -9999, vx: 0, vy: 0, t: 0, on: false };

			function layout() {
				const r = pit.getBoundingClientRect();
				W = r.width;
				H = r.height;
				dpr = Math.min(2, devicePixelRatio || 1);
				cv.width = Math.round(W * dpr);
				cv.height = Math.round(H * dpr);
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				g1.width = Math.max(1, cv.width >> 2);
				g1.height = Math.max(1, cv.height >> 2);
				g2.width = Math.max(1, Math.round(cv.width / 10));
				g2.height = Math.max(1, Math.round(cv.height / 10));
				pit.style.setProperty('--foot-h', foot.offsetHeight + 'px');
				const base = H - foot.offsetHeight + 4;
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
				E.n = 0;
				F.n = 0;
				ctx.globalCompositeOperation = 'lighter';
				ctx.globalAlpha = 0.002;
				for (const s of FLAME_SPRITES) ctx.drawImage(s, 0, 0, 8, 8);
				ctx.globalAlpha = 1;
				ctx.globalCompositeOperation = 'source-over';
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
				ctx.clearRect(0, 0, W, H);

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
						h += (Math.min(1, (kind ? 1 : 0.8) + n * 0.06) - h) * blaze.k * (kind ? 0.95 : 0.7);
					h = h < 0 ? 0 : h > 1 ? 1 : h;
					CH[i] = h;
					CFL[i] *= dec;
					CSP[i] *= rec;
					ctx.fillStyle = LUTS[kind][(h * 95) | 0];
					ctx.fillRect(x, y, cs - 1, cs - 1);
				}

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
					ctx.globalCompositeOperation = 'lighter';
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
						ctx.globalAlpha = life > 0.625 ? 1 : life * 1.6;
						ctx.fillStyle = (E.cap[j] ? CAP : COAL)[
							heat <= 0 ? 0 : heat >= 1 ? 95 : (heat * 95) | 0
						];
						ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
					}
					if (fire > 0.01 || F.n) drawFlames(dt, t, fire);
					ctx.globalAlpha = 1;
					ctx.globalCompositeOperation = 'source-over';
				}

				g1c.clearRect(0, 0, g1.width, g1.height);
				g1c.drawImage(cv, 0, 0, g1.width, g1.height);
				g2c.clearRect(0, 0, g2.width, g2.height);
				g2c.drawImage(g1, 0, 0, g2.width, g2.height);
				ctx.save();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.globalCompositeOperation = 'lighter';
				ctx.imageSmoothingEnabled = true;
				const glow = Math.max(blaze.k, fan.heat * 0.45);
				const shimmer = glow ? Math.sin(t * 23) * 2.5 * glow * dpr : 0;
				ctx.globalAlpha = 0.5 + glow * 0.3;
				ctx.drawImage(g1, 0, shimmer, cv.width, cv.height);
				ctx.globalAlpha = 0.55 + glow * 0.35;
				ctx.drawImage(g2, 0, -shimmer * 2, cv.width, cv.height);
				ctx.restore();

				ptr.vx *= Math.pow(0.88, dt * 60);
				ptr.vy *= Math.pow(0.88, dt * 60);
			}
			function drawFlames(dt, t, k) {
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
					ctx.globalAlpha = Math.min(1, life * 2.2) * 0.85;
					ctx.drawImage(
						FLAME_SPRITES[age >= 0.8333 ? 5 : (age * 6) | 0],
						x - sz / 2,
						y - sz * 0.7,
						sz,
						sz * 1.35
					);
				}
			}
			function ignite(now) {
				if (now < blaze.cool) return;
				blaze.t0 = now;
				blaze.from = lastFire;
				blaze.cool = now + blaze.dur + 10000;
				pit.classList.add('blazing');
				setTimeout(() => pit.classList.remove('blazing'), reduce ? 1400 : blaze.dur - 1200);
				if (!reduce) burst = Math.round(HOT.length * 0.08);
				setTimeout(() => window.dispatchEvent(new CustomEvent('hobo:blaze')), reduce ? 0 : 450);
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
			function loop(now) {
				raf = 0;
				if (!visible || document.hidden) return;
				frame(now);
				raf = requestAnimationFrame(loop);
			}
			function kick() {
				if (!reduce && ready && visible && !raf) {
					lastT = 0;
					raf = requestAnimationFrame(loop);
				}
			}

			let rect = null;
			function track(x, y) {
				const r = rect || (rect = cv.getBoundingClientRect()),
					now = performance.now();
				const nx = x - r.left,
					ny = y - r.top;
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
			addEventListener(
				'scroll',
				() => {
					rect = null;
				},
				{ passive: true }
			);
			addEventListener('pointermove', (e) => track(e.clientX, e.clientY), { passive: true });
			addEventListener(
				'touchmove',
				(e) => {
					const p = e.touches[0];
					if (p) track(p.clientX, p.clientY);
				},
				{ passive: true }
			);
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
			addEventListener('pointerdown', (e) => {
				track(e.clientX, e.clientY);
				if (!ptr.on || reduce || !N || e.target.closest('a, button')) return;
				flareAround(ptr.x, ptr.y, Math.max(160, W * 0.14), 0.7, 0.12, false);
			});

			$$('.proj').forEach((a) => {
				let iv = 0;
				const flare = () => {
					if (!ready || reduce) return;
					const r = a.getBoundingClientRect(),
						cr = cv.getBoundingClientRect();
					flareAround(r.left + 15 - cr.left, 0, Math.max(140, W * 0.1), 0.55, 0.05, true);
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
				clearTimeout(rt);
				rt = setTimeout(() => {
					if (ready) {
						layout();
						frame(performance.now());
					}
				}, 150);
			});
			document.addEventListener('visibilitychange', kick);
			new IntersectionObserver(
				(es) => {
					visible = es[0].isIntersecting;
					kick();
				},
				{ rootMargin: '120px' }
			).observe(pit);
			new IntersectionObserver(
				(es) => {
					footerLive = es[0].intersectionRatio >= 0.5;
					root.classList.toggle('footer-live', footerLive);
				},
				{ threshold: [0, 0.5] }
			).observe(pit);
			if (reduce) $id('pit-hint').hidden = true;

			afterPaint(() => {
				ready = true;
				layout();
				frame(performance.now());
				kick();
			});
		})();
	} finally {
		EventTarget.prototype.addEventListener = nativeAdd;
	}
	return function unmount() {
		alive = false;
		rafs.forEach((id) => cancelAnimationFrame(id));
		timeouts.forEach((id) => clearTimeout(id));
		intervals.forEach((id) => clearInterval(id));
		ios.forEach((io) => io.disconnect());
		regs.forEach(([t, type, fn, opts]) => t.removeEventListener(type, fn, opts));
	};
}
