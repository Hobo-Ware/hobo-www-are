import HypeEnglish from '$lib/hype/en.json';
import HypeDutch from '$lib/hype/nl.json';
import HypeRomanian from '$lib/hype/ro.json';
import type { Hype } from '$lib/features/site/content';
import { getLocale, type Locale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

const hypeByLanguage: Record<Locale, Hype[]> = {
	en: HypeEnglish,
	nl: HypeDutch,
	ro: HypeRomanian
};

export const load: PageServerLoad = () => ({ hype: hypeByLanguage[getLocale()] });
