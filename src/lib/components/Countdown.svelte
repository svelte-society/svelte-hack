<script>
	import { intervalToDuration, formatDuration } from 'date-fns'
	import { onMount } from 'svelte'

	const HACKATHON_DATE = 1659326400000

	let now = Date.now()

	$: duration = intervalToDuration({
		start: HACKATHON_DATE,
		end: now
	})

	onMount(() => {
		const interval = setInterval(() => (now = Date.now()), 500)
		return () => clearInterval(interval)
	})
</script>

<div class="clock">
	<p class="clockDisplay">
		{formatDuration(duration)}
	</p>
</div>

<style>
	.clock {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	p {
		color: var(--dark-a);
		text-shadow: 2px 2px var(--brand-a), 4px 4px var(--brand-b);

		font-size: 3rem;
		font-family: var(--font-mono);
	}
</style>
