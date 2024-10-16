<script lang="ts">
	import YearSelector from '$lib/components/YearSelector.svelte'
	import Category from './Category.svelte'
	import type { Winner } from './types'

	interface Data {
		category: string
		winners: Winner[]
	}

	const data: Data[] = [
		{
			category: '🧙 Best Wizzbangery',
			winners: [
				{
					place: 1,
					title: 'Wolfensvelte',
					description:
						'A fully playable port of Wolfenstein 3D 100% rendered by Svelte. No WebGL, or canvas. Just the DOM, CSS, and TypeScript.',
					github: 'https://github.com/snuffyDev/Wolfensvelte-3D',
					website: 'https://wolfensvelte-3d.vercel.app/',
				},
				{
					place: 2,
					title: 'Threltemania',
					description:
						'Threltemania is a browser-based fast-paced racing game. Race on campaign tracks or create your own. Share your tracks with friends and let them beat your time.',
					github: 'https://github.com/grischaerbe/threlter',
					website: 'https://threltemania.xyz/',
				},
				{
					place: 3,
					title: 'Chad-Rpg',
					description:
						"Chad-Rpg is an interactive, AI-driven, tabletop style text-based role playing game where chatGPT shapes the story according to player's choices.",
					github: 'https://github.com/Solemensis/Chad-Rpg',
					website: 'https://chad-rpg.vercel.app/',
				},
				{
					place: 4,
					title: 'My Queue',
					description: 'A playlist of text content you want to listen to!',
					github: 'https://github.com/nick-barth/myqueue',
					website: 'https://www.myqueue.so/',
				},
				{
					place: 5,
					title: 'Jambox',
					description: 'A collaborative real-time P2P virtual music instrument.',
					github: 'https://github.com/arslanastral/jambox',
					website: 'https://jambox.pages.dev/',
				},
			],
		},
		{
			category: '📚 Best Library',
			winners: [
				{
					place: 1,
					title: 'Superforms',
					description:
						'Superforms is a SvelteKit library that helps you with server-side validation and client-side display of forms.',
					github: 'https://github.com/ciscoheat/sveltekit-superforms',
					website: 'https://superforms.vercel.app/',
				},
				{
					place: 2,
					title: 'Svelte Zdog',
					description: 'Svelte components for zdog 3D renders',
					github: 'https://github.com/wh0am1-dev/svelte-zdog',
					website: 'https://carlos-aguilar.com/svelte-zdog/',
				},
				{
					place: 3,
					title: 'Radix Svelte',
					description: 'A port of the popular React library, Radix UI.',
					github: 'https://github.com/TGlide/radix-svelte',
					website: 'https://www.radix-svelte.com/',
				},
				{
					place: 4,
					title: 'Svelte Maplibre',
					description: 'Svelte support for the Maplibre GL mapping library.',
					github: 'https://github.com/dimfeld/svelte-maplibre',
					website: 'https://svelte-maplibre.vercel.app/',
				},
				{
					place: 5,
					title: 'Talk2Svelte',
					description: 'Talk2Svelte is a library providing voice recognition for Svelte.',
					github: 'https://github.com/ebrehault/talk2svelte',
					website: 'https://talk2svelte.vercel.app/',
				},
			],
		},
		{
			category: '🔌 Best Ecosystem Integration',
			winners: [
				{
					place: 1,
					title: 'Svelte Lab',
					description:
						'A REPL for SvelteKit projects: quickly spin up a Sveltekit project and share it with the world',
					github: 'https://github.com/SvelteLab/SvelteLab/',
					website: 'https://www.sveltelab.dev/',
				},
				{
					place: 2,
					title: 'Editable Website',
					description: 'A SvelteKit template for building CMS-free editable websites',
					github: 'https://github.com/michael/editable-website',
					website: 'https://editable.website/',
				},
				{
					place: 3,
					title: 'Sveltris',
					description: 'Piece together any framework with Svelte like Tetris',
					github: 'https://github.com/mokshit06/sveltris',
					website: 'https://sveltris.vercel.app/',
				},
				{
					place: 4,
					title: 'LiveSvelte',
					description:
						'Svelte inside Phoenix LiveView with seamless end-to-end reactivity',
					github: 'https://github.com/woutdp/live_svelte',
					website: 'https://hexdocs.pm/live_svelte',
				},
				{
					place: 5,
					title: 'Django x Svelte',
					description: 'Bring the power of Svelte to your Django projects.',
					github: 'https://github.com/emmyarty/dxsvelte',
					website: 'https://dxsvelte.com/',
				},
			],
		},
	]
</script>

<div class="selector">
	<YearSelector activeYear="2023" />
</div>

<h1 class="title">Svelte Hack 2023 Winners</h1>

<div class="winners">
	{#each data as { category, winners }}
		<Category {category} {winners} />
	{/each}
</div>

<style lang="scss">
	.selector {
		margin-left: 2rem;
	}

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
