<script>
	import Society from '$lib/graphics/Society.svelte'
	import Hat from '$lib/graphics/Hat.svelte'
</script>

<section>
	<div class="card-wrapper">
		<div class="society">
			<Society />
		</div>

		<div class="hat">
			<Hat />
		</div>

		<div class="card">
			<p>
				<strong style:color="var(--theme-a)">SvelteHack</strong>
				was brought to you on behalf of the Svelte team, by
				<strong><a href="https://sveltesociety.dev">Svelte Society,</a></strong>
				our generous sponsors, and the amazing Svelte Community. We had
				<strong>$12,000</strong>
				in prizes, over
				<strong>250</strong>
				submissions, and
				<strong>15</strong>
				amazing winners.
				<br />
				<br />
				SvelteHack ran from the 17th of February 2023 to the 17th of April, and the winners were
				announced at the
				<a href="https://www.youtube.com/watch?v=0bog8-Ay7CU">Spring Svelte Summit.</a>
				<br />
				<br />
				<a class="button btn-a" href="/winners" style="width: fit-content;">
					View the SvelteHack 2023 winners
				</a>
			</p>
		</div>
	</div>
</section>

<style>
	.card-wrapper {
		position: relative;
	}

	.society,
	.hat {
		--size: 175px;
		position: absolute;
		left: -15%;
		top: 15%;

		z-index: 1;
	}

	p {
		padding-left: 2.5rem;
	}

	@media only screen and (max-width: 800px) {
		.card-wrapper {
			border-radius: none;
		}
	}

	@media only screen and (max-width: 1000px) {
		.card-wrapper {
			margin-bottom: 12rem;
		}

		.society,
		.hat {
			width: 175px;
			height: 175px;
			bottom: -55%;
			left: 0;
			right: 0;
			margin: auto auto 0 auto;
		}

		p {
			padding: unset;
		}
	}
</style>
