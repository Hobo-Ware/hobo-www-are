import type { weekendCopy } from '$lib/features/site/copy';

export function mount(root: HTMLElement, copy: ReturnType<typeof weekendCopy>): () => void;
