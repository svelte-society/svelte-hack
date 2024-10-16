<script lang="ts">
	import W from '../runes/W.svelte'
	import R from '../runes/R.svelte'
	import M from '../runes/M.svelte'
	// import Awards from './Awards.svelte'
	// import Rune1 from './Rune1.svelte'
</script>

<section class="categories col">
	<div class="container row">
		<div class="left col">
			<div class="title row">
				<!-- <div class="icon">🧙</div> -->
				<div class="icon" aria-hidden="true">
					<!-- <Rune1 /> -->
					<W />
				</div>
				<h2>Wizzbangery Wizard</h2>
			</div>

			<p class="description row">
				Entries will be judged based on their novelty, quality, and ability to inspire
				delight. May the coolest usage of Svelte win!
			</p>
		</div>
	</div>

	<div class="container row">
		<div class="left col">
			<div class="title row">
				<!-- <div class="icon">🗿</div> -->
				<div class="icon" aria-hidden="true">
					<R />
				</div>
				<h2>Rune Revolutionary</h2>
			</div>

			<p class="description row">
				With the release of
				<a href="https://kit.svelte.dev/docs/svelte/state" target="_blank">Svelte 5</a>,
				it's time to take full advantage of
				<a href="https://kit.svelte.dev/docs/svelte/state" target="_blank">runes</a>
				and the capabilities they unlock. This category is for npm and
				<a href="https://jsr.io" target="_blank">jsr</a> packages that push the envelope on the
				cutting-edge.
			</p>
		</div>
	</div>

	<div class="container row">
		<div class="left col">
			<div class="title row">
				<!-- <div class="icon">⏫</div> -->
				<div class="icon" aria-hidden="true">
					<M />
				</div>
				<h2>Migration Master</h2>
			</div>

			<p class="description row">
				Become a master of migration by upgrading the most Svelte 4 code to Svelte 5, paving
				the way for a new era of Svelte!
			</p>
		</div>
	</div>
</section>

<style lang="scss">
	.categories {
		gap: 3rem;
	}

	.container {
		justify-content: center;
		width: 100%;
	}

	:global(.container p) {
		padding: 0.5rem;
		color: var(--fg-a);
		font-variation-settings:
			'wght' 250,
			'wdth' 100;

		:global(a) {
			font-weight: 500;
			font-variation-settings:
				'wght' 400,
				'wdth' 100;
			color: var(--fg-a);
			margin-left: 2px;
		}

		:global(.code a) {
			margin-left: 0;
		}
	}

	:global(:root[theme='light'] .container p) {
		font-variation-settings:
			'wght' 350,
			'wdth' 100;
	}

	.description {
		display: flex;
		flex-direction: row;
		gap: 0;
		padding: 1rem;
		max-width: 40rem;

		box-shadow: none;
		background: color-mix(in hsl, var(--bg-a), var(--bg-b));
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--bg-b);
		border-radius: var(--radius);
	}

	.left {
		align-items: center;
		gap: 1rem;

		padding: 1rem;
	}

	.left .title {
		gap: 2rem;
	}

	.left .icon {
		font-size: 40px;
		width: 30px;

		// svg shadow
		:global(svg) {
			filter: drop-shadow(0 0 10px var(--theme-a));
		}
	}
</style>
