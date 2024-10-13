<script lang="ts">
	import HeroGraphic from '$lib/years/2023/hero/HeroGraphic.svelte'
	import Sponsors from '$lib/years/2023/Sponsors.svelte'
	import Hero from '$lib/years/2023/hero/Hero.svelte'
	import About from '$lib/years/2023/About.svelte'
</script>

<div class="br-md"></div>

<section class="hero row">
	<Hero />
	<HeroGraphic />
</section>

<div class="br-xl"></div>

<!-- <Countdown /> -->
<!-- <Date /> -->

<!-- <div class="br-xl" ></div> -->

<span id="about"></span>
<About />

<div class="br-lg"></div>

<Sponsors />

<div class="br-lg"></div>
<div class="br-lg"></div>

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
