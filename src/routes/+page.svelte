<script lang="ts">
	import { browser } from '$app/environment';
	import HoboFooter from '$lib/components/HoboFooter.svelte';
	import HoboHeader from '$lib/components/HoboHeader.svelte';
	import HoboMain from '$lib/components/HoboMain.svelte';

	const theme = !browser ? '' : THEME_SEED;
</script>

<HoboHeader {theme} />

<HoboMain />

<HoboFooter />
