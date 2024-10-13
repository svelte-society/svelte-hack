<script lang="ts">
	import Awards from './Awards.svelte'

	const prizes = [
		{
			name: 'Wizzbangery Wizard',
			description: `Entries will be judged based on their novelty, quality, and ability to inspire delight. May the coolest usage of Svelte win!`,
			icon: '🧙',
		},
		{
			name: 'Rune Revolutionary',
			description: `With the release of <a href="https://kit.svelte.dev/docs/svelte/state" target="_blank"><code>Svelte 5</code></a>, it's time to take full advantage of <a href="https://kit.svelte.dev/docs/svelte/state" target="_blank"><code>runes</code></a> and the capabilities they unlock.  This category is for npm and <a href="https://jsr.io" target="_blank">jsr</a> packages that push the envelope on the cutting-edge.`,
			icon: '🗿',
		},
		{
			name: 'Migration Master',
			description:
				'Become a master of migration by upgrading the most Svelte 4 code to Svelte 5, paving the way for a new era of Svelte!',
			icon: '⏫',
		},
	] as const
</script>

<section class="col">
	{#each prizes as prize}
		<div class="container col">
			<div class="card">
				<div class="left col">
					<div class="title row">
						<div class="icon">{prize.icon}</div>
						<h2>{prize.name}</h2>
					</div>

					<p>{@html prize.description}</p>
				</div>

				<div class="m-hidden">
					<Awards />
				</div>
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	.col {
		gap: 3rem;
	}

	.container {
		justify-content: center;
		width: 100%;
		/* font-family: var(--font-a); */
	}

	:global(.container p) {
		padding: 0.5rem;
		color: var(--fg-a);
		font-variation-settings:
			'wght' 250,
			'wdth' 100;
	}

	:global(:root[theme='light'] .container p) {
		font-variation-settings:
			// 'wght' 500,
			'wght' 350,
			'wdth' 100;
	}

	.card {
		display: flex;
		flex-direction: row;
		padding: 0;
		outline: none;
		border: none;
		box-shadow: none;
	}

	.left {
		background: color-mix(in hsl, var(--bg-a), var(--bg-b));
		padding: 1rem;
		border-radius: var(--radius);
		box-shadow: var(--shadow-lg);
		outline: 1px solid var(--bg-b);
		padding-right: 1rem;
		gap: 1rem;
	}

	.left .title {
		gap: 1rem;
	}

	.left .icon {
		font-size: 40px;
	}

	@media screen and (width < 1000px) {
		.card {
			padding: 0;
		}
		.left {
			padding-right: 0;
			padding: var(--padding);
		}

		.m-hidden {
			display: none;
		}
	}

	:global(pre) {
		display: inline;
		background: var(--bg-b);
		font-family: var(--font-mono);
		font-weight: 700;
		font-variation-settings:
			'wght' 700,
			'wdth' 100;
	}
</style>
