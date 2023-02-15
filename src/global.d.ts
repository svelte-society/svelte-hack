/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		theme: 'dark' | 'light' | 'system';
		pb: import('pocketbase').default;
		user?: import('pocketbase').BaseAuthStore['model'];
	}

	interface PageData {
		loggedIn: boolean;
	}
}

/**
 * * Note:
 * * This file will break if you use import statements, instead do a import() call in your code. For Example:
 * *
 * * interface Stuff {
 * *     test: import('package').SomeProperty;
 * * }
 */
