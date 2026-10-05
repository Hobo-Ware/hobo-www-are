import type { OgMode } from './seo';

type IconSet = {
	svg: string;
	png32: string;
	png16: string;
	apple: string;
	manifest: string;
	theme: string;
};

export const ICON_SETS: Record<OgMode, IconSet> = {
	weekday: {
		svg: '/favicon/favicon.svg',
		png32: '/favicon/favicon-32x32.png',
		png16: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
		manifest: '/manifest.webmanifest',
		theme: '#0f1215'
	},
	weekend: {
		svg: '/favicon/favicon-weekend.svg',
		png32: '/favicon/favicon-weekend-32x32.png',
		png16: '/favicon/favicon-weekend-16x16.png',
		apple: '/favicon/apple-touch-icon-weekend.png',
		manifest: '/manifest-weekend.webmanifest',
		theme: '#0d0a15'
	}
};

const TAGS: [keyof IconSet, string][] = [
	['png32', '<link rel="icon" type="image/png" sizes="32x32"'],
	['png16', '<link rel="icon" type="image/png" sizes="16x16"'],
	['svg', '<link rel="icon" type="image/svg+xml"'],
	['apple', '<link rel="apple-touch-icon" sizes="180x180"'],
	['manifest', '<link rel="manifest"'],
	['theme', '<meta name="theme-color"']
];

export const iconTags = (mode: OgMode) =>
	TAGS.map(
		([key, open]) =>
			`${open} ${key === 'theme' ? 'content' : 'href'}="${ICON_SETS[mode][key]}" data-weekday="${ICON_SETS.weekday[key]}" data-weekend="${ICON_SETS.weekend[key]}" />`
	).join('\n\t\t');

export function applyIcons(mode: OgMode) {
	document.querySelectorAll<HTMLElement>('[data-weekday][data-weekend]').forEach((el) => {
		el.setAttribute(el.tagName === 'META' ? 'content' : 'href', el.dataset[mode]!);
	});
}
