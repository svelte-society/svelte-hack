<script lang="ts">
	import { device } from '$lib/utils/device.svelte'
	import { onMount } from 'svelte'
	import { init } from './rune.svelte'

	const {
		home = false,
	}: {
		/**
		 * If true it will enable the positioning
		 * that is needed on the home page
		 */
		home?: boolean
	} = $props()

	let size = $derived(device.mobile ? 400 : 600)

	let destroy = () => void 0 as any
	let canvas: HTMLCanvasElement

	onMount(() => {
		init(canvas).then(res => {
			if (res) destroy = res.destroy
		})

		return () => destroy()
	})
</script>

<canvas
	bind:this={canvas}
	width={size}
	height={size * 1.2}
	class:home
	style:max-width="{size}px"
	style:max-height="{size * 1.2}px"
></canvas>

<style lang="scss">
	canvas {
		display: flex;
		margin: 0 auto;

		background-color: transparent;
		user-select: none;
		z-index: 1;

		&.home {
			@media screen and (width >= 1000px) {
				& {
					position: absolute;
					right: 5rem;
					top: -5rem;
				}
			}
		}
	}
</style>
