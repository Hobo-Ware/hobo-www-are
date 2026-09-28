export const FOIL_STOPS: [number, string][] = [
	[0, '#5a3b12'],
	[0.22, '#a37a33'],
	[0.45, '#f6e3a4'],
	[0.55, '#fff4cf'],
	[0.7, '#c49a48'],
	[1, '#4e3310']
];

export const CROWN_RECTS: [number, number, number, number][] = [
	[0, 1, 1, 4],
	[7, 1, 1, 4],
	[3, 0, 2, 2],
	[1, 3, 6, 2],
	[2, 2, 1, 1],
	[5, 2, 1, 1]
];

export const CORNER_TRANSFORMS = [
	'translate(12 12)',
	'translate(338 12) scale(-1 1)',
	'translate(12 588) scale(1 -1)',
	'translate(338 588) scale(-1 -1)'
];

export function restingWave(): string {
	let d = '';
	for (let i = 0; i < 97; i++) {
		const a = (i / 96) * Math.PI * 2;
		const r = 33 * (1 + 0.004 * Math.sin(2 * a));
		d += `${i ? 'L' : 'M'}${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`;
	}
	return `${d}Z`;
}
