type Canvas = HTMLCanvasElement | OffscreenCanvas;

export type SceneMessage = { type: string } & Record<string, unknown>;

export const BLAZE_MS: number;

export function createScene(options: {
	paint: Canvas;
	embers: Canvas;
	makeCanvas: (width: number, height: number) => Canvas;
	raf: (fn: (time: number) => void) => number;
	reduce: boolean;
	timeShift?: number;
	emit: (message: SceneMessage) => void;
}): { handle: (message: SceneMessage) => void };
