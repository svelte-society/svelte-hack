<script>
	import Gitpod from '$lib/graphics/sponsors/Gitpod.svelte'
	import Svelte from '$lib/graphics/sponsors/Svelte.svelte'
	import Vercel from '$lib/graphics/sponsors/Vercel.svelte'
</script>

<section>
	<h5 class="title">This hackathon is made possible by</h5>

	<div class="sponsors">
		<Vercel />
		<Gitpod />
		<Svelte />
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		padding: 32px;

		max-width: 800px;
		margin: 0 auto;

		.title {
			color: var(--dark-b);
			text-align: center;
		}

		.sponsors {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			justify-content: center;
			gap: 64px;
			
			padding: 22px;
		}
	}
</style>
