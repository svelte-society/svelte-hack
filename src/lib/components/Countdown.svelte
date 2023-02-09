<script>
	import { intervalToDuration, formatDuration } from 'date-fns'
	import { onMount } from 'svelte'

	const HACKATHON_DATE = new Date(2023, 3, 24, 10, 11, 12)

	let now = Date.now()

	$: duration = formatDuration(
		intervalToDuration({
			start: HACKATHON_DATE,
			end: now
		}),
		{ zero: true, format: ['months', 'weeks', 'days', 'hours', 'minutes'] }
	)

	onMount(() => {
		const interval = setInterval(() => {
			now = Date.now()
		}, 5000)
		return () => clearInterval(interval)
	})
</script>

<div class="clock">
	<p class="clockDisplay colorful">
		{#key now}
			{#each duration.split(' ') ?? [duration] as _, i}
				<span class:word={i % 2 === 1}>{_ + ' '}</span>
			{/each}
		{/key}
	</p>
</div>

<style>
	.clock {
		margin: 0 auto;
		width: fit-content;
	}

	p {
		color: var(--fg-b);

		font-size: clamp(1.25rem, 2rem, 4vw);
		font-family: var(--font-b);

		letter-spacing: 0.25rem;
	}

	.word {
		font-size: var(--font-md);
	}
</style>
