import { redirect } from '@sveltejs/kit'
import { LATEST_YEAR } from '$lib/vars'

export function load() {
	redirect(307, `/${LATEST_YEAR}/prizes`)
}
