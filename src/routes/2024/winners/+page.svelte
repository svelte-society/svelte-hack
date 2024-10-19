<script lang="ts">
	import type { Winner } from './types'

	import YearSelector from '$lib/components/YearSelector.svelte'
	import W from '$lib/years/2024/runes/W.svelte'
	import R from '$lib/years/2024/runes/R.svelte'
	import M from '$lib/years/2024/runes/M.svelte'
	import { data } from '$lib/years/2024/data'
	import Category from './Category.svelte'
	import { page } from '$app/stores'

	interface Data {
		category: string
		winners: Winner[]
		rune: typeof W | typeof R | typeof M
	}

	const categories: Data[] = [
		{
			category: 'Wizzbangery Wizard',
			winners: [],
			rune: W,
		},
		{
			category: 'Rune Revolutionary',
			winners: [],
			rune: R,
		},
		{
			category: 'Migration Master',
			winners: [],
			rune: M,
		},
	]
</script>

<section>
	<YearSelector activeYear="2024" />

	<div class="br-md"></div>

	<h1 class="title">
		<strong class="sveltehack">SvelteHack <span class="year">2024</span></strong> Winners
	</h1>

	<div class="br-md"></div>

	{#if new Date() < new Date(data.date.end)}
		<p class="subtitle">Svelte Hack isn't over yet!</p>
		{#if !$page.data.hasSubmitted}
			<div class="br-sm"></div>
			<p><a class="btn-b" href="/login">Enter</a></p>
		{/if}
	{:else}
		<div class="winners">
			{#each categories as { category, winners, rune }}
				<div class="category-container">
					<Category {category} {winners} {rune} />
				</div>
			{/each}
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		max-width: min(var(--max-w), 95vw);
	}

	p:has(.btn-b) {
		text-align: center;
	}

	.btn-b {
		border-radius: var(--radius-sm);
		box-sizing: border-box;
		margin: 0 auto;
		display: inline-flex;
		text-decoration: none;
	}

	.title {
		font-size: var(--font-xxl);
		text-align: center;
	}

	.sveltehack {
		color: var(--theme-a);
		font-variation-settings:
			'wght' 500,
			'wdth' 105;
	}

	.year {
		font-variation-settings:
			'wght' 200,
			'wdth' 105;
	}

	.subtitle {
		text-align: center;
		font-size: var(--font-lg);
		color: var(--fg-b);
	}

	.winners {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 3rem;
	}

	.category-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
