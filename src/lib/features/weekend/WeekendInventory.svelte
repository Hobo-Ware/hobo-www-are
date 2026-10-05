<script lang="ts">
	import './inventory.css';
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import traktMarkup from '$lib/components/icons/IconTrakt.svelte?raw';
	import { PROJECTS, type Project } from '$lib/features/site/content';
	import TarotFrame from './TarotFrame.svelte';

	const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
	const messages = m as unknown as Record<string, () => string>;
	const text = (key: string) => messages[key]();

	const traktSrc =
		'data:image/svg+xml,' +
		encodeURIComponent(
			traktMarkup
				.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
				.replace('class="trakt-fg"', 'fill="#ed1c24"')
				.replace('class="trakt-bg"', 'fill="#ffffff"')
		);
	const iconSrc = (project: Project) => (project.icon ? `${base}/${project.icon}` : traktSrc);
</script>

<section class="we-inventory" aria-labelledby="we-inventory-title">
	<header class="we-inv-head">
		<p class="we-inv-kicker">{m.inv_kicker()}</p>
		<h2 id="we-inventory-title">{m.inv_title()}</h2>
		<p class="we-inv-sub">{m.inv_sub()}</p>
	</header>
	<ul class="deal minor-deal">
		{#each PROJECTS as project (project.id)}
			{@const title = text(`we_minor_${project.id}`)}
			<li>
				<article
					class="tarot minor"
					data-project={project.id}
					role="group"
					aria-roledescription={m.we_card_role()}
					aria-label={m.we_card_label({ arcana: title, name: project.name })}
				>
					<div class="tilt">
						<div class="tarot-inner">
							<div class="face front">
								<div class="window">
									<img src={iconSrc(project)} alt="" width="128" height="128" draggable="false" />
								</div>
								<TarotFrame id="minor-{project.id}" />
								<div class="numeral">{ROMAN[(project.rank ?? 1) - 1]}</div>
								<div class="plate">{title}</div>
								<div class="who">{project.name}</div>
								<span class="foil"></span>
							</div>
							<div class="face back" inert>
								<TarotFrame id="minor-{project.id}" back />
								<div class="back-body">
									<img
										class="sigil-icon"
										src={iconSrc(project)}
										alt=""
										width="128"
										height="128"
										draggable="false"
									/>
									<h3>{project.name}</h3>
									<p class="role">{title}</p>
									<p class="desc">{project.story()}</p>
									<p class="reading">
										<span><b>{m.we_upright()}</b>{text(`we_${project.id}_upright`)}</span><span
											><b>{m.we_reversed()}</b>{text(`we_${project.id}_reversed`)}</span
										>
									</p>
									<div class="back-actions">
										<a
											class="li"
											href={project.href}
											target="_blank"
											rel="noopener"
											aria-label={m.inv_open({ name: project.name })}
											><span>{project.host} ↗</span></a
										>
										<button class="turn-back" type="button">{m.we_turn_back()}</button>
									</div>
								</div>
								<span class="foil"></span>
							</div>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
</section>
