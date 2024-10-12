<script lang="ts">
	import SveltebotDWI from '$lib/graphics/SveltebotDWI.svelte'
</script>

<section>
	<h5 class="title">Sponsored by:</h5>
	<div class="br-sm"></div>

	<div class="sponsors" style="--size: 175px">
		<h1>You!</h1>
		<div class="svelte-bot">
			<SveltebotDWI />
		</div>
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
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

			width: fit-content;
			margin: 0 auto;

			.svelte-bot {
				position: absolute;

				width: 100px;
				height: 100px;
				top: 0;
				right: -100px;
				bottom: 0;
			}

			h1 {
				font-family: var(--font-a);
				font-size: 5rem;
				font-variation-settings:
					'wght' 900,
					'wdth' 120;
			}
		}
	}
</style>
