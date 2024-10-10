<script>
	import Scene from '$lib/years/2024/HeroGraphic/Scene.svelte'
	import Sponsors from '$lib/years/2024/Sponsors.svelte'
	import About from '$lib/years/2024/About.svelte'
	import Hero from '$lib/years/2024/Hero.svelte'
</script>

<div class="br-md"></div>

<section class="hero row">
	<Hero />
	<Scene />
</section>

<div class="br-xl"></div>

<!-- <Countdown /> -->

<!-- <Date /> -->

<span id="about"></span>
<About />

<div class="br-lg"></div>

<Sponsors />

<div class="br-lg"></div>
<div class="br-lg"></div>

<style>
	section.hero {
		display: unset;
		position: relative;
	}

	@media screen and (width >= 1000px) {
		section.hero {
			display: flex;
			align-items: center;

			width: 100%;
			max-width: min(95vw, var(--max-w));
		}

		.br-xl {
			height: 25rem;
		}
	}
</style>
