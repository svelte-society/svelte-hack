<script>
	import TripleChevron from '$lib/graphics/TripleChevron.svelte'
	import RunesEdition from '$lib/graphics/RunesEdition.svelte'
</script>

<div class="hero">
	<h1>
		<span class="sveltehack">SvelteHack</span> <span class="year">2024</span>
		<div class="runes-edition"><RunesEdition /></div>
	</h1>

	<div class="br-sm"></div>

	<p class="a-svelte-hackathon">A Svelte Hackathon</p>
	<p class="em">(with not-so-svelte prizes)</p>

	<div class="br-sm"></div>

	<div class="row">
		<a class="button btn-c" href="https://svelte.dev" target="_blank" rel="noreferrer">
			<span>Learn more about</span>
			&nbsp;Svelte
			<span><TripleChevron /></span>
		</a>
	</div>
</div>

<style lang="scss">
	.hero {
		position: relative;

		max-width: 50%;

		z-index: 2;
	}

	h1 {
		text-align: left;

		margin: 0;
		padding: 0 0 0 1rem;

		border-left: 3px solid var(--theme-a);

		font-size: min(6rem, 15vw);

		.sveltehack {
			font-variation-settings:
				'wght' 800,
				'wdth' 90,
				'slnt' -10;
		}

		.year {
			font-variation-settings:
				'wght' 100,
				'wdth' 150,
				'slnt' -10;
		}
	}

	.runes-edition {
		contain: strict;
		position: relative;
		display: inline-flex;

		width: 200px;
		max-width: 33vw;
		height: 75px;

		transform: translateY(-10%);
	}

	p {
		display: inline-flex;
		text-align: left;

		margin: 0;
		color: var(--fg-c);
		font-variation-settings:
			'wght' 300,
			'wdth' 100;

		font-size: clamp(1.25rem, 1.25rem + 0.5vw, 1.5rem);

		transform: translateY(4px);
	}

	p.em {
		font-size: 1.15rem;
		color: var(--bg-e);
		font-style: oblique 20deg;
		font-variation-settings:
			'wght' 300,
			'wdth' 100;
	}

	.btn-c {
		position: relative;
		display: flex;

		background: none !important;

		font-size: var(--font-md);
		text-decoration: underline;
		text-underline-offset: 0.25rem;
		text-decoration-thickness: 0.5px;
		text-decoration-color: var(--bg-d);

		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			margin: auto 0;

			width: 1px;
			height: 80%;

			background-color: color-mix(in hsl, var(--theme-a), transparent 60%);

			transform: scaleX(1);
			transform-origin: center left;
			transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
		}
	}

	a:hover,
	a:active,
	a:focus {
		text-decoration-color: transparent;

		&::before {
			transform: scaleX(0);
		}

		span {
			color: var(--fg-a);

			:global(.triple-chevron) {
				--color: var(--fg-c) !important;

				:global(path) {
					animation-play-state: running !important;
				}
			}
		}
	}

	@media (width <= 1000px) {
		p {
			display: block;
		}
		.hero {
			max-width: 100%;
			width: max-content;
			padding-left: 1rem;
		}

		.runes-edition {
			transform: translateY(0%);
		}

		.btn-c {
			font-size: var(--font-sm);
			padding: 0.5rem 0.75rem;
			margin-left: 0.25rem;
		}
	}
</style>
