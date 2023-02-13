<script>
	import HeroGraphic from '$lib/graphics/HeroGraphic/HeroGraphic.svelte'
	import { Countdown, Sponsors, About, Hero } from '$lib/components'
</script>

<div class="br-md" />

<section class="hero row">
	<Hero />
	<HeroGraphic />
</section>

<div class="br-xl" />

<Countdown />

<div class="br-xl" />

<Sponsors />

<div class="br-xl" />

<About />

<div class="br-xl" />
<span id="about" />

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
