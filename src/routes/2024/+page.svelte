<script>
	import Scene from '$lib/years/2024/HeroGraphic/Scene.svelte'
	// import Countdown from '$lib/components/Countdown.svelte'
	import Sponsors from '$lib/years/2024/Sponsors.svelte'
	import About from '$lib/years/2024/About.svelte'
	import Hero from '$lib/years/2024/Hero.svelte'
	import Date from '$lib/years/2024/Date.svelte'
</script>

<div class="br-md"></div>

<section class="hero row">
	<Hero />
	<Scene home />
</section>

<div class="br-xxl"></div>

<!-- <Countdown /> -->
<Date />

<div class="br-sm"></div>

<span id="about"></span>
<About />

<div class="br-xl"></div>

<Sponsors />

<div class="br-xl"></div>
<div class="br-xl"></div>

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

		.br-xxl {
			height: 25rem;
		}
	}
</style>
