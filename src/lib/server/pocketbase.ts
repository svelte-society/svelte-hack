import type { Cookies } from '@sveltejs/kit'

import Pocketbase from 'pocketbase'
import { parse } from 'cookie'
import { DEV } from 'esm-env'

export function syncAuthState(pb: Pocketbase, cookies: Cookies) {
	const data = parse(pb.authStore.exportToCookie())

	cookies.set('pb_auth', data.pb_auth, {
		expires: data.Expires ? new Date(data.Expires) : undefined,
		httpOnly: true,
		sameSite: 'lax',
		secure: !DEV,
		path: '/',
	})

	cookies.delete('login_state', { path: '/' })
}

export function clearAuthState(pb: Pocketbase, cookies: Cookies) {
	pb.authStore.clear()
	cookies.delete('pb_auth', { path: '/' })
	cookies.delete('login_state', { path: '/' })
}
