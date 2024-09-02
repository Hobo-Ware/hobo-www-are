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

function setTheme(theme) {
    const wrapper = document.querySelector(WRAPPER_SELECTOR);
    wrapper.setAttribute(THEME_ATTRIBUTE, theme);
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
}

function resolveTheme() {
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

function toggleTheme() {
    const theme = document.querySelector(WRAPPER_SELECTOR).getAttribute(THEME_ATTRIBUTE);
    const toggledTheme = THEME_SWITCH_MAP[theme];
    setTheme(toggledTheme);
};

function initializeTheme() {
    const theme = resolveTheme();
    setTheme(theme);

    const toggleButton = document.querySelector('.js__theme-mode-toggle');
    toggleButton.addEventListener('click', toggleTheme);
}

initializeTheme();