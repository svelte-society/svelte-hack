import type { TypedPocketbase } from '$lib/types/pocketbase'
import { submissionSchema } from '$lib/server/submissions'
import { error, fail, redirect } from '@sveltejs/kit'

async function getSubmission(pb: TypedPocketbase) {
	const result = await pb.collection('submissions').getList(1, 1, {
		skipTotal: true,
		fields: '',
	})

	return result.items.at(0) || null
}

export async function load({ parent, locals }) {
	const data = await parent()

	if (!data.loggedIn) {
		throw redirect(307, '/login')
	}

	const submission = await getSubmission(locals.pb)

	return {
		submission,
	}
}

export const actions = {
	async updateSubmission({ request, locals }) {
		// If not logged in then exit
		if (!locals.user) {
			throw error(401, 'Unauthorised')
		}

		// return fail(401, {
		// 	success: false,
		// 	error: 'Submissions are closed',
		// })

		// Parse data with zod
		const result = await submissionSchema.safeParseAsync(
			// @ts-expect-error form data complaining
			Object.fromEntries(await request.formData()),
		)

		// If the submission is invalid return the errors to the frontend
		if (!result.success) {
			const errors = result.error.flatten()

			return fail(400, {
				error: errors.fieldErrors,
				success: false,
			})
		}

		try {
			// Find an existing record, if there is one
			const record = await getSubmission(locals.pb)

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
					authorOne: locals.user.email,
					account: locals.user.id,
				})
			}
		} catch (e) {
			return fail(400, {
				error: (e as any)?.message || 'Failed to save',
				success: false,
			})
		}

		return {
			success: true,
		}
	},
}
