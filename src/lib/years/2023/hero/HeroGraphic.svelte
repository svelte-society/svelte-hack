<script>
	import FieldStatic from './FieldStatic.svelte'
	import Connected from './Connected.svelte'
	import Field from './Field.svelte'
</script>

<div class="hero-graphic">
	<div class="logo-lines">
		<Connected />
	</div>
	<div class="field">
		<Field --size="250px" />
	</div>
	<div class="field-static">
		<FieldStatic --size="210px" />
	</div>
</div>

<style lang="scss">
	.hero-graphic {
		position: relative;
		contain: none;

		width: 400px;
		max-width: min(50%, 100vw);
		height: 100%;
		margin: auto;

		@media screen and (max-width: 1000px) {
			transform: translate3d(0, 5rem, 0) scale(1.5);
			margin: auto;
			margin-bottom: 5rem;
		}

		backface-visibility: hidden;

		pointer-events: none;
	}

	.field {
		position: absolute;
		inset: 0;
		margin: auto;
		width: max-content;
		height: max-content;

		transform: scale(1.6);
	}

	.field-static {
		position: absolute;
		inset: 0;
		width: max-content;
		height: max-content;
		margin: auto;

		transform: scale(1.5);
	}

	@media screen and (max-width: 1000px) {
		* {
			max-width: 100%;
		}
		.hero-graphic {
			margin: 4rem auto 8rem auto;
		}
		.field {
			transform: scale(1.2);
		}
		.field-static {
			transform: scale(0.85);
		}
	}
</style>
