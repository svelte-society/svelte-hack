import { z } from 'zod'

export const submissionSchema = z.object({
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
		.max(256, 'Max length is 256 chars'),
})

export type Submission = z.infer<typeof submissionSchema>
