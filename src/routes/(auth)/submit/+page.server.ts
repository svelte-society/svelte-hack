import { dangerously_get_pb_admin } from '$lib/server/pb-admin'
import { submissionSchema } from '$lib/server/submissions'
import type { ClientResponseError } from 'pocketbase'
import { error, fail, redirect } from '@sveltejs/kit'
import { SUBMISSIONS_OPEN } from '$lib/vars.js'

async function getSubmission(locals: App.Locals) {
	const submission = await locals.pb
		.collection('submissions')
		.getFirstListItem('')
		.catch((e: ClientResponseError) => {
			if (e.status == 404) return null
			error(500, e.message)
		})

	return {
		isSubmitter: submission ? submission.account == locals.user?.id : null,
		submission,
	}
}

export async function load({ parent, locals }) {
	const data = await parent()

	if (!data.user) {
		throw redirect(307, '/login')
	}

	const { submission, isSubmitter } = await getSubmission(locals)

	return {
		submission,
		isSubmitter,
	}
}

export const actions = {
	async updateSubmission({ request, locals }) {
		// If not logged in then exit
		if (!locals.user) {
			throw error(401, 'Unauthorised')
		}

		if (!SUBMISSIONS_OPEN) {
			return fail(401, {
				success: false,
				error: 'Submissions are closed',
			})
		}

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
			const { submission, isSubmitter } = await getSubmission(locals)

			if (submission && !isSubmitter) {
				return fail(400, {
					error: 'Only the member of your team that made the submission can make edits',
					success: false,
				})
			}

			const pbAdmin = await dangerously_get_pb_admin()

			if (submission) {
				// If there is an existing submission then update it
				await pbAdmin.collection('submissions').update(submission.id, {
					authorTwo: '',
					authorThree: '',
					...result.data,
				})
			} else {
				// If no record exists then create one
				await pbAdmin.collection('submissions').create({
					...result.data,
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
