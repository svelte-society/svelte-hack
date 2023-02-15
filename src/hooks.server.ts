import type { Handle } from '@sveltejs/kit';
import Pocketbase from 'pocketbase';

function getTheme(cookie: any): 'dark' | 'light' | 'system' {
	return ['dark', 'light', 'system'].includes(cookie) ? cookie : 'dark';
}

export const handle: Handle = async ({ event, resolve }) => {
	// Set the page theme
	event.locals.theme = getTheme(event.cookies.get('theme'));

	const pb = new Pocketbase('https://hack-api.sveltesociety.dev/');
	event.locals.pb = pb;

	// Try and log the user in
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
