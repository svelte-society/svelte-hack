import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['three', 'three-custom-shader-material'],
	},
	// silence warnings - https://sass-lang.com/documentation/breaking-changes/legacy-js-api
	css: { preprocessorOptions: { scss: { api: 'modern' } } },
})
