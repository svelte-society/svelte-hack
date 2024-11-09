import type { UsersTable } from '$lib/types/pocketbase'

import { clearAuthState, syncAuthState } from '$lib/server/pocketbase'
import { POCKETBASE_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'
import { MAINTENANCE } from '$lib/vars'
import Pocketbase from 'pocketbase'

function getTheme(cookie: any): 'dark' | 'light' | 'system' {
	return ['dark', 'light', 'system'].includes(cookie) ? cookie : 'dark'
}

export async function handle({ event, resolve }) {
	event.locals.pb = new Pocketbase(POCKETBASE_URL)

	if (event.cookies.get('pb_auth') && !MAINTENANCE) {
		const cookie = event.request.headers.get('cookie')
		if (!cookie) error(400, { message: 'No cookie header found.' })

		event.locals.pb.authStore.loadFromCookie(cookie)

		//? If the session token is valid, update the auth store.
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb
				.collection('users')
				.authRefresh()
				.then(() => syncAuthState(event.locals.pb, event.cookies))
				.catch(() => clearAuthState(event.locals.pb, event.cookies))
		} else {
			clearAuthState(event.locals.pb, event.cookies)
		}

		//? Store the user in locals.
		event.locals.user = event.locals.pb.authStore.model as UsersTable
	}

	if (event.route.id?.includes('(auth)') && MAINTENANCE) {
		redirect(307, '/maintenance')
	}

	// Set the page theme
	event.locals.theme = getTheme(event.cookies.get('theme'))

	let page = ''
	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html
			if (done) return page.replace('__THEME__', event.locals.theme)
		},
	})
}
