export type Theme = 'light' | 'dark';

export const THEME_KEY = 'hobo-theme';

const REVEAL_MS = 900;
const REVEAL_EASING = 'cubic-bezier(0.65, 0, 0.2, 1)';
const RING_SIZE = 240;

export const isDark = () => document.documentElement.dataset.theme !== 'light';

function applyTheme(next: Theme) {
	document.documentElement.dataset.theme = next;
	try {
		localStorage.setItem(THEME_KEY, next);
	} catch {
		return;
	}
}

function ringAt(x: number, y: number, color: string) {
	const ring = document.createElement('div');
	ring.className = 'theme-ring';
	ring.style.cssText = `left:${x - RING_SIZE / 2}px;top:${y - RING_SIZE / 2}px;--ring:${color}`;
	document.body.append(ring);
	return ring;
}

export function switchTheme(origin: HTMLElement, ringColor: string, onApplied: () => void) {
	const next: Theme = isDark() ? 'light' : 'dark';
	const update = () => {
		applyTheme(next);
		onApplied();
	};
	const html = document.documentElement;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
	if (!document.startViewTransition) {
		html.classList.add('theme-fading');
		update();
		setTimeout(() => html.classList.remove('theme-fading'), 450);
		return;
	}

	const box = origin.getBoundingClientRect();
	const x = box.left + box.width / 2;
	const y = box.top + box.height / 2;
	const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
	let ring: HTMLElement | null = null;

	html.dataset.themeSwitch = '';
	const transition = document.startViewTransition(() => {
		update();
		ring = ringAt(x, y, ringColor);
	});
	transition.ready.then(() => {
		const timing = { duration: REVEAL_MS, easing: REVEAL_EASING, fill: 'forwards' as const };
		html.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
			{ ...timing, pseudoElement: '::view-transition-new(root)' }
		);
		html.animate(
			{
				transform: ['scale(0)', `scale(${(radius * 2) / RING_SIZE})`],
				opacity: [1, 1, 0]
			},
			{ ...timing, pseudoElement: '::view-transition-new(theme-ring)' }
		);
	});
	transition.finished.finally(() => {
		ring?.remove();
		delete html.dataset.themeSwitch;
	});
}
