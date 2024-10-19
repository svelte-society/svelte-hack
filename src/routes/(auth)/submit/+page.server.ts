import { message, setError, superValidate } from 'sveltekit-superforms/server'
import { submissionSchema, userPreferencesSchema } from './schema.server'
import { formatPBErrors } from '$lib/server/pocketbase'
import type { ClientResponseError } from 'pocketbase'
import { error, fail, redirect } from '@sveltejs/kit'
import { zod } from 'sveltekit-superforms/adapters'
import { SUBMISSIONS_OPEN } from '$lib/vars'

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

	const preferences = {
		preferedEmail: locals.user?.preferedEmail || locals.user?.email,
		name: locals.user?.name,
		pronouns: locals.user?.pronouns,
	}

	const preferencesForm = await superValidate(preferences, zod(userPreferencesSchema))
	const submissionForm = await superValidate(submission, zod(submissionSchema))

	return {
		submission,
		isSubmitter,
		submissionForm,
		preferencesForm,
	}
}

export const actions = {
	async updateSubmission({ request, locals }) {
		// If not logged in then exit
		if (!locals.user) {
			error(401, 'Unauthorised')
		}

		const form = await superValidate(request, zod(submissionSchema))
		if (!form.valid) return fail(400, { form })

		if (!SUBMISSIONS_OPEN) {
			return setError(form, '', 'Submissions are cloed')
		}

		if (form.data.rulesAccepted !== true) {
			return setError(
				form,
				'',
				"Please indicate you've read and agreed to the SvelteHack 2024 rules",
			)
		}

		try {
			// Find an existing record, if there is one
			const { submission, isSubmitter } = await getSubmission(locals)

			if (submission) {
				if (!isSubmitter) {
					return setError(
						form,
						'',
						'Only the member of your team that made the submission can make edits',
					)
				}

				// If there is an existing submission then update it
				await locals.pb.collection('submissions').update(submission.id, {
					...form.data,
				})
			} else {
				// If no record exists then create one
				await locals.pb.collection('submissions').create({
					submitter: locals.user.id,
					authorOne: locals.user.email,
					...form.data,
				})
			}
		} catch (e) {
			const error = e as ClientResponseError

			// todo
			return fail(400, {
				error: formatPBErrors(submissionSchema, error.response.data),
				success: false,
			})
		}

		return message(form, 'Saved!')
	},
	async updatePreferences({ request, locals }) {
		if (!locals.user) {
			error(401, 'Unauthorised')
		}

		const form = await superValidate(request, zod(userPreferencesSchema))
		if (!form.valid) return fail(400, { form })

		await locals.pb.collection('users').update(locals.user.id, {
			...form.data,
		})

		return message(form, 'Saved!')
	},
	async withdraw({ locals }) {
		if (!locals.user) {
			error(401, 'Unauthorised')
		}

		if (!SUBMISSIONS_OPEN) {
			return fail(400, {
				message: 'Submissions are closed, please email us to withdraw',
			})
		}

		const { submission, isSubmitter } = await getSubmission(locals)

		if (submission && isSubmitter) {
			await locals.pb.collection('submissions').delete(submission.id)
		}

		return {}
	},
}
