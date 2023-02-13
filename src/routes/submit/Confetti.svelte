<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
</script>

{#await new Promise((resolve) => setTimeout(resolve, 200)) then _}
	<div
		class="success"
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
{/await}
