import type { TypedPocketbase, UsersTable } from '$lib/types/pocketbase'

declare global {
	namespace App {
		interface Locals {
			theme: 'dark' | 'light' | 'system'
			pb: TypedPocketbase
			user?: UsersTable
		}

		interface PageData {
			user?: UsersTable
			hasSubmission: boolean
		}
	}
}
