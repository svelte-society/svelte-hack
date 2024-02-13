import { PB_REDIRECT_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals, cookies }) => {
	// List all auth methods, we can't do this statically as it generates state data
	const methods = await locals.pb.collection('users').listAuthMethods();

	// We only need GitHub
	const github = methods.authProviders.find((p) => p.name == 'github');

	if (!github) {
		throw error(500, 'Unable to find GitHub login config');
	}

	// Get the state and make it a cookie so we can use it in the callback
	cookies.set('login_state', JSON.stringify(github), {
		path: '/',
		secure: true,
		httpOnly: true
	});

	const url = new URL(github.authUrl);
	url.searchParams.set('redirect_uri', PB_REDIRECT_URL);

	// Redirect to GitHub oauth
	throw redirect(307, url.toString());
};
