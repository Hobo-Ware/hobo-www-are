import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { fontPreloadScript } from '$lib/features/site/font-preload';
import { structuredData } from '$lib/features/site/seo';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('%paraglide.lang%', locale).replace('%hobo.jsonld%', structuredData(locale))
		});
	});

const handleFontPreload: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%hobo.fonts%', fontPreloadScript)
	});

export const handle: Handle = sequence(handleParaglide, handleFontPreload);
