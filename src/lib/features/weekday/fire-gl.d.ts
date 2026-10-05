export function createFireGL(
	canvas: HTMLCanvasElement | OffscreenCanvas,
	options: {
		atlas: HTMLCanvasElement | OffscreenCanvas;
		lut32: Uint32Array[];
		maxEmbers: number;
		maxFlames: number;
	}
): Record<string, (...args: never[]) => void> | null;
