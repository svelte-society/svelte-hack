<script>
	import TripleChevron from '$lib/graphics/TripleChevron.svelte'
</script>

<div class="hero">
	<h1>
		A Svelte <br />
		Hackathon
	</h1>

	<div class="br-sm" />

	<p>With not-so-svelte prizes.</p>

	<div class="br-sm" />

	<div class="row">
		<a href="#about">
			<button class="btn-a">Learn More</button>
		</a>

		<a href="https://svelte.dev" target="_blank" rel="noreferrer">
			<button class="btn-c">
				Learn more about Svelte&nbsp;<TripleChevron />
			</button>
		</a>
	</div>
</div>

<style>
	.hero {
		max-width: 50%;
	}

	h1 {
		text-align: left;

		margin: 0;
		padding: 0 0 0 1rem;

		border-left: 3px solid var(--brand-a);

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
			padding: 0.75rem 1rem;
		}
		.hero {
			max-width: unset;
			width: max-content;
			padding-left: 4vw;
		}
	}
</style>
