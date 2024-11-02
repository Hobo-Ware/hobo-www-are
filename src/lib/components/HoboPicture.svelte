<script lang="ts">
	import { base } from '$app/paths';
	import { SvelteMap } from 'svelte/reactivity';

	export const { founder, placeholder }: { founder: string; placeholder: string } = $props();

	function getPictureUrl(picture: HTMLPictureElement): string {
		const sources = picture.querySelectorAll('source');
		const image =
			Array.from(sources).find((source) => {
				const media = source.getAttribute('media');
				const isMatch = window.matchMedia(media ?? '').matches;

				return isMatch;
			}) ?? picture.querySelector('img');

		return image?.srcset ?? image?.src ?? '';
	}

	const ripples: SvelteMap<
		string,
		{
			offset: { left: number; top: number };
			cursor: { x: number; y: number };
			mask: string;
			diameter: number;
			radius: number;
		}
	> = new SvelteMap();

	function addRipple(event: MouseEvent) {
		const root = event.currentTarget! as HTMLDivElement;
		const { top, left } = root.getBoundingClientRect();

		const diameter = Math.max(root.clientWidth, root.clientHeight);
		const uuid = Math.random().toString(36).substr(2, 9);

		ripples.set(uuid, {
			offset: { top, left },
			cursor: { x: event.clientX, y: event.clientY },
			mask: getPictureUrl(root.querySelector('.hobo-founder')!),
			diameter,
			radius: diameter / 2
		});
	}

	function removeRipple(uuid: string) {
		ripples.delete(uuid);
	}
</script>

<div class="hobo-picture" role="presentation" onmouseenter={addRipple} onclick={addRipple}>
	{#each ripples.entries() as [uuid, { offset, cursor, mask, diameter, radius }] (uuid)}
		<div
			class="hobo-ripple-mask"
			style={`mask-image: url(${mask})`}
			onanimationend={() => removeRipple(uuid)}
		>
			<div
				class="hobo-ripple-active"
				style={`
					--ripple-left:${cursor.x - offset.left - radius}px; 
					--ripple-top:${cursor.y - offset.top - radius}px;
					--ripple-width: ${diameter}px;
					--ripple-height: ${diameter}px;
				`}
			></div>
		</div>
	{/each}
	<picture class="hobo-frame">
		<source
			draggable="false"
			type="image/webp"
			media="(max-width: 480px)"
			srcset={`${base}/${founder}/frame_${founder}_200.webp`}
		/>
		<source
			draggable="false"
			type="image/webp"
			media="(max-width: 768px)"
			srcset={`${base}/${founder}/frame_${founder}_400.webp`}
		/>
		<img
			draggable="false"
			srcset={`${base}/${founder}/frame_${founder}_600.webp`}
			alt={`hobo founder ${founder}`}
			onload={() => {
				document.getElementById(`hobo-placeholder-${founder}`)?.remove();
			}}
		/>
		<img
			id="hobo-placeholder-{founder}"
			draggable="false"
			src={placeholder}
			alt="hobo placeholder"
		/>
	</picture>

	<picture class="hobo-founder">
		<source
			draggable="false"
			type="image/webp"
			media="(max-width: 480px)"
			srcset={`${base}/${founder}/${founder}_200.webp`}
		/>
		<source
			draggable="false"
			type="image/webp"
			media="(max-width: 768px)"
			srcset={`${base}/${founder}/${founder}_400.webp`}
		/>
		<img
			draggable="false"
			srcset={`${base}/${founder}/${founder}_600.webp`}
			alt={`hobo founder ${founder}`}
		/>
	</picture>
</div>

<style>
	.hobo-picture {
		position: relative;
		user-select: none;
	}

	picture img {
		width: var(--hobo-picture-size);
	}

	.hobo-frame {
		img {
			position: absolute;
			pointer-events: auto;
			transition-property: width, height, margin-left, margin-top;
			transition-duration: 150ms;

			&:hover {
				width: calc(100% + 5%);
				height: auto;
				margin-left: -2.5%;
				margin-top: -2.5%;
				mask-size: calc(100% + 5%);
				mask-position: center;
			}
		}
	}

	:global(.hobo-ripple-mask) {
		overflow: hidden;
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		mask-repeat: no-repeat;
		mask-size: 100%;
	}

	:global(.hobo-ripple-active::after) {
		content: '';
		position: absolute;
		border-radius: 50%;
		width: var(--ripple-width);
		height: var(--ripple-height);
		left: var(--ripple-left);
		top: var(--ripple-top);
		background-color: rgba(0, 0, 0, 0.2);
		transform: scale(0);
		animation: ripple 750ms linear;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
