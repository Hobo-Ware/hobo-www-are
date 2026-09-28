<svelte:options namespace="svg" />

<script lang="ts">
	import { FOIL_STOPS } from './geometry';
</script>

{#each FOIL_STOPS as [offset, color], i (i)}
	<stop {offset} style="stop-color:var(--foil-{i}, {color})" />
{/each}
