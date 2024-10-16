export const prerender = false

export async function load({ locals }) {
	// todo optimise if there is time
	const hasSubmission = locals.user
		? await locals.pb
				.collection('submissions')
				.getFirstListItem('', { fields: 'id' })
				.then(() => true)
				.catch(() => false)
		: false

	return {
		user: locals.user,
		hasSubmission,
	}
}
