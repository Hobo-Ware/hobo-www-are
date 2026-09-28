<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { ATTRIBUTES, PIPS, attributeName, isMaxed, statLabel } from '$lib/features/site/content';

	const { stats }: { stats: number[] } = $props();
</script>

<ul class="stats">
	{#each ATTRIBUTES as attribute, row (attribute)}
		{@const value = stats[row]}
		<li class="stat" class:maxed={isMaxed(value)} data-attr={attribute} style="--row:{row}">
			<span class="stat-name">{attributeName(attribute).toLocaleUpperCase(getLocale())}</span><span
				class="pips"
				aria-hidden="true"
				>{#each PIPS as k (k)}<i class="pip" class:full={k < value} style="--k:{k}"
					></i>{/each}</span
			><span class="stat-val" aria-label={statLabel(attribute, value)}
				>{value}{#if isMaxed(value)}<svg
						class="crown"
						viewBox="0 0 7 5"
						aria-label={m.crown()}
						role="img"
						><path
							fill="currentColor"
							d="M0 0h1v1H0zM3 0h1v1H3zM6 0h1v1H6zM0 1h2v1H0zM3 1h1v1H3zM5 1h2v1H5zM0 2h7v2H0zM1 4h5v1H1z"
						/><rect x="3" y="2" width="1" height="1" fill="#fa1d3c" /></svg
					>{/if}</span
			>
		</li>
	{/each}
</ul>
