import { describe, expect, it } from 'vitest';
import { ogImage, ogMode } from './seo';

describe('ogMode', () => {
	it('picks the weekend card on Saturday and Sunday in UTC', () => {
		expect(ogMode(new Date('2026-10-03T00:00:00Z'))).toBe('weekend');
		expect(ogMode(new Date('2026-10-04T23:59:59Z'))).toBe('weekend');
	});

	it('picks the weekday card from Monday to Friday in UTC', () => {
		expect(ogMode(new Date('2026-10-05T00:00:00Z'))).toBe('weekday');
		expect(ogMode(new Date('2026-10-02T23:59:59Z'))).toBe('weekday');
	});

	it('follows the UTC day, not the local one', () => {
		expect(ogMode(new Date('2026-10-02T23:30:00-02:00'))).toBe('weekend');
		expect(ogMode(new Date('2026-10-05T00:30:00+02:00'))).toBe('weekend');
	});
});

describe('ogImage', () => {
	it('points at the card for the mode and locale', () => {
		expect(ogImage('en', 'weekday')).toBe('https://hoboware.dev/og/og-en.png');
		expect(ogImage('ro', 'weekend')).toBe('https://hoboware.dev/og/og-weekend-ro.png');
	});
});
