<script lang="ts">
	import { intervalToDuration, formatDuration } from 'date-fns'
	import { onMount } from 'svelte'

	let duration = $state(remaining())

	function remaining() {
		return formatDuration(
			intervalToDuration({
				start: Date.now(),
				end: new Date('2025-01-10T23:59:59.999Z'),
			}),
			{ zero: true, format: ['days', 'hours', 'minutes', 'seconds'] },
		)
	}

	$effect(() => {
		const interval = setInterval(() => {
			duration = remaining()
		}, 1000)

		return () => clearInterval(interval)
	})
</script>

<div class="countdown">
	{#each duration.split(' ') as text, i}
		<div class="text">
			<div class:isWord={i % 2 === 1}>
				{text + '   '}
				<!-- {i === duration.split(' ').length - 1 ? '' : ''} -->
			</div>
		</div>
	{/each}
</div>

<style>
	.countdown {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem;

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
