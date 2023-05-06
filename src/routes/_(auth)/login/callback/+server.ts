import { PB_REDIRECT_URL } from '$env/static/private';
import type { AuthProviderInfo } from 'pocketbase';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parse } from 'cookie';

export const GET: RequestHandler = async ({ cookies, locals, url, setHeaders }) => {
	const authError = url.searchParams.get('error_description');

	if (typeof authError == 'string' && authError.length) {
		throw error(500, `AUTH ERROR: ${authError}`);
	}

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// Check that the state and code search params exist
	if (typeof state != 'string' || typeof code != 'string') {
		throw error(400, 'Invalid callback state');
	}

	// Get the github auth state back from the cookie
	let github: AuthProviderInfo;

	try {
		github = JSON.parse(cookies.get('login_state', { path: '/' }) || '');
		if (!github) throw new Error('.');
	} catch {
		throw error(400, 'Unable to find login state, please try again');
	}

	// If the state doesn't match up, something went wrong
	if (github.state != state) {
		throw error(400, 'State mismatch');
	}

	try {
		// Log the user in
		await locals.pb
			.collection('users')
			.authWithOAuth2('github', code, github.codeVerifier, PB_REDIRECT_URL);

		// Get the cookie data from the cookie and then set the cookie
		// since we can't use the set-cookie header we have to re-extract the data
		const data = parse(locals.pb.authStore.exportToCookie());

		cookies.set('pb_auth', data.pb_auth, {
			path: '/',
			expires: data.Expires ? new Date(data.Expires) : undefined
		});

		// We don't need this again
		cookies.delete('login_state', { path: '/' });
	} catch (e) {
		throw error(500, (e as any)?.message || e);
	}

	// Go to logged in page
	throw redirect(307, '/submit');
};
