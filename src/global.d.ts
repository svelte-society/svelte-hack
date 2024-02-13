import type { TypedPocketBase, UsersTable } from '$lib/types/pocketbase'

declare global {
	namespace App {
		interface Locals {
			theme: 'dark' | 'light' | 'system'
			pb: TypedPocketBase
			user?: UsersTable
		}

		interface PageData {
			loggedIn: boolean
			user?: UsersTable
		}
	}
}
