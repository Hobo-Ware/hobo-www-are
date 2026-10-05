import * as m from '$lib/paraglide/messages';
import { baseLocale, locales, type Locale } from '$lib/paraglide/runtime';
import { FOUNDERS, GITHUB_URL } from './content';

export const SITE_URL = 'https://hoboware.dev';

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', nl: 'nl_NL', ro: 'ro_RO' };

const FOUNDER_NAMES: Record<string, string> = { vlad: 'Vlad Jerca', sefer: 'Sefer Turan' };

export const pageUrl = (locale: Locale) =>
	locale === baseLocale ? `${SITE_URL}/` : `${SITE_URL}/${locale}`;

export type OgMode = 'weekday' | 'weekend';

export const ogMode = (date: Date): OgMode =>
	date.getUTCDay() === 0 || date.getUTCDay() === 6 ? 'weekend' : 'weekday';

export const buildOgMode = ogMode(new Date(__BUILD_TIME__));

export const ogImage = (locale: Locale, mode: OgMode = 'weekday') =>
	`${SITE_URL}/og/og-${mode === 'weekend' ? 'weekend-' : ''}${locale}.png`;

export const ogLocale = (locale: Locale) => OG_LOCALE[locale];

export const alternates = locales.map((locale) => ({ locale, href: pageUrl(locale) }));

export const otherOgLocales = (locale: Locale) =>
	locales.filter((other) => other !== locale).map(ogLocale);

export function structuredData(locale: Locale) {
	const organization = {
		'@type': 'Organization',
		'@id': `${SITE_URL}/#organization`,
		name: 'Hoboware',
		url: `${SITE_URL}/`,
		logo: `${SITE_URL}/favicon/icon-512.png`,
		sameAs: [GITHUB_URL],
		founder: FOUNDERS.map((founder) => ({
			'@type': 'Person',
			name: FOUNDER_NAMES[founder.id],
			jobTitle: founder.title(),
			sameAs: [founder.linkedin]
		}))
	};
	const website = {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		name: 'Hoboware',
		url: pageUrl(locale),
		inLanguage: locale,
		description: m.seo_description({}, { locale }),
		publisher: { '@id': organization['@id'] }
	};
	const json = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [organization, website]
	});
	return `<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`;
}
