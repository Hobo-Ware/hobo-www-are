import { mount as mountWeekday } from '$lib/features/weekday/engine.js';
import { mount as mountWeekend } from '$lib/features/weekend/engine.js';
import { weekdayCopy, weekendCopy } from './copy';

export type Mode = 'weekday' | 'weekend';

const isMode = (value: string): value is Mode => value === 'weekday' || value === 'weekend';

const engines: Record<Mode, (root: HTMLElement) => () => void> = {
	weekday: (root) => mountWeekday(root, weekdayCopy()),
	weekend: (root) => mountWeekend(root, weekendCopy())
};

export function startModes(roots: Record<Mode, HTMLElement>): () => void {
	const html = document.documentElement;
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	let mode: Mode = html.dataset.mode === 'weekend' ? 'weekend' : 'weekday';
	html.dataset.mode = mode;
	let unmount = engines[mode](roots[mode]);

	const sync = () =>
		document
			.querySelectorAll<HTMLElement>('[data-mode-set]')
			.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modeSet === mode)));
	sync();

	function swap(next: Mode) {
		unmount();
		roots.weekend.classList.add('mode-weekend');
		mode = next;
		html.dataset.mode = next;
		scrollTo(0, 0);
		unmount = engines[next](roots[next]);
		sync();
	}

	function setMode(next: Mode) {
		if (next === mode) return;
		if (reduce) return swap(next);
		if (document.startViewTransition) {
			document.startViewTransition(() => swap(next));
			return;
		}
		html.classList.add('mode-fading');
		setTimeout(() => {
			swap(next);
			requestAnimationFrame(() => html.classList.remove('mode-fading'));
		}, 230);
	}

	const onClick = (e: MouseEvent) => {
		const button = (e.target as Element | null)?.closest<HTMLElement>('[data-mode-set]');
		if (button?.dataset.modeSet) location.hash = button.dataset.modeSet;
	};
	const onHash = () => {
		const hash = location.hash.slice(1);
		if (isMode(hash)) setMode(hash);
	};
	document.addEventListener('click', onClick);
	addEventListener('hashchange', onHash);

	return () => {
		document.removeEventListener('click', onClick);
		removeEventListener('hashchange', onHash);
		unmount();
	};
}
