const Theme = {
    Dark: 'dark',
    Light: 'light',
}

const THEME_SWITCH_MAP = {
    [Theme.Dark]: Theme.Light,
    [Theme.Light]: Theme.Dark,
}

const THEME_ATTRIBUTE = 'data-theme';
const WRAPPER_SELECTOR = ':root';
const LOCAL_STORAGE_KEY = 'theme';

function set(theme) {
    const wrapper = document.querySelector(WRAPPER_SELECTOR);
    wrapper.setAttribute(THEME_ATTRIBUTE, theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
}

export function resolve() {
    const darkThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPreference = darkThemeMatcher.matches
        ? Theme.Dark
        : Theme.Light;

    const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

    const isStoredThemeValid = [Theme.Dark, Theme.Light].includes(storedTheme);

    if (!isStoredThemeValid) {
        return systemPreference;
    }

    return storedTheme ?? systemPreference;
}

function toggle() {
    const theme = document.querySelector(WRAPPER_SELECTOR).getAttribute(THEME_ATTRIBUTE);
    const toggledTheme = THEME_SWITCH_MAP[theme];
    set(toggledTheme);
};

function initialize() {
    const theme = resolve();
    set(theme);

    const toggleButton = document.querySelector('.js__theme-mode-toggle');
    toggleButton.addEventListener('click', toggle);
}

export default {
    resolve,
    toggle,
    set,
}