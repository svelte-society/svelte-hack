<section>
	<h5 class="title">Sponsored by:</h5>
	<div class="br-sm" />

	<div class="sponsors" style="--size: 175px">
		<h1>You!</h1>
		<a href="https://opencollective.com/svelte">opencollective.com/svelte</a>
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
			flex-direction: column;
			align-items: center;
			justify-content: center;
			column-gap: 100px;
			row-gap: 50px;
		}
	}
</style>
