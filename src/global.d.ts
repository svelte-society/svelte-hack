import type { UsersTable } from '$lib/types/pocketbase'

declare global {
	namespace App {
		interface Locals {
			theme: 'dark' | 'light' | 'system'
			pb: import('pocketbase').default
			user?: UsersTable
		}

		interface PageData {
			loggedIn: boolean
			user?: UsersTable
		}
	}
}
