import type { weekdayCopy } from '$lib/features/site/copy';

export function mount(root: HTMLElement, copy: ReturnType<typeof weekdayCopy>): () => void;
