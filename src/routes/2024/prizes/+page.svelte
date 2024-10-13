<script>
	import Categories from '$lib/years/2024/Prizes/Categories.svelte'
	import Awards from '$lib/years/2024/Prizes/Awards.svelte'
	import BlobA from '$lib/graphics/BlobA.svelte'
</script>

<section>
	<div class="br-sm"></div>

	<div class="prizes hidden m-visible">
		<h1>Prizes</h1>

		<Awards />

		<div class="br-lg"></div>
	</div>

	<div class="row titles">
		<h1>Categories</h1>
		<h1 class="m-hidden">Prizes</h1>
	</div>

	<div class="br-md"></div>

	<Categories />

	<div class="blob-a">
		<BlobA />
	</div>

	<div class="br-lg"></div>
</section>

<style>
	.row {
		width: 1100px;
		max-width: 95vw;
		margin: 0 auto;
		justify-content: space-around;
	}

	h1 {
		font-size: var(--font-xxl);
		text-align: center;
	}

	.blob-a {
		position: absolute;
		bottom: -30%;
		left: 0;

		z-index: -1;
	}

	section {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-grow: 1;

		margin: 0 auto;
		min-width: 100vw;
		padding-bottom: 5rem;

		overflow: hidden;
	}

	.hidden {
		display: none;
	}
	@media screen and (width < 1000px) {
		.m-visible {
			display: block;
		}

		.m-hidden {
			display: none;
		}
	}
</style>
