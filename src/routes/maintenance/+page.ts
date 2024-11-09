import { MAINTENANCE } from '$lib/vars'
import { redirect } from '@sveltejs/kit'

export function load() {
	if (!MAINTENANCE) {
		throw redirect(307, '/2024')
	}
}
