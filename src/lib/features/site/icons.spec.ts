import { describe, expect, it } from 'vitest';
import { iconTags } from './icons';

describe('iconTags', () => {
	it('serves the build-day set and carries both sets for the boot script', () => {
		const weekend = iconTags('weekend');
		expect(weekend).toContain(
			'href="/favicon/favicon-weekend.svg" data-weekday="/favicon/favicon.svg"'
		);
		expect(weekend).toContain('<meta name="theme-color" content="#0d0a15"');
		expect(iconTags('weekday')).toContain(
			'href="/manifest.webmanifest" data-weekday="/manifest.webmanifest" data-weekend="/manifest-weekend.webmanifest"'
		);
	});
});
