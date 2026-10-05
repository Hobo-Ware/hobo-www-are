import type { Hype } from './content';
import { weekdayCopy, weekendCopy } from './copy';
import { applyIcons } from './icons';

export type Mode = 'weekday' | 'weekend';

const isMode = (value: string): value is Mode => value === 'weekday' || value === 'weekend';

type Unmount = () => void;

const engines: Record<Mode, (root: HTMLElement, hype: Hype[]) => Promise<Unmount>> = {
	weekday: async (root, hype) =>
		(await import('$lib/features/weekday/engine.js')).mount(root, weekdayCopy(hype)),
	weekend: async (root, hype) =>
		(await import('$lib/features/weekend/engine.js')).mount(root, weekendCopy(hype))
};

export function startModes(roots: Record<Mode, HTMLElement>, hype: Hype[]): () => void {
	const html = document.documentElement;
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	let mode: Mode = html.dataset.mode === 'weekend' ? 'weekend' : 'weekday';
	html.dataset.mode = mode;
	let running = engines[mode](roots[mode], hype);

	const sync = () =>
		document
			.querySelectorAll<HTMLElement>('[data-mode-set]')
			.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.modeSet === mode)));
	sync();

	function swap(next: Mode) {
		const previous = running;
		roots.weekend.classList.add('mode-weekend');
		mode = next;
		html.dataset.mode = next;
		applyIcons(next);
		scrollTo(0, 0);
		running = previous.then((unmount) => {
			unmount();
			return engines[next](roots[next], hype);
		});
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
		running.then((unmount) => unmount());
	};
}
