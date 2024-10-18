import { z } from 'zod'

export const submissionSchema = z.object({
	github: z.string({ required_error: 'GitHub is required' }).url(),
	demo: z.string({ required_error: 'Demo is required' }).url(),
	authorTwo: z
		.string({ required_error: 'Author is required' })
		.trim()
		.email()
		.optional()
		.or(z.literal(''))
		.default(''),
	authorThree: z
		.string({ required_error: 'Author is required' })
		.trim()
		.email()
		.optional()
		.or(z.literal(''))
		.default(''),
	title: z
		.string({ required_error: 'Title is required' })
		.trim()
		.min(1, "Can't be empty")
		.max(64, 'Max length is 64 chars'),
	description: z
		.string({ required_error: 'Description is required' })
		.trim()
		.min(1, "Can't be empty")
		.max(256, 'Max length is 256 chars'),
	rulesAccepted: z.literal('on', {
		errorMap: () => ({
			message: "Please indicate you've read and agreed to the SvelteHack 2024 rules",
		}),
	}),
})

export type Submission = z.infer<typeof submissionSchema>

export const userPreferencesSchema = z.object({
	preferedEmail: z.string().trim().email().optional(),
	name: z.string().trim().max(64, 'Max length is 64 chars').optional(),
	pronouns: z.string().trim().max(32, 'Max length is 64 chars').optional(),
})
