<script lang="ts">
	import type { Winner } from './types'

	import YearSelector from '$lib/components/YearSelector.svelte'
	import W from '$lib/years/2024/runes/W.svelte'
	import R from '$lib/years/2024/runes/R.svelte'
	import M from '$lib/years/2024/runes/M.svelte'
	import { data } from '$lib/years/2024/data'
	import Category from './Category.svelte'
	import { page } from '$app/stores'
	import { format } from 'date-fns'

	interface Data {
		category: string
		winners: Winner[]
		rune: typeof W | typeof R | typeof M
	}

	const categories: Data[] = [
		{
			category: 'Wizzbangery Wizard',
			winners: [
				{
					title: 'Kunkun',
					description:
						'Kunkun is a cross-platform extensible app launcher like Raycast or Alfred. All extensions run in a sandboxed environment by default to ensure security.',
					github: 'https://github.com/kunkunsh/kunkun',
					website: 'https://kunkun.sh',
					place: 1,
				},
				{
					title: 'Infinite Turtles',
					description: 'A card game made with Threlte.',
					github: 'https://github.com/edsunman/infinite-turtles',
					website: 'https://infinite-turtles.pages.dev/',
					place: 2,
				},
				{
					title: 'Svudoku',
					description:
						'Svudoku is a modern-looking Sudoku application that lets you enjoy solving both Classic and Killer Sudoku puzzles.',
					github: 'https://github.com/fodor-lori/svudoku',
					website: 'https://svudoku.vercel.app',
					place: 3,
				},
				{
					title: 'Svelte Space',
					description:
						'A TowerDefence clicker game made with Svelte 5, without canvas. Playable on different screens, Mobile or Desktop.',
					github: 'https://github.com/baterson/svelte-tower-defence',
					website: 'https://svelte-tower-defence.vercel.app/',
					place: 4,
				},
				{
					title: 'Haunted House',
					description:
						'Old-school arcade game where you explore a haunted mansion full of ghosts. Control plasma bullets, use your wits and clear the whole house! Created only with Svelte 5.',
					github: 'https://github.com/martaProsniak/haunted-house',
					website: 'https://hauntedhousegame.netlify.app',
					place: 5,
				},
			],
			rune: W,
		},
		{
			category: 'Rune Ritualist',
			winners: [
				{
					title: 'SyncroState',
					description:
						"SyncroState brings Svelte 5 reactivity DX to the multiplayer level. Built on top of Yjs, it's a typesafe, efficient and dead simple way to manage multiplayer state. It is just like a normal $state but synchronised in realtime.",
					github: 'https://github.com/beynar/syncrostate',
					website: 'https://syncrostate.pages.dev',
					place: 1,
				},
				{
					title: 'Twoslash Svelte',
					description:
						'Twoslash Svelte is an extension of `twoslashes/twoslash` which supports Svelte. This will be beneficial for adding type hints to code blocks on any documentation website targeting Svelte.',
					github: 'https://github.com/twoslashes/twoslash/pull/57',
					website: 'https://deploy-preview-57--twoslash.netlify.app/packages/svelte',
					place: 2,
				},
				{
					title: 'svisx',
					description:
						"A port of Airbnb's visx to Svelte, bringing the power of D3 visualizations to the Svelte ecosystem.",
					github: 'https://github.com/xGEMINIx/svisx',
					website: 'https://svisx.pages.dev',
					place: 3,
				},
				{
					title: 'Svelte Value Inspect',
					description:
						'Svelte Value Inspect is a "json tree"-like inspector inspired by the likes of react-json-view, and svelte-json-tree.',
					github: 'https://github.com/ampled/svelte-inspect-value',
					website: 'https://svelte-inspect-value.vercel.app',
					place: 4,
				},
				{
					title: 'Flexiboards',
					description: 'Headless, reactive drag and drop components for Svelte 5.',
					github: 'https://github.com/Blakintosh/svelte-flexiboards',
					website: 'https://svelte-flexiboards.vercel.app',
					place: 5,
				},
			],
			rune: R,
		},
		{
			category: 'Migration Magician',
			winners: [
				{
					title: 'Svelte MapLibre GL',
					description:
						'Build interactive web maps effortlessly with MapLibre GL JS and Svelte 5.',
					github: 'https://github.com/MIERUNE/svelte-maplibre-gl',
					website: 'https://svelte-maplibre-gl.mierune.dev',
					place: 1,
				},
				{
					title: 'svelte-ux',
					description:
						'Collection of Svelte components, actions, stores, and utilities to build highly interactive applications.',
					github: 'https://github.com/techniq/svelte-ux/pull/530',
					website: 'https://svelte-ux.techniq.dev',
					place: 2,
				},
				{
					title: 'rokkit',
					description:
						'Rokkit is a data-driven, configurable, and themeable UI library built for use with Svelte. Rokkit controls are designed to be easily themeable, so you can match the look and feel of your project with minimal effort.',
					github: 'https://github.com/jerrythomas/rokkit/tree/develop',
					website: 'https://rokkit.vercel.app',
					place: 3,
				},
				{
					title: 'Svelte MiniApps',
					description:
						'Boost your productivity with Svelte MiniApps - a collection of user-friendly tools rebuilt with Svelte 5 for enhanced speed and reliability!',
					github: 'https://github.com/Michael-Obele/Svelte-MiniApps',
					website: 'https://svelte-apps.me/',
					place: 4,
				},
				{
					title: 'Roguelighter Engine',
					description:
						'Roguelighter is a free, open-source, easy-to-use game engine for 2D game development.',
					github: 'https://github.com/roguelighterengine/roguelighter',
					website: 'https://roguelighter.vercel.app',
					place: 5,
				},
			],
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

	{#if new Date() < data.date.end}
		<p class="subtitle">SvelteHack isn't over yet!</p>
		{#if !$page.data.hasSubmitted}
			<div class="br-sm"></div>
			<p><a class="btn-b" href="/login">Enter</a></p>
		{/if}
	{:else if new Date() < data.date.winnersAnnouncement}
		<p class="subtitle">
			The 2024 winners will be announced on {format(data.date.winnersAnnouncement, 'MMMM do')}
		</p>
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

<div class="br-xl"></div>

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
