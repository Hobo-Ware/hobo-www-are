import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: ['assets/*', '!assets/*.json'],
                    dest: 'assets',
                }
            ]
        }),
        viteSingleFile(),
    ],
    build: {
        target: 'esnext',
        cssCodeSplit: false,
        assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    },
})