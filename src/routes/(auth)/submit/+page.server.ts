import { submissionSchema, type Submission } from '$lib/server/submissions'
import { error, fail, redirect } from '@sveltejs/kit'

export async function load({ parent, locals }) {
	const data = await parent()

	if (!data.loggedIn) {
		throw redirect(307, '/login')
	}

	const [record] = await locals.pb.collection('submissions').getFullList()

	if (record)
		return {
			authorOne: record.authorOne,
			authorTwo: record.authorTwo,
			authorThree: record.authorThree,
			title: record.title,
			description: record.description,
			github: record.github,
			demo: record.demo,
		}

	return {
		authorOne: data.user?.email || '',
	}
}

export const actions = {
	async default({ request, locals }) {
		// If not logged in then exit
		if (!locals.user) {
			throw error(401, 'Unauthorised')
		}

		// Raw data from the form
		// @ts-expect-error form data complaining
		const raw_data: Partial<Submission> = Object.fromEntries(await request.formData())

		// return fail(401, {
		// 	success: false,
		// 	fields: raw_data,
		// 	error: 'Submissions are closed',
		// })

		// Parse data with zod
		const result = await submissionSchema.safeParseAsync(raw_data)

		// If the submission is invalid return the errors to the frontend
		if (!result.success) {
			const errors = result.error.flatten()

			return fail(400, {
				fieldErrors: errors.fieldErrors,
				success: false,
				fields: raw_data,
			})
		}

		try {
			// Find an existing record, if there is one
			const [record] = await locals.pb.collection('submissions').getFullList()

			if (record) {
				// If there is an existing record then update it
				await locals.pb.collection('submissions').update(record.id, {
					authorTwo: '',
					authorThree: '',
					...result.data,
				})
			} else {
				// If no record exists then create one
				await locals.pb.collection('submissions').create({
					...result.data,
					account: locals.user.id,
				})
			}
		} catch (e) {
			return fail(400, {
				error: (e as any)?.message || 'Failed to save',
				success: false,
				fields: raw_data,
			})
		}

		return {
			success: true,
			fields: result.data,
		}
	},
}
