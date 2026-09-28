<script lang="ts">
	import { dev } from '$app/environment';
	import * as m from '$lib/paraglide/messages';
</script>

{#if dev}
	<div class="mode-switch" role="group" aria-label={m.mode_switch_label()}>
		<button type="button" data-mode-set="weekday">{m.mode_weekday()}</button><button
			type="button"
			data-mode-set="weekend">{m.mode_weekend()}</button
		>
	</div>
{/if}
