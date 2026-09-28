export type Theme = 'light' | 'dark';

export const THEME_KEY = 'hobo-theme';

export const isDark = () => document.documentElement.dataset.theme !== 'light';

export function toggleTheme(): Theme {
	const next: Theme = isDark() ? 'light' : 'dark';
	document.documentElement.dataset.theme = next;
	try {
		localStorage.setItem(THEME_KEY, next);
	} catch {
		return next;
	}
	return next;
}
