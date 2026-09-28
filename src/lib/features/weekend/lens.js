export function attachLens(card, { photo, frame } = {}) {
	if (!card || !photo) throw new Error('attachLens needs a card element and a photo <img>');
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const originalParent = photo.parentNode;
	const wrap = document.createElement('div');
	wrap.className = 'hl-photo';
	originalParent.insertBefore(wrap, photo);
	wrap.appendChild(photo);
	photo.classList.add('hl-mono');
	const layers = ['hl-color', 'hl-loupe'].map((cls) => {
		const img = document.createElement('img');
		img.src = photo.currentSrc || photo.src;
		img.alt = '';
		img.draggable = false;
		img.className = cls;
		img.setAttribute('aria-hidden', 'true');
		wrap.appendChild(img);
		return img;
	});
	const ring = document.createElement('span');
	ring.className = 'hl-ring';
	card.appendChild(ring);
	card.classList.add('hl-card');
	frame?.classList.add('hl-frame');

	const vars = ['--hl-fx', '--hl-fy', '--hl-px', '--hl-py', '--hl-tx', '--hl-ty', '--hl-spin'];
	let fullTimer,
		lastX = 0.5,
		spin = 0;
	const set = (k, v) => card.style.setProperty(k, v);
	const move = (e) => {
		const r = card.getBoundingClientRect();
		const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
		const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
		set('--hl-mx', (x * 100).toFixed(1) + '%');
		set('--hl-my', (y * 100).toFixed(1) + '%');
		spin += (x - lastX) * 240;
		lastX = x;
		set('--hl-spin', spin.toFixed(1) + 'deg');
		if (reduce) return;
		set('--hl-fx', ((0.5 - x) * 26).toFixed(1) + 'px');
		set('--hl-fy', ((0.5 - y) * 26).toFixed(1) + 'px');
		set('--hl-px', ((x - 0.5) * 8).toFixed(1) + 'px');
		set('--hl-py', ((y - 0.5) * 8).toFixed(1) + 'px');
		set('--hl-tx', ((0.5 - y) * 7).toFixed(2) + 'deg');
		set('--hl-ty', ((x - 0.5) * 9).toFixed(2) + 'deg');
	};
	const reveal = () => {
		clearTimeout(fullTimer);
		card.classList.add('hl-on', 'hl-full');
	};
	const off = () => {
		clearTimeout(fullTimer);
		card.classList.remove('hl-on', 'hl-full');
		vars.forEach((k) => card.style.removeProperty(k));
	};

	const toggle = () => (card.classList.contains('hl-full') ? off() : reveal());

	const onEnter = (e) => {
		if (e.pointerType !== 'mouse') return;
		move(e);
		card.classList.add('hl-on');
		clearTimeout(fullTimer);
		fullTimer = setTimeout(() => card.classList.add('hl-full'), 1800);
	};
	const onMove = (e) => {
		if (e.pointerType === 'mouse') move(e);
	};
	const onLeave = (e) => {
		if (e.pointerType === 'mouse') off();
	};
	const onUp = (e) => {
		move(e);
		if (e.pointerType === 'mouse') {
			reveal();
			return;
		}
		toggle();
	};
	const onFocus = () => {
		if (card.matches(':focus-visible')) reveal();
	};
	const onBlur = off;
	const onKey = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		}
	};
	const listeners = [
		['pointerenter', onEnter],
		['pointermove', onMove],
		['pointerleave', onLeave],
		['pointerup', onUp],
		['focus', onFocus],
		['blur', onBlur],
		['keydown', onKey]
	];
	listeners.forEach(([t, fn]) => card.addEventListener(t, fn));

	return function detach() {
		clearTimeout(fullTimer);
		listeners.forEach(([t, fn]) => card.removeEventListener(t, fn));
		off();
		['--hl-mx', '--hl-my'].forEach((k) => card.style.removeProperty(k));
		layers.forEach((l) => l.remove());
		ring.remove();
		photo.classList.remove('hl-mono');
		wrap.parentNode.insertBefore(photo, wrap);
		wrap.remove();
		card.classList.remove('hl-card');
		frame?.classList.remove('hl-frame');
	};
}
