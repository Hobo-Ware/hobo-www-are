<script lang="ts">
	import ThemePicker from '$lib/features/theme/components/ThemePicker.svelte';
	import HoboLogo from './HoboLogo.svelte';

	const { theme }: { theme: string } = $props();
</script>

<header>
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

		.hobo-theme-toggle {
			position: fixed;
			width: 2.5em;
			height: 2.5em;
			padding: 1em;
			right: 0;
			top: 0;
		}
	}
</style>
