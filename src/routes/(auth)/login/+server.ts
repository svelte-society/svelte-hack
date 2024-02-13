import { error, redirect } from '@sveltejs/kit'

export async function GET({ url, locals, cookies }) {
	//? List all auth methods, we can't do this statically as it generates state data
	const methods = await locals.pb.collection('users').listAuthMethods()

	//? We only need GitHub
	const github = methods.authProviders.find((p) => p.name == 'github')

	if (!github) {
		throw error(500, 'Unable to find GitHub login config')
	}

	// Get the state and make it a cookie so we can use it in the callback
	cookies.set('login_state', JSON.stringify(github), {
		path: '/',
		secure: true,
		httpOnly: true,
		// expires in an hour
		maxAge: 60 * 60,
	})

	const oAuthUrl = new URL(github.authUrl)
	oAuthUrl.searchParams.set('redirect_uri', `${url.origin}/login/callback`)

	// Redirect to GitHub
	throw redirect(307, oAuthUrl)
}
