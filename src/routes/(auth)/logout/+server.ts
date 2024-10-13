import { clearAuthState } from '$lib/server/pocketbase'
import type { RequestHandler } from './$types'
import { redirect } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ cookies, locals }) => {
	clearAuthState(locals.pb, cookies)
	throw redirect(307, '/')
}
