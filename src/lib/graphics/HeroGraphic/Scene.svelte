<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { init } from './rune'

	let destroy: (() => any) | null = null
	let canvas: HTMLCanvasElement

	onMount(async () => {
		;({ destroy } = await init(canvas))
	})

	onDestroy(() => {
		destroy?.()
	})
</script>

<canvas width={400} height={500} bind:this={canvas} />

<style>
	canvas {
		display: flex;

		max-width: 400px;
		max-height: 500px;
		margin: 0 auto;

		background-color: #0b0e11;

		/* outline: 1px solid var(--brand-a); */
	}
</style>
