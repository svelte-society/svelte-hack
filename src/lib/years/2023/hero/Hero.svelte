<div class="hero">
	<h1>SvelteHack 2023</h1>
	<div class="br-sm"></div>
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

	@media screen and (max-width: 1000px) {
		.hero {
			max-width: unset;
			width: max-content;
			padding-left: 1rem;
		}
	}
</style>
