<script lang="ts">
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import IconLinkedInSquare from '$lib/components/icons/IconLinkedInSquare.svelte';
	import type { Founder } from '$lib/features/site/content';
	import cabinet from './cabinet.json';
	import TarotFrame from './TarotFrame.svelte';
	import WeekendStats from './WeekendStats.svelte';

	const { founder }: { founder: Founder } = $props();

	const TAROT = {
		vlad: {
			numeral: 'XVI',
			arcana: m.we_arcana_vlad,
			epithet: m.we_epithet_vlad,
			upright: m.we_vlad_upright,
			reversed: m.we_vlad_reversed
		},
		sefer: {
			numeral: 'IX',
			arcana: m.we_arcana_sefer,
			epithet: m.we_epithet_sefer,
			upright: m.we_sefer_upright,
			reversed: m.we_sefer_reversed
		}
	};
	const tarot = $derived(TAROT[founder.id]);
	const mandala = $derived(cabinet.mandalas[founder.id]);
</script>

<article
	class="tarot"
	data-founder={founder.id}
	role="group"
	aria-roledescription={m.we_card_role()}
	aria-label={m.we_card_label({ arcana: tarot.arcana(), name: founder.name })}
>
	<div class="tilt">
		<div class="tarot-inner">
			<div class="face front">
				<div class="window">
					<img
						src="{base}/{founder.id}/{founder.id}_600.webp"
						alt={m.portrait_alt({ name: founder.name })}
						width="600"
						height="793"
						draggable="false"
					/>
				</div>
				<TarotFrame id={founder.id} />
				<span class="glint" aria-hidden="true"
					><svg viewBox="0 0 8 6"
						><rect x="0" y="1" width="1" height="4" /><rect x="7" y="1" width="1" height="4" /><rect
							x="3"
							y="0"
							width="2"
							height="2"
						/><rect x="1" y="3" width="6" height="2" /><rect
							x="2"
							y="2"
							width="1"
							height="1"
						/><rect x="5" y="2" width="1" height="1" /></svg
					></span
				>
				<div class="numeral">{tarot.numeral}</div>
				<div class="plate">{tarot.arcana()}</div>
				<div class="who">{tarot.epithet()}</div>
				<span class="foil"></span>
			</div>
			<div class="face back" inert>
				<TarotFrame id={founder.id} back />
				<div class="back-body">
					<svg
						class="medallion"
						viewBox="-6 -6 102 102"
						aria-hidden="true"
						style="color:var(--card-gold)"
						><circle
							cx="45.0"
							cy="45.0"
							r="49.0"
							fill="none"
							stroke="currentColor"
							stroke-width=".8"
							opacity=".6"
						/><g fill="currentColor"
							>{#each mandala as [x, y], i (i)}<rect
									{x}
									{y}
									width="8.4"
									height="8.4"
									rx="1.2"
								/>{/each}</g
						><rect x="41.0" y="41.0" width="8" height="8" rx="1.5" fill="#fa1d3c" /></svg
					>
					<h3>{founder.name}</h3>
					<p class="role">{founder.title()}</p>
					<p class="desc">{founder.description()}</p>
					<WeekendStats stats={founder.stats} id={founder.id} />
					<p class="reading">
						<span><b>{m.we_upright()}</b>{tarot.upright()}</span><span
							><b>{m.we_reversed()}</b>{tarot.reversed()}</span
						>
					</p>
					<div class="back-actions">
						<a
							class="li"
							href={founder.linkedin}
							target="_blank"
							rel="noopener"
							aria-label={m.linkedin_open({ name: founder.name })}
							><IconLinkedInSquare /><span>LinkedIn</span></a
						>
						<button class="turn-back" type="button">{m.we_turn_back()}</button>
					</div>
				</div>
				<span class="foil"></span>
			</div>
		</div>
	</div>
</article>
