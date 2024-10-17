import type { TypedPocketbase } from '$lib/types/pocketbase'
import type { Cookies } from '@sveltejs/kit'
import { parse } from 'cookie'
import { DEV } from 'esm-env'
import type { z } from 'zod'

export function syncAuthState(pb: TypedPocketbase, cookies: Cookies) {
	const data = parse(pb.authStore.exportToCookie())

	cookies.set('pb_auth', data.pb_auth, {
		expires: data.Expires ? new Date(data.Expires) : undefined,
		httpOnly: true,
		sameSite: 'lax',
		secure: !DEV,
		path: '/',
	})

	cookies.delete('login_state', { path: '/' })
}

export function clearAuthState(pb: TypedPocketbase, cookies: Cookies) {
	pb.authStore.clear()
	cookies.delete('pb_auth', { path: '/' })
	cookies.delete('login_state', { path: '/' })
}

export function formatPBErrors<T extends z.ZodObject<any>>(
	schema: T,
	errors?: Record<string, unknown>,
) {
	if (!errors) return 'Failed'

	const final: z.inferFlattenedErrors<T>['fieldErrors'] = {}
	const keys = Object.keys(schema.shape)

	function isPBError(item: any): item is { message: string } {
		return typeof item == 'object' && !Array.isArray(item) && item?.message
	}

	for (const [key, value] of Object.entries(errors)) {
		if (keys.includes(key)) {
			final[key as keyof typeof final] = [`${isPBError(value) ? value.message : value}`]
		}
	}

	return final
}
