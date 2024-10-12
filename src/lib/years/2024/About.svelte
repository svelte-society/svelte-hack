<script>
	import Society from '$lib/graphics/Society.svelte'
	import Hat from '$lib/graphics/Hat.svelte'
</script>

<section>
	<div class="card-wrapper">
		<div class="svelte-society-logo">
			<div class="society"><Society /></div>
			<div class="hat"><Hat /></div>
		</div>

		{#if true}
			<div data-present class="card">
				<p>
					<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong> is
					excited to bring you
					<span class="sveltehack">
						<strong style:color="var(--brand-a)">SvelteHack</strong>
						<sup>runes-edition</sup>
					</span>
				</p>

				<p>
					On behalf of the Svelte team and community at large, we're inviting you to
					compete in this event and share your creations with the official release of
					Svelte 5.
				</p>

				<p>
					In turn, we're contributing thousands in cash
					<span><a href="/prizes">prizes</a></span>.
				</p>

				<p>
					Read our <a href="rules">rules</a> to learn more about how you can participate,
					and join our <a href="https://svelte.dev/chat">Discord channel</a> to stay tuned.
				</p>
			</div>
		{:else}
			<!-- todo: post-event blurb for later -->
			<div data-past class="card">
				<p>
					<strong style:color="var(--brand-a)">SvelteHack</strong> was brought to you on
					behalf of the Svelte team, by
					<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong>
					our generous sponsors, and the amazing Svelte Community. We had
					<strong>$15,000</strong>
					in prizes, over <strong>250</strong> submissions, and <strong>15</strong>
					amazing winners.
				</p>

				<p>
					SvelteHack ran from the START_DATE to the END_DATE, and the winners were
					announced at the
					<a href="https://www.youtube.com/watch?v=0bog8-Ay7CU"
						>Spring Svelte Summit. (UPDATE THIS URL)</a
					>
				</p>

				<p>
					<a class="button btn-a" href="/winners" style="width: fit-content;">
						View the SvelteHack winners
					</a>
				</p>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.card-wrapper {
		position: relative;
	}

	.card {
		padding-left: 4rem;
	}

	p {
		font-family: var(--font-a);
		// font-size: 1.25rem;
		font-variation-settings:
			'wght' 333,
			'wdth' 105;

		font-family: var(--font-mono);
	}

	.sveltehack {
		font-family: var(--font-mono);
		font-variation-settings:
			'wght' 500,
			'wdth' 105,
			'slnt' -10;
	}

	sup {
		color: color-mix(in hsl, var(--brand-a), var(--fg-a) 30%);
		font-style: italic;
		margin-left: -0.5rem;
	}

	.svelte-society-logo {
		position: absolute;
		left: -15%;
		top: 15%;
		width: 175px;
		height: 175px;
	}

	.society,
	.hat {
		position: absolute;
	}
	.society {
		z-index: 1;
	}
	.hat {
		z-index: 2;
	}

	@media only screen and (max-width: 1000px) {
		.card-wrapper {
			margin-bottom: 12rem;
		}

		.svelte-society-logo {
			bottom: -9.5rem;
			left: 0;
			right: 0;
			margin: auto auto 0 auto;
		}

		.card {
			padding: 1rem;
		}
	}
</style>
