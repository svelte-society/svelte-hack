<script>
	import Hero from '$lib/components/Hero.svelte'
	import HeroGraphic from '$lib/graphics/HeroGraphic/HeroGraphic.svelte'
</script>

<div class="br-lg" />

<section class="row">
	<Hero />
	<HeroGraphic />
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		width: 100%;
	}
</style>
