<script>
	// import HeroGraphic from '$lib/graphics/HeroGraphic/HeroGraphic.svelte';
	import { Date, Sponsors, About, Hero } from '$lib/components'
	// import Threlte from '$lib/graphics/HeroGraphic/Threlte.svelte';
	import Scene from '$lib/graphics/HeroGraphic/Scene.svelte'
</script>

<div class="br-md" />

<section class="hero row">
	<Hero />

	<Scene />

	<!-- <HeroGraphic /> -->
</section>

<div class="br-xl" />

<!-- <Countdown /> -->

<!-- <Date /> -->

<!-- <div class="br-xl" /> -->

<span id="about" />
<About />

<div class="br-lg" />

<Sponsors />

<div class="br-lg" />
<div class="br-lg" />

<style>
	section.hero {
		display: unset;
	}

	@media screen and (min-width: 1000px) {
		section.hero {
			display: flex;
			align-items: center;

			width: 100%;
			max-width: min(95vw, var(--max-w));
		}
	}
</style>
