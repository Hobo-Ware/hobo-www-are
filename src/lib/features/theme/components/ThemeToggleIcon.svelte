<script lang="ts">
	import { onMount } from 'svelte';
	import { Theme } from '../models/Theme';

	const { theme }: { theme: Theme } = $props();

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/theme-toggles@4.10.1/css/simple.min.css"
	/>
</svelte:head>

{#if mounted}
	<button
		class:theme-toggle--toggled={theme === Theme.Dark}
		class="theme-toggle"
		type="submit"
		title="Toggle theme"
		aria-label="Toggle theme"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			width="1em"
			height="1em"
			class="theme-toggle__simple"
			fill="currentColor"
			viewBox="0 0 32 32"
		>
			<clipPath id="theme-toggle__simple__cutout">
				<path d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0" />
			</clipPath>
			<g clip-path="url(#theme-toggle__simple__cutout)">
				<circle cx="16" cy="16" r="15" />
			</g>
		</svg>
	</button>
{/if}

<style>
	.theme-toggle {
		font-size: 2em;
		color: var(--color-foreground);
	}
</style>
