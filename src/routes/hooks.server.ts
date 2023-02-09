import type { Handle } from '@sveltejs/kit'
import { parse } from 'cookie'

/**
 * Injects the correct theme class into the root on the server to avoid FOUC.
 */
export const handle: Handle = ({ event, resolve }) => {
	const cookies = parse(event.request.headers?.get('cookie') || '')
	event.locals.theme = <'dark' | 'light' | 'system'>cookies.theme || 'dark'

	let page = ''
	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html
			if (done) return page.replace('%frackit.theme%', event.locals.theme)
		}
	})
}
