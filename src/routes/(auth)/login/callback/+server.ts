import { PB_REDIRECT_URL } from '$env/static/private';
import type { AuthProviderInfo } from 'pocketbase';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parse } from 'cookie';

export const GET: RequestHandler = async ({ cookies, locals, url, setHeaders }) => {
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (typeof state != 'string' || typeof code != 'string') {
		throw error(400, 'Invalid callback state');
	}

	let github: AuthProviderInfo;

	try {
		github = JSON.parse(cookies.get('login_state') || '');
		if (!github) throw new Error('.');
	} catch {
		throw error(400, 'Unable to find login state, please try again');
	}

	if (github.state != state) {
		throw error(400, 'State mismatch');
	}

	try {
		await locals.pb
			.collection('users')
			.authWithOAuth2('github', code, github.codeVerifier, PB_REDIRECT_URL);

		const data = parse(locals.pb.authStore.exportToCookie());

		cookies.set('pb_auth', data.pb_auth, {
			path: '/',
			expires: data.Expires ? new Date(data.Expires) : undefined
		});

		cookies.delete('login_state');
	} catch (e) {
		throw error(500, (e as any)?.message || e);
	}

	throw redirect(307, '/submit');
};
