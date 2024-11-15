<script lang="ts">
	import ThemePicker from '$lib/features/theme/components/ThemePicker.svelte';
	import HoboLogo from './HoboLogo.svelte';
	import HoboGitHub from './HoboGitHub.svelte';

	const { theme }: { theme: string } = $props();
</script>

<header>
	<div class="github-logo">
		<HoboGitHub />
	</div>

	<div class="hobo-theme-toggle">
		<ThemePicker {theme} />
	</div>

	<div class="hobo-logo">
		<HoboLogo />
	</div>
</header>

<style>
	header {
		grid-area: header;

		display: flex;
		width: 100%;

		align-items: center;
		justify-content: center;

		.hobo-logo {
			position: relative;
			width: var(--logo-size);
			min-width: 10em;
			margin: 0;
		}

		.hobo-theme-toggle,
		.github-logo {
			position: fixed;
			width: 2.5em;
			height: 2.5em;
			padding: 1em;
			top: 0;
		}

		.hobo-theme-toggle {
			right: 0;
		}

		.github-logo {
			left: 0;
		}
	}
</style>
