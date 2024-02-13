import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		loggedIn: !!locals.user,
		user: locals.user ? { email: locals.user.email } : undefined,
	}
}
