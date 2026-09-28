<script lang="ts">
	import { type Locale, getLocale, locales, setLocale } from '$lib/paraglide/runtime';

	const tagToFlag: Record<Locale, string> = {
		en: '🇬🇧',
		nl: '🇳🇱',
		ro: '🇷🇴'
	};

	const tagToTitle: Record<Locale, string> = {
		en: 'English',
		nl: 'Nederlands',
		ro: 'Română'
	};

	const currentLanguage = getLocale();
</script>

<div class="container">
	<select onchange={(ev) => setLocale(ev.currentTarget.value as Locale)}>
		{#each locales as tag (tag)}
			<option selected={currentLanguage == tag} value={tag}>
				{tagToTitle[tag]}
				{tagToFlag[tag]}
			</option>
		{/each}
	</select>
</div>

<style>
	.container {
		width: 10em;
		margin: auto;
		text-align: center;
		font-family: Arial, sans-serif;
	}

	select {
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border: 1px solid var(--color-foreground);
		border-radius: 5px;
		color: var(--color-foreground);
		background-color: color-mix(in srgb, var(--color-background) 85%, var(--color-foreground) 15%);
		appearance: none;

		transition-property: background-color, color, border;
		transition-duration: 150ms;
		transition-timing-function: ease-in-out;
	}

	select:focus {
		outline: none;
		border-color: var(--color-primary);
	}
</style>
