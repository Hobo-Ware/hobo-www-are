<script lang="ts">
	import { base } from '$app/paths';
	import IconTrakt from '$lib/components/icons/IconTrakt.svelte';
	import { PROJECTS } from './content';

	const { iconSize }: { iconSize: number } = $props();
</script>

<ul class="projects">
	{#each PROJECTS as project (project.name)}
		<li>
			<a
				class="proj"
				href={project.href}
				target="_blank"
				rel="noopener"
				data-rewrite={project.name.toUpperCase()}
			>
				<span class="proj-icon"
					>{#if project.icon}<img
							src="{base}/{project.icon}"
							alt=""
							width={iconSize}
							height={iconSize}
						/>{:else}<IconTrakt />{/if}</span
				><span class="proj-name">{project.name}</span><span class="proj-line">{project.line()}</span
				></a
			>
		</li>
	{/each}
</ul>
