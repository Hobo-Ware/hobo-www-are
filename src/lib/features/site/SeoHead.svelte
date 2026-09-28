<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { baseLocale, getLocale } from '$lib/paraglide/runtime';
	import { alternates, ogImage, ogLocale, otherOgLocales, pageUrl } from './seo';

	const locale = getLocale();
	const title = m.seo_title();
	const description = m.seo_description();
	const url = pageUrl(locale);
	const image = ogImage(locale);
	const imageAlt = m.og_image_alt();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each alternates as alternate (alternate.locale)}
		<link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={pageUrl(baseLocale)} />
	<meta name="theme-color" content="#0f1215" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Hoboware" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:locale" content={ogLocale(locale)} />
	{#each otherOgLocales(locale) as alternate (alternate)}
		<meta property="og:locale:alternate" content={alternate} />
	{/each}
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
