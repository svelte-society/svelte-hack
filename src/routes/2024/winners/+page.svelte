<script lang="ts">
	import Category from './Category.svelte'
	import type { Winner } from './types'

	interface Data {
		category: string
		winners: Winner[]
	}

	const data: Data[] = [
		{
			category: '🧙 Best Wizzbangery',
			winners: [],
		},
		{
			category: '📚 Best Library',
			winners: [],
		},
		{
			category: '🔌 Best Ecosystem Integration',
			winners: [],
		},
	]
</script>

todo add year selector

<p style="margin: 0 auto;">
	Svelte Hack isn't over yet! There's still time
	<a href="http://localhost:5173/login">to enter</a>
</p>

<h1 class="title">Svelte Hack 2024 Winners</h1>

<div class="winners">
	{#each data as { category, winners }}
		<Category {category} {winners} />
	{/each}
</div>

<style lang="scss">
	.title {
		margin: 0px auto;
		margin-bottom: 48px;
		padding: 0px 16px;
	}

	.winners {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: stretch;
		gap: 64px 32px;

		padding: 16px;
		margin-bottom: 64px;
	}
</style>
