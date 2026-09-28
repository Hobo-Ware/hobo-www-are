<script lang="ts">
	import FoilStops from './FoilStops.svelte';
	import { CORNER_TRANSFORMS } from './geometry';

	const { id, back = false }: { id: string; back?: boolean } = $props();
	const gid = $derived(`we-foil-${id}-${back ? 'b' : 'f'}`);
	const gold = $derived(`url(#${gid})`);
</script>

<svg class="ornament" viewBox="0 0 350 600" aria-hidden="true"
	><defs
		><linearGradient
			id={gid}
			class="foil-grad"
			gradientUnits="userSpaceOnUse"
			x1="0"
			y1="0"
			x2="350"
			y2="600"><FoilStops /></linearGradient
		></defs
	><rect
		x="11"
		y="11"
		width="328"
		height="578"
		rx="11"
		fill="none"
		stroke={gold}
		stroke-width="2.4"
	/><rect
		x="18.5"
		y="18.5"
		width="313"
		height="563"
		rx="7"
		fill="none"
		stroke={gold}
		stroke-width=".5"
	/><rect
		x="23.5"
		y="23.5"
		width="303"
		height="553"
		rx="5"
		fill="none"
		style="stroke:var(--card-accent)"
		stroke-width=".6"
	/><g color={gold} fill={gold} stroke={gold}
		>{#each CORNER_TRANSFORMS as transform (transform)}<use
				href="#we-corner"
				width="60"
				height="60"
				{transform}
			/>{/each}</g
	>{#if back}<circle
			cx="175"
			cy="300"
			r="150"
			fill="none"
			stroke={gold}
			stroke-width=".5"
			opacity=".35"
		/><circle
			cx="175"
			cy="300"
			r="138"
			fill="none"
			stroke={gold}
			stroke-width=".4"
			stroke-dasharray="1 5"
			opacity=".4"
		/>{:else}<path
			fill="none"
			stroke={gold}
			stroke-width="1.8"
			d="M38.5 450V170Q38.5 100 175 78Q311.5 100 311.5 170V450Z"
		/><path
			fill="none"
			stroke={gold}
			stroke-width=".45"
			d="M32 456V168Q32 94 175 71Q318 94 318 168V456Z"
		/><path
			fill="rgba(0,0,0,.28)"
			stroke={gold}
			stroke-width="1.2"
			d="M128 42L144 27H206L222 42L206 57H144Z"
		/><path
			fill="none"
			stroke={gold}
			stroke-width=".4"
			d="M133 42L146.5 30H203.5L217 42L203.5 54H146.5Z"
		/><path stroke={gold} stroke-width=".9" d="M60 472H290" /><path
			stroke={gold}
			stroke-width=".4"
			d="M60 476H290M60 527H290"
		/><path stroke={gold} stroke-width=".9" d="M60 531H290" />{/if}</svg
>
