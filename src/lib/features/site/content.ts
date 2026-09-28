import { getLocale } from '$lib/paraglide/runtime';
import * as m from '$lib/paraglide/messages';
import HypeEnglish from '$lib/hype/en.json';
import HypeDutch from '$lib/hype/nl.json';
import HypeRomanian from '$lib/hype/ro.json';

export type Hype = { messages: string[]; slogan: string };
export type Attribute = 'intellect' | 'psyche' | 'physique' | 'motorics' | 'laziness';
export type SkillKey =
	| 'electrochemistry'
	| 'encyclopedia'
	| 'inland_empire'
	| 'drama'
	| 'logic'
	| 'volition'
	| 'perception'
	| 'composure'
	| 'shivers'
	| 'laziness';
export type FounderId = 'vlad' | 'sefer';

const hypeByLanguage = { en: HypeEnglish, nl: HypeDutch, ro: HypeRomanian };

export const hype = (): Hype[] => hypeByLanguage[getLocale()];

export const MAX_STAT = 6;

export const PIPS = Array.from({ length: MAX_STAT }, (_, k) => k);

export const isMaxed = (value: number) => value === MAX_STAT;

export const ATTRIBUTES: Attribute[] = ['intellect', 'psyche', 'physique', 'motorics', 'laziness'];

export const SKILL_ATTRIBUTE: Record<SkillKey, Attribute> = {
	electrochemistry: 'physique',
	encyclopedia: 'intellect',
	inland_empire: 'psyche',
	drama: 'intellect',
	logic: 'intellect',
	volition: 'psyche',
	perception: 'motorics',
	composure: 'motorics',
	shivers: 'physique',
	laziness: 'laziness'
};

export const LEVELS = [
	'trivial',
	'easy',
	'medium',
	'challenging',
	'formidable',
	'legendary',
	'heroic',
	'godly',
	'impossible'
] as const;

export const skillName = (key: SkillKey): string =>
	({
		electrochemistry: m.skill_electrochemistry,
		encyclopedia: m.skill_encyclopedia,
		inland_empire: m.skill_inland_empire,
		drama: m.skill_drama,
		logic: m.skill_logic,
		volition: m.skill_volition,
		perception: m.skill_perception,
		composure: m.skill_composure,
		shivers: m.skill_shivers,
		laziness: m.skill_laziness
	})[key]();

export const attributeName = (key: Attribute): string =>
	({
		intellect: m.stat_intellect,
		psyche: m.stat_psyche,
		physique: m.stat_physique,
		motorics: m.stat_motorics,
		laziness: m.stat_laziness
	})[key]();

export const levelName = (key: (typeof LEVELS)[number]): string =>
	({
		trivial: m.level_trivial,
		easy: m.level_easy,
		medium: m.level_medium,
		challenging: m.level_challenging,
		formidable: m.level_formidable,
		legendary: m.level_legendary,
		heroic: m.level_heroic,
		godly: m.level_godly,
		impossible: m.level_impossible
	})[key]();

export const check = (level: (typeof LEVELS)[number], success = true) =>
	m.check({ level: levelName(level), result: success ? m.result_success() : m.result_failure() });

export type Founder = {
	id: FounderId;
	name: string;
	stats: number[];
	linkedin: string;
	title: () => string;
	description: () => string;
};

export const FOUNDERS: Founder[] = [
	{
		id: 'vlad',
		name: 'Vlad',
		stats: [5, 6, 3, 4, 1],
		linkedin: 'https://www.linkedin.com/in/vladjerca/',
		title: m.founder_title_vlad,
		description: m.founder_description_vlad
	},
	{
		id: 'sefer',
		name: 'Sefer',
		stats: [5, 5, 2, 3, 6],
		linkedin: 'https://www.linkedin.com/in/sturan/',
		title: m.founder_title_sefer,
		description: m.founder_description_sefer
	}
];

export const statLabel = (attribute: Attribute, value: number) =>
	(isMaxed(value) ? m.stat_value_maxed : m.stat_value)({ name: attributeName(attribute), value });

export const GITHUB_URL = 'https://github.com/Hobo-Ware';

export type Project = { name: string; href: string; icon: string | null; line: () => string };

export const PROJECTS: Project[] = [
	{ name: 'Trakt', href: 'https://app.trakt.tv', icon: null, line: m.project_trakt_line },
	{
		name: 'kelp',
		href: 'https://kelp.hoboware.dev',
		icon: 'projects/kelp-128.webp',
		line: m.project_kelp_line
	},
	{
		name: 'stdusk',
		href: 'https://stdusk.hoboware.dev',
		icon: 'projects/stdusk-128.webp',
		line: m.project_stdusk_line
	}
];
