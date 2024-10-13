<script lang="ts">
	import SveltebotDWI from '$lib/graphics/SveltebotDWI.svelte'
</script>

<section>
	<h5 class="title">Sponsored by</h5>
	<div class="br-md"></div>

	<div class="sponsors" style="--size: 175px">
		<div class="row">
			<h1>You!</h1>

			<div class="svelte-bot">
				<SveltebotDWI />
			</div>
		</div>
		<div class="br-md"></div>
		<a href="https://opencollective.com/svelte"
			>https://<span class="oc">opencollective</span>.com/<span class="svelte">svelte</span
			></a
		>
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;

		max-width: 800px;
		margin: 0 auto;

		.title {
			margin-bottom: 1rem;

			color: var(--fg-b);

			text-align: center;
			font-size: var(--font-lg);
			font-variation-settings:
				'wght' 300,
				'wdth' 105;
		}

		.sponsors {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;

			width: fit-content;
			margin: 0 auto;

			.svelte-bot {
				width: 100px;
				height: 100px;
			}

			h1 {
				font-family: var(--font-a);
				font-size: 6rem;
				font-variation-settings:
					'wght' 900,
					'wdth' 120;
			}

			a {
				font-size: var(--font-md);
				color: var(--fg-d);
			}

			.oc {
				color: var(--fg-a);
			}

			.svelte {
				color: var(--theme-a);
			}
		}
	}
</style>
