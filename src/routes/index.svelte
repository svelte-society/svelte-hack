<script>
	import HeroGraphic from '$lib/graphics/HeroGraphic/HeroGraphic.svelte'
	import Sponsors from '$lib/components/Sponsors.svelte'
	import About from '$lib/components/About.svelte'
	import Hero from '$lib/components/Hero.svelte'
</script>

<div class="br-md" />

<section class="row">
	<Hero />
	<HeroGraphic />
</section>

<div class="br-xl" />

<Sponsors />

<div class="br-xl" />

<About />

<div class="br-lg" />

<div class="br-xl" />
<div class="br-xl" />
<div class="br-xl" />
<div class="br-xl" />

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 100%;
	}
</style>
