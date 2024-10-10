<script lang="ts">
	import { device } from '$lib/utils/device.svelte'
	import { init } from './rune'

	let size = $derived(device.mobile ? 400 : 600)

	let destroy = () => void 0 as any
	let canvas: HTMLCanvasElement

	$effect(() => {
		device.mobile

		init(canvas).then(res => {
			if (res) destroy = res.destroy
		})

		return destroy()
	})
</script>

<!-- <canvas width={400} height={500} bind:this={canvas}></canvas> -->
<canvas
	bind:this={canvas}
	width={size}
	height={size * 1.2}
	style:max-width="{size}px"
	style:max-height="{size * 1.2}px"
></canvas>

<style>
	canvas {
		display: flex;
		margin: 0 auto;

		background-color: #0b0e11;

		z-index: 1;
	}

	@media screen and (width >= 1000px) {
		canvas {
			position: absolute;
			right: 5rem;
			top: -5rem;
		}
	}
</style>
