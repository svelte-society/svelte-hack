<svelte:options runes />

<script lang="ts">
	import Scene from '$lib/years/2024/HeroGraphic/Scene.svelte'

	$effect(() => {
		const interval = setInterval(() => location.reload(), 30000)

		return () => {
			clearInterval(interval)
		}
	})
</script>

<div class="note">
	<p>Damn... the submissions form is under maintenance! You'll have to come back later :(</p>

	<p>
		In the meantime, why don't you look at this pretty rune? We'll refresh the page
		automatically when we're back online!
	</p>

	<Scene />
</div>

<style lang="scss">
	.note {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		max-width: 650px;
		margin: 0 auto;
		padding: 1rem;

		display: flex;
		flex-direction: column;

		p {
			text-align: center;
			font-size: 1.5rem;
		}
	}
</style>
