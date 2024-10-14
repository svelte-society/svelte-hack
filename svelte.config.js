import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import mdsvexConfig from './mdsvex.config.js'
import auto from '@sveltejs/adapter-auto'
import postcss from './postcss.config.js'
import process from 'node:process'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		vitePreprocess({
			postcss,
		}),
		mdsvex(mdsvexConfig),
	],
	kit: {
		adapter: auto(),
		csrf: { checkOrigin: process.env['NODE_ENV'] != 'development' },
	},
	vitePlugin: {
		// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/inspector.md
		inspector: {
			toggleKeyCombo: process.platform == 'darwin' ? 'meta-i' : 'control-shift',
			toggleButtonPos: 'bottom-right',
		},
	},
}

export default config
