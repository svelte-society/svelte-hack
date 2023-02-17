<script>
	import Prize from './Prize.svelte';

	const prizes = [
		{
			name: 'Best Wizzbangery',
			description: `Applications will be judged based on their quality, accessibility, utility, and novelty.  May the coolest app win!`,
			award: '$3,000',
			icon: '🏆'
		},
		{
			name: 'Best Library',
			description: `With the addition of <a href="https://kit.svelte.dev/docs/packaging" target="_blank"><pre>svelte-package</pre></a>, it's now easier than ever to publish NPM packages with svelte.  This category is for packages that support and enrich the fast-growing ecosystem of tools in the Svelte community.  Examples would be a UI or component Library, a useful wrapper for a third-party library, or a tool for use in Svelte projects.`,
			award: '$3,000',
			icon: '📚'
		},
		{
			name: 'Best Ecosystem Integration',
			description: `The "Best Ecosystem Integration" category recognizes submissions that seamlessly integrate Svelte with other web technologies. The web is a vast ecosystem of ideas and initiatives, and the whole is greater than the sum of it's parts!`,
			award: '$3,000',
			icon: '🔌'
		},
		{
			name: 'Second Place',
			description: `Second place winners in all 3 categories will each be awarded $1,000.`,
			award: '$1,000',
			icon: '🥈',
			glow: true
		},
		{
			name: 'Third / Fourth / Fifth Place',
			description: `The next 3 winners for <em>each</em> category will be awarded 1 <strong><a href="https://vercel.com/pricing">Vercel Pro</a></strong> account and 1 <strong><a href="https://stackblitz.com/membership">Stackblitz Astronaut</a></strong> account courtesy of our sponsors.`,
			award: 'sponsors',
			icon: '',
			glow: true
		}
	];
</script>

<section class="col">
	{#each prizes as prize}
		<Prize {prize} />
	{/each}
</section>

<style>
	.col {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
