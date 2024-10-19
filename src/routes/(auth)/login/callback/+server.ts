import type { AuthProviderInfo } from 'pocketbase'
import type { RequestHandler } from './$types'

import { syncAuthState } from '$lib/server/pocketbase'
import { error, redirect } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ cookies, locals, url }) => {
	if (locals.user) {
		redirect(307, '/submit')
	}

	//? Try and get auth errors from the provider (if any)
	const authError =
		url.searchParams.get('error_description') || url.searchParams.get('error_message')

	if (typeof authError == 'string' && authError.length) {
		error(500, `AUTH ERROR: ${authError}`)
	}

	const state = url.searchParams.get('state')
	const code = url.searchParams.get('code')

	//? Check that the state and code search params exist
	if (typeof state != 'string' || typeof code != 'string') {
		error(400, 'Unable to find login state, please try again')
	}

	//? Get the auth state back from the cookie
	let provider: AuthProviderInfo

	try {
		provider = JSON.parse(cookies.get('login_state')!)
		if (!provider) throw new Error('.')
	} catch {
		error(400, 'Unable to parse login state, please try again')
	}

	//? If the state doesn't match up, something went wrong
	if (provider.state != state) {
		const msg = 'State mismatch'
		error(400, msg)
	}

	//? Log the user in
	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2Code(
				provider.name,
				code,
				provider.codeVerifier,
				`${url.origin}/login/callback`,
			)
	} catch (e) {
		console.log('auth error', e)
		error(500, 'There was an error logging you in')
	}

	//? Sync the auth state
	syncAuthState(locals.pb, cookies)
	cookies.delete('login_state', { path: '/' })

	//? Redirect to the correct page
	redirect(307, '/submit')
}
