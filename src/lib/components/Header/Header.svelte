<script>
	import SvelteHackLogo from '$lib/graphics/SvelteHackLogo.svelte';
	import { mobile, scrollY, ThemeToggle } from 'fractils';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { Nav } from './Nav';
</script>

<header class:top={$scrollY === 0}>
	<div class="content">
		<nav>
			<a class="home" href="/">
				<SvelteHackLogo />
				<div class="sveltehack">SVELTEHACK</div>
			</a>

			<Nav />
		</nav>

		<div class="row">
			{#if $page.data.loggedIn}
				<a class="logout" href="/logout">Logout</a>
			{/if}

			{#if $page.url.pathname != '/submit'}
				<a
					class="btn-b login"
					transition:fade|local
					href={$page.data.loggedIn ? '/submit' : '/login'}
				>
					{$page.data.loggedIn ? 'Submit' : 'Login'}
				</a>
			{/if}
		</div>
	</div>

	<div class="theme" class:mobile={$mobile}><ThemeToggle /></div>
</header>

<style>
	header {
		position: fixed;
		display: flex;
		top: 0;

		max-width: 100vw;
		width: 100%;
		height: 4.5rem;
		padding-left: 1rem;
		padding-right: 5.5rem;

		backdrop-filter: blur(20px);
		background: rgba(var(--bg-a-rgb), 0.75);
		box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.07);

		transition: box-shadow 0.2s ease-in-out;

		z-index: 40;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	header.top {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: var(--max-w);
		margin: 0 auto;

		z-index: 50;
	}

	nav {
		display: flex;
	}

	.home {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;

		margin-right: 2.5rem;

		color: var(--fg-a);

		font-weight: 600;
		letter-spacing: 2px;
		text-decoration: none;
	}

	.logout {
		display: flex;
		align-items: center;

		height: 100%;

		color: var(--fg-d);

		font-size: 1.2rem;
		font-weight: 400;
		text-decoration: none;
		letter-spacing: 10%;

		transition: color 0.15s linear;
	}

	.logout:hover {
		color: var(--brand-a);

		text-decoration: none;
	}

	@media only screen and (max-width: 1000px) {
		.home {
			margin-right: 1rem;
		}
	}

	.sveltehack {
		margin-left: 3px;

		font-size: 1.2rem;
	}

	.login {
		text-decoration: none;
		border-radius: var(--radius);
	}

	.theme {
		position: absolute;

		right: 1.5rem;
		top: 1.25rem;

		font-size: 1.25rem;

		filter: saturate(0);

		z-index: 30;
	}

	.theme.mobile {
		display: none;
	}
</style>
