<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { fade } from 'svelte/transition';
</script>

<div
	class="confetti"
	out:fade|local
	use:confetti={{
		colors: ['var(--brand-a)', 'var(--bg-c)', 'var(--fg-c)'],
		destroyAfterDone: true,
		duration: 5000,
		stageHeight: window?.innerHeight,
		particleSize: 5,
		particleShape: 'mix',
		particleCount: 200,
		force: 0.5
	}}
/>

<style>
	.confetti {
		position: fixed;
		top: 25%;
		left: 50%;
		transform: translateY(-50%);
	}
</style>
