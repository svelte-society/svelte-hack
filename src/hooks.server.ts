import type { Handle } from '@sveltejs/kit';
import Pocketbase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') as 'dark' | 'light' | 'system' | undefined;
	event.locals.theme = theme || 'dark';

	const pb = new Pocketbase('https://hack-api.sveltesociety.dev/');
	event.locals.pb = pb;

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	event.locals.user = pb.authStore.model;

	let page = '';
	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;
			if (done) return page.replace('%sveltehack.theme%', event.locals.theme);
		}
	});
};
