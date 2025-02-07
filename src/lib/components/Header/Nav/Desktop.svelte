<script lang="ts">
	import { fly } from 'svelte/transition'
	import { page } from '$app/stores'

	interface Props {
		links: [string, string][]
	}

	let { links }: Props = $props()
</script>

<ul>
	{#each links as [path, title], i (title)}
		<li
			class="nav-item"
			class:active={$page.url.pathname === path}
			transition:fly={{ y: -10 - 5 * i }}
		>
			<a class="nav-link" href={path} data-sveltekit-preload-code>
				{title}
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		justify-content: flex-start;
		gap: 3rem;

		padding: 2rem;

		z-index: 1;
	}

	li {
		display: flex;
		justify-content: center;
		// width: 4.5rem;

		list-style: none;
		color: var(--fg-d);
	}

	a {
		display: flex;
		align-items: center;

		height: 100%;

		color: currentColor;
		text-decoration: none;
		font-variation-settings:
			'wght' 250,
			'wdth' 105;

		transition: color 0.15s linear;
	}

	a:hover {
		color: var(--theme-b);
		text-decoration: none;
	}

	.active {
		color: var(--theme-a);
		font-variation-settings:
			'wght' 500,
			'wdth' 108;
	}
</style>
