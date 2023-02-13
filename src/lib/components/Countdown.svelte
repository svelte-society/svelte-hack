<script>
	import { intervalToDuration, formatDuration } from 'date-fns';
	import { onMount } from 'svelte';

	const HACKATHON_DATE = new Date(2023, 3, 24, 10, 11, 12);

	let now = Date.now();

	$: duration = formatDuration(
		intervalToDuration({
			start: HACKATHON_DATE,
			end: now
		}),
		{ zero: true, format: ['months', 'weeks', 'days', 'hours', 'minutes'] }
	);

	onMount(() => {
		const interval = setInterval(() => {
			now = Date.now();
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="countdown colorful">
	{#key now}
		{#each duration.split(' ') ?? [duration] as text, i}
			<div class="text">
				<div class:isWord={i % 2 === 1}>
					{text + ' '}
				</div>
			</div>
		{/each}
	{/key}
</div>

<style>
	.countdown {
		margin: 0 auto;
		width: fit-content;
		gap: 1rem;

		display: flex;
		color: var(--fg-b);

		font-size: clamp(1.25rem, 2rem, 4vw);
		font-family: var(--font-b);

		letter-spacing: 0.25rem;

		text-align: center;
		line-height: 2rem;
	}

	.text {
		position: relative;
		display: flex;
	}

	.isWord {
		font-size: var(--font-md);
	}
</style>
