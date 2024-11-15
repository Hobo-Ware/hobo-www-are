import { readonly, writable } from "svelte/store";
import { Theme } from "$lib/features//theme/models/Theme";

export const nextTheme = (theme: Theme) => {
  switch (theme) {
    case Theme.Dark:
      return Theme.Light;
    case Theme.Light:
      return Theme.Dark;
    default:
      return THEME_SEED as Theme;
  }
};

type Environment = {
  seed: Theme;
};

export function store({ seed }: Environment) {
  const current = seed;
  const theme = writable(current);

  return {
    theme: readonly(theme),
    setTheme: (value: Theme) => {
      theme.set(value);
      globalThis.document.documentElement.dataset.theme = value;
      localStorage.setItem(THEME_LS_KEY, value);
    },
    nextTheme: (theme: Theme) => nextTheme(theme),
  };
}
