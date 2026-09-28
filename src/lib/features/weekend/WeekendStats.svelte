<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { ATTRIBUTES, PIPS, attributeName, isMaxed, statLabel } from '$lib/features/site/content';
	import FoilStops from './FoilStops.svelte';
	import { CROWN_RECTS } from './geometry';

	const { stats, id }: { stats: number[]; id: string } = $props();
</script>

<ul class="stats">
	{#each ATTRIBUTES as attribute, row (attribute)}
		{@const value = stats[row]}
		<li
			class="stat"
			class:crowned={isMaxed(value)}
			data-attr={attribute}
			style="--row:{row}"
			title={isMaxed(value) ? m.stat_maxed() : undefined}
		>
			<span class="stat-name">{attributeName(attribute).toLocaleUpperCase(getLocale())}</span><span
				class="pips"
				aria-hidden="true"
				>{#each PIPS as k (k)}<i class="pip" class:full={k < value} style="--k:{k}"
					></i>{/each}</span
			><span class="stat-val" aria-label={statLabel(attribute, value)}
				>{#if isMaxed(value)}<svg class="crown" viewBox="-.2 -.2 8.4 6.4" aria-hidden="true"
						><defs
							><linearGradient id="we-crown-{id}" x1="0" y1="0" x2="1" y2="1"
								><FoilStops /></linearGradient
							></defs
						><g fill="url(#we-crown-{id})" style="stroke:var(--foil-0, #5a3b12)" stroke-width=".22"
							>{#each CROWN_RECTS as [x, y, width, height], i (i)}<rect
									{x}
									{y}
									{width}
									{height}
								/>{/each}</g
						></svg
					>{/if}{value}</span
			>
		</li>
	{/each}
</ul>
