export const prerender = false

export function load({ locals }) {
	return {
		user: locals.user,
	}
}
