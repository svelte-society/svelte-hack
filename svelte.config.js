import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import mdsvexConfig from './mdsvex.config.js'
import auto from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: auto(),
		csrf: {
			checkOrigin: process.env['NODE_ENV'] != 'development',
		},
	},

	vitePlugin: {
		// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#inspector
		inspector: {
			toggleButtonPos: 'bottom-left',
			toggleKeyCombo: 'meta-alt',
			showToggleButton: 'active',
			holdMode: true,
		},
	},
}

export default config
