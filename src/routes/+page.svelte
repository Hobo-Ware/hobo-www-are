<script lang="ts">
	import { onMount } from 'svelte';
	import SeoHead from '$lib/features/site/SeoHead.svelte';
	import { startModes } from '$lib/features/site/mode';
	import Weekday from '$lib/features/weekday/Weekday.svelte';
	import Weekend from '$lib/features/weekend/Weekend.svelte';

	onMount(() =>
		startModes({
			weekday: document.getElementById('wd-root')!,
			weekend: document.getElementById('we-root')!
		})
	);
</script>

<SeoHead />

<Weekday />

<Weekend />
