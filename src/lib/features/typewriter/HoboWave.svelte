<script>
	let dots = Array.from({ length: 3 }, (_, i) => ({
		delay: `${i * 0.2}s`
	}));
</script>

<div class="hobo-wave-container">
	{#each dots as { delay }}
		<div class="hobo-wave-dot" style="animation-delay: {delay}; --animation-duration: 1s;">.</div>
	{/each}
</div>

<style>
	.hobo-wave-container {
		display: flex;
		align-items: center;
	}

	.hobo-wave-dot {
		font-weight: bold;
		color: var(--foreground-color);
		border-radius: 50%;
		animation: wave var(--animation-duration) ease-in-out infinite;
	}

	@keyframes wave {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px); /* Adjust the height of the wave */
		}
	}
</style>
