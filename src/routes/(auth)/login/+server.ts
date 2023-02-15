import { PB_REDIRECT_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals, cookies }) => {
	const methods = await locals.pb.collection('users').listAuthMethods();
	const github = methods.authProviders.find((p) => p.name == 'github');

	if (!github) {
		throw error(500, 'Unable to find GitHub login config');
	}

	cookies.set('login_state', JSON.stringify(github));

	const url = new URL(github.authUrl);
	url.searchParams.set('redirect_uri', PB_REDIRECT_URL);

	throw redirect(307, url.toString());
};
