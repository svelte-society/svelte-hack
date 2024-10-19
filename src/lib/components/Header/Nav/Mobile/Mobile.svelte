<script lang="ts">
	import ThemeSwitch from '$lib/themer/ThemeSwitch.svelte'
	import { clickoutside } from '$lib/utils/clickoutside'
	import { device } from '$lib/utils/device.svelte'
	import { fly, fade } from 'svelte/transition'
	import PageFill from './PageFill.svelte'
	import Burger from './Burger.svelte'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	const links = getContext<[string, string]>('links')
	let { showMenu = $bindable() }: { showMenu: boolean } = $props()
</script>

<div
	class="burger"
	use:clickoutside={{ whitelist: ['.burger'] }}
	onoutclick={() => (showMenu = false)}
>
	<Burger bind:showMenu />

	<PageFill bind:showMenu />

	{#if showMenu}
		<div class="theme corner">
			<ThemeSwitch />
		</div>

		<nav class:showMenu class:mobile={device.mobile}>
			<ul>
				{#each links as [path, title], i (title)}
					<li
						class:active={$page.url.pathname === path}
						in:fly|global={{ y: -10 - 5 * i, delay: 100 + i * 100 }}
						out:fade={{ duration: 50 }}
					>
						<a
							href={path}
							class="nav-link"
							data-sveltekit-preload-code
							onclick={() => (showMenu = false)}
						>
							{title}
						</a>
					</li>
				{/each}

				<li
					class:active={$page.url.pathname === '/submit'}
					in:fly|global={{ y: -10 - 5 * links.length, delay: 100 + links.length * 100 }}
					out:fade={{ duration: 50 }}
				>
					<a
						class="nav-link"
						href={$page.data.user ? '/submit' : '/login'}
						onclick={() => (showMenu = false)}
					>
						{$page.data.user ? 'Submit' : 'Login'}
					</a>
				</li>

				{#if $page.data.user}
					<li
						in:fly|global={{
							y: -10 - 5 * links.length - 5,
							delay: 100 + links.length * 100,
						}}
						out:fade={{ duration: 50 }}
					>
						<a class="nav-link" href="/logout" onclick={() => (showMenu = false)}>
							Logout
						</a>
					</li>
				{/if}
			</ul>
		</nav>
	{/if}
</div>

<style lang="scss">
	nav {
		// display: flex;
		// justify-content: center;

		// padding: 2rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		position: fixed;
		// inset: 0;
		// top: 5rem;
		top: 5rem;
		left: 0;
		right: 0;
		gap: 3rem;

		margin: 0 auto;

		z-index: 25;
	}

	li {
		list-style: none;

		color: var(--fg-a);
	}

	a {
		display: flex;

		color: var(--fg-a);

		font-size: 2rem;
		text-transform: uppercase;
		text-decoration: none;

		z-index: 60;

		transition: color 0.15s linear;
	}

	a:hover {
		color: var(--theme-a);

		text-decoration: none;
	}

	.active {
		color: var(--theme-a);
	}

	.theme {
		position: fixed;
		top: 1.5rem;
		right: 5rem;
		z-index: 45;

		filter: saturate(0);
	}
</style>
