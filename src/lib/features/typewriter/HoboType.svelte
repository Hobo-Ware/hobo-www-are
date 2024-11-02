<script lang="ts">
	import HoboWave from './HoboWave.svelte';
	import { typewriter } from './typewriter';
	import { onDestroy } from 'svelte';

	const { text, onComplete = () => {} }: { text: string[]; onComplete?: () => void } = $props();

	const { typed, untyped, isTyping, isComplete, start } = typewriter(text);

	setTimeout(start, 750);

	const unsubscribe = isComplete.subscribe((complete) => complete && onComplete());

	onDestroy(unsubscribe);
</script>

<div class="hobo-type-container">
	{#if $isTyping}
		<p>{$typed}</p>
		<p style="visibility: hidden;">{$untyped}</p>
	{/if}

	{#if !$isTyping}
		<HoboWave />
	{/if}
</div>

<style>
	p {
		user-select: none;
		display: block;
		margin: 0;
		white-space: pre;
	}
</style>
