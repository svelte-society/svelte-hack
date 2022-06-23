<script lang="ts">
	import { fly } from 'svelte/transition'
	import { getContext } from 'svelte'
	import { page } from '$app/stores'

	const links: string[][] = getContext('links')
</script>

<ul>
	{#each links as [path, title], i (title)}
		<li class:active={$page.url.pathname === path} transition:fly={{ y: -10 - 5 * i }}>
			<a class:disabled={title === 'Winners'} sveltekit:prefetch href={path}>{title}</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		justify-content: flex-start;
		gap: 2rem;

		padding: 2rem;

		z-index: 1;
	}

	li {
		list-style: none;

		color: var(--dark-d);
	}

	a {
		display: flex;
		align-items: center;

		height: 100%;

		color: currentColor;

		font-size: 1.2rem;
		font-weight: 400;
		text-decoration: none;
		letter-spacing: 10%;

		transition: color 0.15s linear;
	}

	a:hover {
		color: var(--brand-a);

		text-decoration: none;
	}

	.active {
		color: var(--brand-a);
	}

	.disabled {
		user-select: none;
		pointer-events: none;
		opacity: 0.25;
	}
</style>
