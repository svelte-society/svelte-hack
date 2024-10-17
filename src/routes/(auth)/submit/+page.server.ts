import { submissionSchema } from '$lib/server/submissions'
import type { ClientResponseError } from 'pocketbase'
import { error, fail, redirect } from '@sveltejs/kit'
import { SUBMISSIONS_OPEN } from '$lib/vars.js'
import { z } from 'zod'

type SchemaErrors = z.inferFlattenedErrors<typeof submissionSchema>['fieldErrors']

async function getSubmission(locals: App.Locals) {
	const submission = await locals.pb
		.collection('submissions')
		.getFirstListItem('')
		.catch((e: ClientResponseError) => {
			if (e.status == 404) return null
			error(500, e.message)
		})

	return {
		isSubmitter: !submission || submission.submitter === locals.user?.id,
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
			error(401, 'Unauthorised')
		}

		if (!SUBMISSIONS_OPEN) {
			return fail(401, {
				success: false,
				error: 'Submissions are closed',
			})
		}

		// Parse data with zod
		const { data, error: parseError } = await submissionSchema.safeParseAsync(
			// @ts-expect-error form data complaining
			Object.fromEntries(await request.formData()),
		)

		// If the submission is invalid return the errors to the frontend
		if (parseError) {
			const errors = parseError.flatten()

			return fail(400, {
				error: errors.fieldErrors,
				success: false,
			})
		}

		try {
			// Find an existing record, if there is one
			const { submission, isSubmitter } = await getSubmission(locals)

			if (submission) {
				if (!isSubmitter) {
					return fail(400, {
						error: 'Only the member of your team that made the submission can make edits',
						success: false,
					})
				}

				// If there is an existing submission then update it
				await locals.pb.collection('submissions').update(submission.id, {
					...data,
				})
			} else {
				// If no record exists then create one
				await locals.pb.collection('submissions').create({
					submitter: locals.user.id,
					authorOne: locals.user.email,
					...data,
				})
			}
		} catch (e) {
			const error = e as ClientResponseError

			if (error.response.data) {
				return fail(400, {
					error: Object.entries(error.response.data).reduce<Record<string, string>>(
						(a, [key, value]) => {
							a[key] =
								typeof value == 'object' && value && 'message' in value
									? `${value.message}`
									: 'Invalid'

							return a
						},
						{},
					) as SchemaErrors,
					success: false,
				})
			}

			return fail(400, {
				error: error.message || 'Failed to save',
				success: false,
			})
		}

		return {
			success: true,
		}
	},
}
