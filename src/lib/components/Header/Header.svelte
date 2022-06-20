<script lang="ts">
	import SvelteHackLogo from '$lib/graphics/SvelteHackLogo.svelte'
	import { mobile, ThemeToggle } from 'fractils'
	import { Nav } from './Nav'
</script>

<header>
	<div class="content">
		<nav>
			<a class="home" href="/">
				<SvelteHackLogo />
				<div class="sveltehack">SVELTEHACK</div>
			</a>

			<Nav />
		</nav>
		<button class="btn-b">Submit</button>
	</div>
	<div class="theme" class:mobile={$mobile}><ThemeToggle /></div>
</header>

<style>
	header {
		display: flex;
		width: 100vw;

		box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.07);
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: var(--max-w);
		height: 4.5rem;
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

		color: var(--dark-a);

		font-weight: 600;
		letter-spacing: 2px;
		text-decoration: none;
	}

	.sveltehack {
		margin-left: 3px;

		font-size: 1.2rem;
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
