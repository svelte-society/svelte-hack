<script>
	import HeroGraphic from '$lib/graphics/HeroGraphic/HeroGraphic.svelte'
	import Sponsors from '$lib/components/Sponsors.svelte'
	import Hero from '$lib/components/Hero.svelte'
</script>

<div class="br-lg" />

<section class="row">
	<Hero />
	<HeroGraphic />
</section>

<div class="br-lg" />

<Sponsors />

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 100%;
	}
</style>
