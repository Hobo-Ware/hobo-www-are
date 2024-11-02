import { readonly, writable } from "svelte/store";
import { Theme } from "$lib/features//theme/models/Theme";
import { coerceTheme } from "$lib/features/theme/utils/coerceTheme";

export const nextTheme = (browser: boolean) => (theme: Theme) => {
  switch (theme) {
    case Theme.Dark:
      return Theme.Light;
    case Theme.Light:
      return Theme.Dark;
    case Theme.Auto:
    default:
      if (!browser) {
        return Theme.Light;
      }

      return globalThis.window.matchMedia("(prefers-color-scheme: dark)")
          .matches
        ? Theme.Light
        : Theme.Dark;
  }
};

type Environment = {
  browser: boolean;
  seed: string;
};

export function store({
  browser,
  seed,
}: Environment) {
  const current = coerceTheme(seed);
  const theme = writable(current);

  return {
    theme: readonly(theme),
    setTheme: (value: Theme) => {
      theme.set(value);
      globalThis.document.documentElement.dataset.theme = value;
      localStorage.setItem(THEME_LS_KEY, value);
    },
    nextTheme: (theme: Theme) => nextTheme(browser)(theme),
  };
}
