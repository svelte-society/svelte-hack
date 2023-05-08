import type { Handle } from '@sveltejs/kit';

function getTheme(cookie: any): 'dark' | 'light' | 'system' {
	return ['dark', 'light', 'system'].includes(cookie) ? cookie : 'dark';
}

export const handle: Handle = async ({ event, resolve }) => {
	// Set the page theme
	event.locals.theme = getTheme(event.cookies.get('theme'));

	let page = '';
	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;
			if (done) return page.replace('%sveltehack.theme%', event.locals.theme);
		}
	});
};
