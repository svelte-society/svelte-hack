<script>
	import Categories from '$lib/years/2024/Prizes/Categories.svelte'
	// import ProllyDont from '$lib/years/2024/Prizes/ProllyDont.svelte'
	import Awards from '$lib/years/2024/Prizes/Awards.svelte'
	import BlobA from '$lib/graphics/BlobA.svelte'
</script>

<section>
	<div class="br-md"></div>

	<div class="col winners">
		<div class="header winners">
			<div class="number">15</div>
			<div class="text">prizes</div>
		</div>

		<!-- <div class="br-md"></div> -->

		<!-- <p><strong>3</strong> categories &nbsp;·&nbsp; <strong>5</strong> winners each</p> -->

		<!-- <ProllyDont /> -->
		<p>The top <strong>5</strong> submissions in each category will be awarded a cash prize</p>

		<div class="br-md"></div>

		<Awards />
	</div>

	<div class="br-lg"></div>

	<div class="prizes">
		<!-- <h1>Prizes</h1> -->

		<div class="header prizes">
			<div class="header categories">
				<div class="number">3</div>
				<div class="text">categories</div>
			</div>
		</div>
	</div>

	<!-- <div class="br-md"></div> -->

	<Categories />

	<div class="br-lg"></div>

	<div class="blob-a">
		<BlobA />
	</div>

	<div class="br-lg"></div>
</section>

<style lang="scss">
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

	.col.winners {
		gap: 0rem;
		// width: 1100px;
		width: fit-content;
		max-width: 95vw;
		margin: 0 auto;
		justify-content: space-around;

		p {
			max-width: 30rem;
			text-wrap: balance;
			text-align: center;
		}
	}

	.header {
		display: flex;
		align-items: center;
		// justify-content: flex-start;
		gap: 2rem;
		width: fit-content;
		margin: 0 auto;

		font-family: var(--font-b);

		// .number {
		// 	margin-left: auto;
		// }

		&.categories {
			.number {
				font-size: 10rem;
				font-weight: 750;
				font-variation-settings: 'wght' 750;
			}

			.text {
				font-size: 5rem;
				font-weight: 200;
				font-variation-settings: 'wght' 200;
			}
		}

		&.winners {
			.number {
				font-size: 10rem;
				font-weight: 750;
				font-variation-settings: 'wght' 750;
			}

			.text {
				font-size: 5rem;
				font-weight: 200;
				font-variation-settings: 'wght' 200;
			}
		}

		@media (width < 1000px) {
			// margin-left: 1rem;
			padding: 1rem;
			gap: 1rem;

			&.categories,
			&.winners {
				.number {
					font-size: clamp(7rem, 10vw, 10rem);
				}

				.text {
					font-size: clamp(3.5rem, 5vw, 10rem);
				}
			}
		}
	}

	// .prolly-dont {
	// 	width: 50rem;
	// 	max-width: 95vw;
	// 	margin: 0 auto;

	// 	:global(svg) {
	// 		// filter: hue-rotate(250deg) saturate(1) brightness(1) contrast(1.1);
	// 		transform: translate(-4rem, 0);
	// 	}

	// 	// .card {
	// 	p {
	// 		margin: 0 auto;
	// 		width: fit-content;
	// 		font-size: var(--font-md);
	// 		// padding: 1rem;
	// 		// border-radius: var(--radius-lg);
	// 		// box-shadow: var(--shadow-md);
	// 		// outline: 1px solid color-mix(in hsl, var(--bg-a), var(--bg-b));
	// 	}
	// }

	.blob-a {
		position: absolute;
		bottom: -30%;
		left: 0;

		z-index: -1;
	}
</style>
