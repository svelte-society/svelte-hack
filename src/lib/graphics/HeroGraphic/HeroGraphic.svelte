<script>
	import FieldStatic from '$lib/graphics/HeroGraphic/FieldStatic.svelte'
	import { LineA, LineB, LineC } from '$lib/graphics/HeroGraphic/Lines'
	import Field from '$lib/graphics/HeroGraphic/Field.svelte'
	import Logo from '$lib/graphics/Logo.svelte'
</script>

<div class="hero-graphic">
	<div class="field">
		<Field --size="250px" />
	</div>
	<div class="field-static">
		<FieldStatic --size="210px" />
	</div>
	<div class="logo">
		<Logo --size="150px" />
	</div>
	<div class="linea">
		<LineA />
	</div>
	<div class="lineb">
		<LineB />
	</div>
	<div class="linec">
		<LineC />
	</div>
</div>

<style lang="scss">
	.hero-graphic {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		width: 400px;
		max-width: 50%;
		height: 400px;
		margin: auto;

		transform: translate3d(20%, 0, 0) scale(1.5);

		@media screen and (max-width: 1000px) {
			transform: translate3d(0, 0, 0) scale(1.25);
		}

		pointer-events: none;
	}
	.logo,
	.field {
		position: absolute;
		inset: 0;
		margin: auto;
		width: max-content;
		height: max-content;
	}
	.linea,
	.lineb,
	.linec {
		position: absolute;
	}
	.linea {
		--size: 150px;
		top: 25%;
		left: 0%;
		margin: auto;
	}
	.lineb {
		--size: 120px;
		bottom: 15%;
		left: 5%;
		margin: auto;
	}
	.linec {
		--size: 200px;
		top: 41.5%;
		right: -12%;
		margin: auto;
	}
	.field-static {
		position: absolute;
		inset: 0;
		width: max-content;
		height: max-content;
		margin: auto;
	}
</style>
