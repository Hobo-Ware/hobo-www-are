import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	define: {
		__BUILD_TIME__: JSON.stringify(new Date().toISOString())
	},
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './paraglide/project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'baseLocale']
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
