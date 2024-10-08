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
		<!-- <div class="card">
			<p>
				<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong>
				is excited to bring you
				<strong style:color="var(--brand-a)">SvelteHack</strong>
				on behalf of the Svelte team, our generous sponsors, and the svelte community at large!
				We're inviting you to compete in this event and share your creations with the community.
				<br />
				<br />
				In turn, we're contributing thousands in cash
				<span>
					<a href="/prizes">prizes</a>
					,
				</span>
				and special rewards from our sponsors.
				<br />
				<br />
				Read our
				<a href="rules">rules</a>
				to learn more about how you can participate, and join our
				<a href="https://svelte.dev/chat">Discord channel</a>
				to stay tuned.
			</p>
		</div> -->

		<div class="card">
			<p>
				<strong style:color="var(--brand-a)">SvelteHack</strong>
				was brought to you on behalf of the Svelte team, by
				<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong>
				our generous sponsors, and the amazing Svelte Community. We had
				<strong>$12,000</strong>
				in prizes, over
				<strong>250</strong>
				submissions, and
				<strong>15</strong>
				amazing winners.
				<br />
				<br />
				SvelteHack runs from the 17th of October to the 17th of December 2024.
				<br />
				<br />
				<a class="button btn-a" href="/winners" style="width: fit-content;">
					View the SvelteHack winners
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
			bottom: -50%;
			left: 0;
			right: 0;
			margin: auto auto 0 auto;
		}

		p {
			padding: unset;
		}
	}
</style>
