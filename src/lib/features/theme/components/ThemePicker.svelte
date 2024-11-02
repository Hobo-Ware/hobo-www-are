<script lang="ts">
	import { browser } from '$app/environment';
	import { store } from '$lib/features/theme/store';
	import ThemeToggleIcon from './ThemeToggleIcon.svelte';

	const { theme: seed }: { theme: string } = $props();

	const { theme, nextTheme, setTheme } = store({
		seed,
		browser
	});
</script>

<form onsubmit={() => setTheme(nextTheme($theme))}>
	<ThemeToggleIcon theme={$theme} />
</form>
