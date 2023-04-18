import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Record } from 'pocketbase';
import { z } from 'zod';

const schema = z.object({
	github: z.string({ required_error: 'GitHub is required' }).url(),
	demo: z.string({ required_error: 'Demo is required' }).url(),
	authorOne: z.string({ required_error: 'Author is required' }).trim().email(),
	authorTwo: z
		.string({ required_error: 'Author is required' })
		.trim()
		.email()
		.optional()
		.or(z.literal('')),
	authorThree: z
		.string({ required_error: 'Author is required' })
		.trim()
		.email()
		.optional()
		.or(z.literal('')),
	title: z
		.string({ required_error: 'Title is required' })
		.trim()
		.min(1, "Can't be empty")
		.max(64, 'Max length is 64 chars'),
	description: z
		.string({ required_error: 'Description is required' })
		.trim()
		.min(1, "Can't be empty")
		.max(256, 'Max length is 256 chars')
});

type Submission = z.infer<typeof schema>;
type SubmissionRecord = Submission & Record;

export const load: PageServerLoad = async ({ parent, locals }) => {
	const data = await parent();

	if (!data.loggedIn) {
		throw redirect(307, '/login');
	}

	const [record] = await locals.pb.collection('submissions').getFullList<SubmissionRecord>();

	if (record)
		return {
			authorOne: record.authorOne,
			authorTwo: record.authorTwo,
			authorThree: record.authorThree,
			title: record.title,
			description: record.description,
			github: record.github,
			demo: record.demo
		};

	return {
		authorOne: data.user?.email || ''
	};
};

export const actions: Actions = {
	async default({ request, fetch, locals }) {
		// If not logged in then exit
		if (!locals.user) {
			throw error(401, 'Unauthorised');
		}

		// Raw data from the form
		const raw_data: Partial<Submission> = Object.fromEntries(await request.formData());

		return fail(401, {
			success: false,
			fields: raw_data ,
			error: 'Submissions are closed'
		})

		// Parse data with zod
		const result = await schema.safeParseAsync(raw_data);

		// If the submission is invalid return the errors to the frontend
		if (!result.success) {
			const errors = result.error.flatten();

			return fail(400, {
				fieldErrors: errors.fieldErrors,
				success: false,
				fields: raw_data
			});
		}

		try {
			// Find an existing record, if there is one
			const [record] = await locals.pb
				.collection('submissions')
				.getFullList<SubmissionRecord>();

			if (record) {
				// If there is an existing record then update it
				await locals.pb.collection('submissions').update(record.id, {
					authorTwo: '',
					authorThree: '',
					...result.data
				});
			} else {
				// If no record exists then create one
				await locals.pb.collection('submissions').create({
					...result.data,
					account: locals.user.id
				});
			}
		} catch (e) {
			return fail(400, {
				error: (e as any)?.message || 'Failed to save',
				success: false,
				fields: raw_data
			});
		}

		return {
			success: true,
			fields: result.data
		};
	}
};
