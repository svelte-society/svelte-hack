<script>
	import Stackblitz from '$lib/graphics/sponsors/Stackblitz.svelte'
	import Svelte from '$lib/graphics/sponsors/Svelte.svelte'
	import Vercel from '$lib/graphics/sponsors/Vercel.svelte'
</script>

<section>
	<h5 class="title">Sponsored by</h5>
	<div class="br-sm"></div>

	<div class="sponsors" style="--size: 175px">
		<Vercel />
		<Stackblitz />
		<Svelte />
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;

		max-width: 800px;
		margin: 0 auto;

		.title {
			color: var(--fg-b);
			text-align: center;
			margin-bottom: 1rem;
			@media screen and (max-width: 724px) {
				margin-bottom: 2rem;
			}
		}

		.sponsors {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			justify-content: center;
			column-gap: 100px;
			row-gap: 50px;
		}
	}
</style>
