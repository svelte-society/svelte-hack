<script lang="ts">
	import W from '../runes/W.svelte'
	import R from '../runes/R.svelte'
	import M from '../runes/M.svelte'
</script>

<section class="categories col">
	<div class="container row">
		<div class="left col">
			<div class="title row">
				<div class="icon" aria-hidden="true">
					<W />
				</div>
				<h2 id="wizzbangery-wizard">Wizzbangery Wizard</h2>
			</div>

			<div class="description row">
				The Wizards of Wizzbangery are masters of innovation, showcasing novel and
				impressive uses of Svelte. Entries will be judged based on their novelty, quality,
				and ability to inspire delight. May the coolest usage of Svelte win!
			</div>
		</div>
	</div>

	<div class="container row">
		<div class="left col">
			<div class="title row">
				<div class="icon" aria-hidden="true">
					<R />
				</div>
				<h2 style:margin-right="3.5rem" id="rune-ritualist">Rune Ritualist</h2>
			</div>

			<div class="description">
				With
				<a href="https://svelte.dev/blog/svelte-5-is-alive" target="_blank">the release of Svelte 5</a>, the
				Rune Ritualist can take full advantage of
				<a href="https://svelte.dev/docs/svelte/what-are-runes" target="_blank">runes</a>
				and the capabilities they unlock. This category is for npm and
				<a href="https://jsr.io" target="_blank">jsr</a> packages that push the envelope on the
				cutting-edge.
			</div>
		</div>
	</div>

	<div class="container row">
		<div class="left col">
			<div class="title row">
				<div class="icon" aria-hidden="true">
					<M />
				</div>
				<h2 id="migration-magician">Migration Magician</h2>
			</div>

			<div class="description">
				Migration Magicians are masters of transformation, showcasing impressive upgrades of
				existing Svelte 4 code to Svelte 5. This can mean migrating large codebases,
				creating pull requests for active projects, or demonstrating high-quality migrations
				of your own work. Show us how you're paving the way for the new era of Svelte!
			</div>
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

	.description a {
		color: var(--fg-a);
		font-weight: 500;
	}

	.description {
		padding: 1rem;
		max-width: 40rem;

		box-shadow: none;
		background: color-mix(in hsl, var(--bg-a), var(--bg-b));
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--bg-b);
		border-radius: var(--radius);

		font-size: var(--font);
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
		width: 30px;
		height: 40px;

		// rune svg glow
		:global(svg) {
			filter: drop-shadow(0 0 10px var(--theme-a));
		}
	}
</style>
