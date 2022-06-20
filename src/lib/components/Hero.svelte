<script>
	import TripleChevron from '$lib/graphics/TripleChevron.svelte'
</script>

<div class="hero">
	<h1>A Svelte Hackathon</h1>

	<div class="br-sm" />

	<p>With not-so-svelte prizes.</p>

	<div class="br-sm" />

	<div class="row">
		<button class="btn-a">Learn More</button>

		<button class="btn-c">
			Learn more about Svelte &nbsp;<TripleChevron />
		</button>
	</div>
</div>

<style>
	h1 {
		text-align: left;

		margin: 0;
		padding: 0 0 0 1rem;

		border-left: 3px solid var(--brand-a);

		font-size: 6rem;
	}
	p {
		text-align: left;

		margin: 0;
		color: var(--dark-d);

		font-size: 1.5rem;
	}
</style>
