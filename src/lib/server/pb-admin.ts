import type { TypedPocketbase } from '$lib/types/pocketbase'
import Pocketbase from 'pocketbase'
import {
	POCKETBASE_ADMIN_EMAIL,
	POCKETBASE_ADMIN_PASSWORD,
	POCKETBASE_URL,
} from '$env/static/private'

let pbAdmin: TypedPocketbase | null = null

export async function dangerously_get_pb_admin() {
	pbAdmin ??= new Pocketbase(POCKETBASE_URL)

	if (!pbAdmin.authStore.isAdmin) {
		try {
			await pbAdmin.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD)
		} catch (error) {
			throw new Error('Error saving submission, please let us know', {
				cause: error,
			})
		}
	}

	return pbAdmin
}
