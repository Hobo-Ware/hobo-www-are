import { describe, expect, it } from 'vitest';
import { clock, tallestHype } from './copy';

describe('clock', () => {
	it('reads as day with the day of the year during daytime', () => {
		expect(clock(new Date(2026, 8, 28, 14, 5))).toBe('Day 271 · Monday · 14:05');
	});

	it('reads as night from 20:00', () => {
		expect(clock(new Date(2026, 8, 28, 23, 20))).toBe('Night 271 · Monday · 23:20');
	});
});

describe('tallestHype', () => {
	it('prefers more lines, then more characters', () => {
		const entries = [
			{ messages: ['a much longer single line'], slogan: 'x' },
			{ messages: ['one', 'two'], slogan: 'y' },
			{ messages: ['three', 'four'], slogan: 'z' }
		];
		expect(tallestHype(entries)).toBe(2);
	});
});
