<script lang="ts">
	import { intervalToDuration, formatDuration, isPast, format } from 'date-fns'
	import { data } from './data'

	let duration = $state<string | null>(remaining())

	function remaining() {
		if (isPast(data.date.end)) {
			return null
		}

		return formatDuration(
			intervalToDuration({
				start: Date.now(),
				end: data.date.end,
			}),
		)
	}

	$effect(() => {
		const interval = setInterval(() => {
			duration = remaining()
		}, 1000)

		return () => clearInterval(interval)
	})
</script>

{#if duration}
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
{:else}
	<p class="end">
		Svelte Hack 2024 has ended, the winners will be announced on
		{format(data.date.winnersAnnouncement, 'MMMM do')}
	</p>
{/if}

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

	.end {
		font-size: 1.5rem;
		margin: 0 auto;
		text-align: center;
	}
</style>
