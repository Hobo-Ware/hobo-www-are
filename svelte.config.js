import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined
		}),
		prerender: {
			entries: ['*', '/nl', '/ro']
		},
		typescript: {
			config: (config) => {
				config.exclude.push(
					'../src/lib/features/weekday/engine.js',
					'../src/lib/features/weekend/engine.js',
					'../src/lib/features/weekend/lens.js'
				);
			}
		}
	}
};

export default config;
