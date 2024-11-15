<script lang="ts">
	import { store } from '$lib/features/theme/store';
	import type { Theme } from '../models/Theme';
	import ThemeToggleIcon from './ThemeToggleIcon.svelte';

	const { theme: seed }: { theme: Theme } = $props();

	const { theme, nextTheme, setTheme } = store({
		seed
	});
</script>

<form onsubmit={() => setTheme(nextTheme($theme))}>
	<ThemeToggleIcon theme={$theme} />
</form>
