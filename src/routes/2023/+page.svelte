<script lang="ts">
	import HeroGraphic from '$lib/years/2023/hero/HeroGraphic.svelte'
	import Sponsors from '$lib/years/2023/Sponsors.svelte'
	import Hero from '$lib/years/2023/hero/Hero.svelte'
	import About from '$lib/years/2023/About.svelte'
</script>

<div class="br-md" />

<section class="hero row">
	<Hero />
	<HeroGraphic />
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
