<script lang="ts">
	import { clickOutside, mobile, ThemeToggle } from 'fractils'
	import { fly, fade } from 'svelte/transition'
	import PageFill from './PageFill.svelte'
	import Burger from './Burger.svelte'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	const links = getContext('links')
	export let showMenu = false
</script>

<template lang="pug">

		.burger(use:clickOutside!='{{ whitelist: ["wrapper"] }}' on:outclick!='{() => showMenu = false}')
			Burger(bind:showMenu)

		PageFill(bind:showMenu)

		+if('showMenu')

			#theme.corner
				ThemeToggle

			nav(
				class:showMenu
				class:mobile='{$mobile}'
			)

				ul

					+each('links as [path, title], i (title)')

						li(
							class:active='{$page.url.pathname === path}'
							in:fly='{{ y: -10 - (5 * i), delay: 100 + (i * 100) }}'
							out:fade='{{ duration: 50 }}'
						)

							a(
								sveltekit:prefetch
								href='{path}'
								class:disabled!='{title === "Winners"}'
							) {title}

</template>

<style>
	nav {
		display: flex;
		justify-content: center;

		padding: 2rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		inset: 0;
		top: 30vh;
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
		font-weight: 700;
		text-transform: uppercase;
		text-decoration: none;
		letter-spacing: 10%;

		z-index: 60;

		transition: color 0.15s linear;
	}

	.disabled {
		user-select: none;
		pointer-events: none;
		opacity: 0.25;
	}

	a:hover {
		color: var(--brand-a);

		text-decoration: none;
	}

	.active {
		color: var(--brand-a);
	}

	#theme {
		position: fixed;
		top: 1rem;
		right: 5rem;
		z-index: 45;

		filter: saturate(0);
	}
</style>
