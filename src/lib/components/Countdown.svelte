<script>
	import { intervalToDuration, formatDuration } from 'date-fns';
	import { onMount } from 'svelte';

	const HACKATHON_DATE = new Date(2023, 4, 17, 0, 0, 0);

	let now = Date.now();

	$: duration = formatDuration(
		intervalToDuration({
			start: HACKATHON_DATE,
			end: now
		}),
		{ zero: true, format: ['weeks', 'days', 'hours', 'minutes'] }
	);

	onMount(() => {
		const interval = setInterval(() => {
			now = Date.now();
		}, 20000);

		return () => clearInterval(interval);
	});
</script>

<div class="countdown">
	{#key now}
		{#each duration.split(' ') ?? [duration] as text, i}
			<div class="text">
				<div class:isWord={i % 2 === 1}>
					{text + ' '}
					{i === duration.split(' ').length - 1 ? '' : ''}
				</div>
			</div>
		{/each}
	{/key}
</div>

<style>
	.countdown {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;

		/* width: fit-content; */
		max-width: 90vw;
		margin: 0 auto;

		color: var(--fg-b);

		font-size: clamp(1.25rem, 2rem, 4vw);
		font-family: var(--font-b);

		letter-spacing: 0.2rem;
		word-wrap: break-word;
		white-space: pre-wrap;

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
