<script>
	import Society from '$lib/graphics/Society.svelte'
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import Hat from '$lib/graphics/Hat.svelte'
	import { format } from 'date-fns'
	import { data } from './data'
</script>

<div class="section-wrapper">
	<section>
		<div class="above-text">
			<p>
				<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong> is excited
				to bring you
				<strong class="sveltehack">SvelteHack <span class="year">2024</span></strong>
				<!-- <sup class="runes-edition">runes-edition</sup> -->
			</p>
		</div>

		<div class="br-lg"></div>

		<div class="card-wrapper">
			<div class="svelte-society-logo">
				<div class="society"><Society /></div>
				<div class="hat"><Hat /></div>
			</div>

			{#if SUBMISSIONS_OPEN}
				<div data-present class="about card">
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
						Read our <a href="rules">rules</a> to learn more about how you can
						participate, and join our
						<a href="https://svelte.dev/chat">Discord channel</a> to stay tuned.
					</p>
				</div>
			{:else}
				<div data-past class="card">
					<p>
						<strong style:color="var(--theme-a)">SvelteHack</strong> was brought to you
						on behalf of the Svelte team, by
						<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong>,
						donations to the
						<a href="https://opencollective.com/svelte">Svelte Open Collective</a>, and
						the amazing Svelte Community. We had <strong>$14,250</strong> in prizes,
						over
						<strong>80</strong> submissions, at <strong>15</strong> amazing winners.
					</p>

					<p>
						SvelteHack ran from the {format(data.date.start, 'do MMMM yyyy')} to the
						{format(data.date.end, 'do MMMM yyyy')}, and the winners were announced on
						the {format(data.date.winnersAnnouncement, 'do MMMM yyyy')}.
					</p>

					<div class="br-xs"></div>
				</div>
			{/if}
		</div>
	</section>
</div>

<style lang="scss">
	strong a {
		color: var(--fg-a);
		font-weight: 400;
	}

	.section-wrapper {
		padding: 4rem 0;
		background: color-mix(in hsl, var(--bg-a), var(--bg-b) 50%);
		outline: 1px solid color-mix(in hsl, var(--theme-a), transparent 75%);
	}

	:global(:root[theme='dark']) {
		.section-wrapper {
			background: var(--bg-b);
		}
	}

	.above-text {
		position: relative;

		width: fit-content;
		margin: 0 auto;

		box-shadow: none;

		overflow: visible;

		p {
			max-width: 95vw;
			text-align: center;
			text-wrap: balance;
			font-size: var(--font-lg);
		}
	}

	.card-wrapper {
		position: relative;
	}

	.about {
		padding-left: 4rem;
	}

	p {
		font-variation-settings:
			'wght' 333,
			'wdth' 105;
	}

	.sveltehack {
		font-family: var(--font-b);
		color: var(--theme-a);
		font-variation-settings:
			'wght' 500,
			'wdth' 105;
	}

	.year {
		font-variation-settings:
			'wght' 200,
			'wdth' 105;
	}

	.svelte-society-logo {
		position: absolute;
		left: -18%;
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
