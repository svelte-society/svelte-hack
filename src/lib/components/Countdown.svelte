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
	<p class="clockDisplay colorful">
		{formatDuration(duration, { zero: true, format: ['months', 'weeks', 'days', 'hours', 'minutes'] })}
	</p>
</div>

<style>
	.clock {
		margin: 0 auto;
	}

	p {
		color: var(--dark-b);

		font-size: clamp(1.25rem, 3rem, 4vw);
		font-family: var(--font-mono);
	}
</style>
