import { base } from '$app/paths';
import { getLocale } from '$lib/paraglide/runtime';
import * as m from '$lib/paraglide/messages';
import {
	ATTRIBUTES,
	FOUNDERS,
	LEVELS,
	SKILL_ATTRIBUTE,
	attributeName,
	check,
	hype,
	levelName,
	skillName,
	statLabel,
	type Attribute,
	type Hype,
	type SkillKey
} from './content';

const pad = (n: number) => String(n).padStart(2, '0');

const capitalize = (s: string) => s.charAt(0).toLocaleUpperCase(getLocale()) + s.slice(1);

export function clock(date: Date): string {
	const hour = date.getHours();
	const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
	const dayOfYear = Math.round((startOfDay - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5);
	const weekday = new Intl.DateTimeFormat(getLocale(), { weekday: 'long' }).format(date);
	return m.wd_clock({
		phase: hour >= 20 || hour < 6 ? m.wd_clock_night() : m.wd_clock_day(),
		day: dayOfYear,
		weekday: capitalize(weekday),
		time: `${pad(hour)}:${pad(date.getMinutes())}`
	});
}

export function weekendClock(date: Date): string {
	const weekday = new Intl.DateTimeFormat(getLocale(), { weekday: 'long' }).format(date);
	return m.we_clock({ weekday, time: `${pad(date.getHours())}:${pad(date.getMinutes())}` });
}

const WEEKDAY_SKILLS: SkillKey[] = [
	'electrochemistry',
	'encyclopedia',
	'inland_empire',
	'drama',
	'logic',
	'volition',
	'perception',
	'composure'
];

const WEEKEND_SKILLS: SkillKey[] = [
	'electrochemistry',
	'encyclopedia',
	'inland_empire',
	'inland_empire',
	'drama',
	'logic',
	'volition',
	'shivers',
	'perception',
	'composure'
];

const FOUNDER_LINES: Record<string, [SkillKey, () => string][]> = {
	vlad: [
		['perception', m.wd_vlad_line_1],
		['electrochemistry', m.wd_vlad_line_2],
		['logic', m.wd_vlad_line_3]
	],
	sefer: [
		['logic', m.wd_sefer_line_1],
		['inland_empire', m.wd_sefer_line_2],
		['laziness', m.wd_sefer_line_3]
	]
};

const skillPair = (key: SkillKey): [string, Attribute] => [skillName(key), SKILL_ATTRIBUTE[key]];

const shared = () => ({
	hype: hype(),
	levels: LEVELS.map(levelName),
	legendary: check('legendary'),
	check: (level: string, success: boolean) =>
		m.check({ level, result: success ? m.result_success() : m.result_failure() })
});

export const tallestHype = (entries: Hype[]) =>
	entries.reduce(
		(best, entry, i) => {
			const size = [entry.messages.length, entry.messages.join('').length + entry.slogan.length];
			return size[0] > best.size[0] || (size[0] === best.size[0] && size[1] > best.size[1])
				? { i, size }
				: best;
		},
		{ i: 0, size: [0, 0] }
	).i;

export const PRERENDER_SKILLS = WEEKDAY_SKILLS.map(skillPair);

export function weekdayCopy() {
	return {
		...shared(),
		skills: WEEKDAY_SKILLS.map(skillPair),
		founders: Object.fromEntries(
			FOUNDERS.map((f) => [
				f.id,
				{
					name: f.name,
					role: f.title(),
					desc: f.description(),
					img: `${base}/${f.id}/${f.id}_600.webp`,
					stats: f.stats,
					lines: FOUNDER_LINES[f.id].map(([key, text]) => [...skillPair(key), text()])
				}
			])
		),
		statNames: ATTRIBUTES.map((a) => [attributeName(a), a]),
		statLabel,
		crown: m.crown(),
		earlier: (count: number) => m.wd_earlier({ count }),
		collapse: m.wd_collapse(),
		clock,
		portraitAlt: (name: string) => m.portrait_alt({ name }),
		readSheet: m.wd_read_sheet(),
		blaze: {
			skill: skillName('electrochemistry'),
			attr: SKILL_ATTRIBUTE.electrochemistry,
			check: check('heroic'),
			text: m.wd_blaze()
		}
	};
}

export function weekendCopy() {
	return {
		...shared(),
		skills: WEEKEND_SKILLS.map(skillPair),
		clock: weekendClock,
		dreaming: m.we_theme_dreaming(),
		awake: m.we_theme_awake(),
		internalizing: m.we_internalizing(),
		sigilDone: (thought: string, bonus: string, slogan: string) =>
			m.we_sigil_done({ thought, bonus, slogan }),
		epilogue: { skill: skillName('inland_empire'), check: check('godly'), text: m.we_epilogue() },
		sleep: { skill: skillName('laziness'), check: check('legendary'), text: m.we_sleep() },
		wake: { skill: skillName('volition'), check: check('easy'), text: m.we_wake() }
	};
}
