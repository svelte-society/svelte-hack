import { SUBMISSIONS_KEY } from '$env/static/private'
import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { z } from 'zod'

const schema = z.object({
	github: z.string({ required_error: 'GitHub is required' }).url(),
	demo: z.string({ required_error: 'Demo is required' }).url(),
	title: z.string({ required_error: 'Title is required' }).trim().min(1, "Can't be empty").max(64, 'Max length is 64 chars'),
	author: z.string({ required_error: 'Author is required' }).trim().min(1, "Can't be empty"),
	twitter: z.string({ required_error: 'Twitter is required' }).url().optional(),
	description: z.string({ required_error: 'Description is required' }).trim().min(1, "Can't be empty").max(256, 'Max length is 256 chars')
})

const url = `https://hack-api.sveltesociety.dev/api/collections/submissions/records?key=${SUBMISSIONS_KEY}`

// TODO Rate Limit of some kind

export const actions: Actions = {
	async default({ request, fetch }) {
		const raw_data: Partial<z.infer<typeof schema>> = Object.fromEntries(await request.formData())
		const result = await schema.safeParseAsync(raw_data)

		// If the submission is invalid return the errors to the frontend
		if (!result.success) {
			const errors = result.error.flatten()

			return fail(400, {
				fieldErrors: errors.fieldErrors,
				success: false,
				fields: raw_data
			})
		}

		try {
			// Add the submission to the database
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(result.data),
				headers: {
					'content-type': 'application/json'
				}
			})

			if (!response.ok || response.status !== 200) {
				throw new Error(`${response.status} Failed to submit`)
			}
		} catch (e) {
			return fail(400, {
				error: (e as any)?.message || 'Failed to submit',
				success: false,
				fields: raw_data
			})
		}

		return {
			success: true
		}
	}
}
