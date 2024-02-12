<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { init } from './rune';

	let canvas: HTMLCanvasElement;
	let destroy = () => void 0;

	onMount(() => {
		init(canvas).then(({ destroy }) => {
			destroy = destroy;
		});
	});

	onDestroy(() => {
		destroy();
		globalThis.window?.location.reload();
	});
</script>

<canvas width={400} height={500} bind:this={canvas} />

<div id="controls" />

<style>
	canvas {
		display: flex;

		max-width: 400px;
		max-height: 500px;
		margin: 0 auto;

		background-color: #0b0e11;

		/* outline: 1px solid var(--brand-a); */
	}

	#controls {
		position: fixed;
		right: 0rem;
		top: 5rem;
	}
</style>
