<script lang="ts">
	import './inventory.css';
	import { base } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import IconTrakt from '$lib/components/icons/IconTrakt.svelte';
	import { PROJECTS } from '$lib/features/site/content';
</script>

<section class="inventory" aria-labelledby="wd-inventory-title">
	<div class="inv-head">
		<div>
			<p class="inv-kicker">{m.inv_kicker()}</p>
			<h2 id="wd-inventory-title">{m.inv_title()}</h2>
		</div>
		<p class="inv-sub">{m.inv_sub()}</p>
	</div>
	<ul class="inv-list">
		{#each PROJECTS as project (project.id)}
			<li class="inv-item">
				<span class="inv-paper" aria-hidden="true"></span>
				<div class="inv-top">
					<span class="inv-icon" aria-hidden="true"
						>{#if project.icon}<img
								src="{base}/{project.icon}"
								alt=""
								width="56"
								height="56"
								loading="lazy"
								decoding="async"
							/>{:else}<IconTrakt />{/if}</span
					>
					<h3>{project.name}</h3>
				</div>
				<p class="inv-story">{project.story()}</p>
				<a
					class="inv-link"
					href={project.href}
					target="_blank"
					rel="noopener"
					aria-label={m.inv_open({ name: project.name })}
					><span class="inv-coal" aria-hidden="true"></span>{project.host}<span
						class="inv-arrow"
						aria-hidden="true">&nearr;</span
					></a
				>
			</li>
		{/each}
	</ul>
</section>
