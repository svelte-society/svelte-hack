import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('pb_auth', { path: '/' })
	cookies.delete('login_state', { path: '/' })
	throw redirect(307, '/')
}
