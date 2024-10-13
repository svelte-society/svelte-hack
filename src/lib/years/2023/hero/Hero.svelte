<script>
	import TripleChevron from '$lib/graphics/TripleChevron.svelte'
</script>

<div class="hero">
	<h1>SvelteHack 2023</h1>
	<div class="br-sm" />
</div>

<style>
	.hero {
		max-width: 50%;
	}

	h1 {
		text-align: left;

		margin: 0;
		padding: 0 0 0 1rem;

		border-left: 3px solid var(--theme-a);

		font-size: min(6rem, 15vw);
	}

	p {
		text-align: left;

		margin: 0;
		color: var(--fg-d);

		font-size: 1.5rem;
	}

	.btn-c {
		margin-left: 1rem;
	}

	a {
		all: unset;
		display: flex;
	}
	a:hover {
		text-decoration: none;
	}

	@media screen and (max-width: 1000px) {
		button {
			padding: 0.5rem 0.75rem;
		}
		.btn-c {
			margin-left: 0.25rem;
		}
		.hero {
			max-width: unset;
			width: max-content;
			padding-left: 1rem;
		}
	}
</style>
