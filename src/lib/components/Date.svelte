<div class="date">
	<div class="tag start">
		<span>&lt;</span>february 17<span>&gt;</span>
	</div>

	<div class="middle">SvelteHack</div>

	<div class="tag end">
		<span>&lt;&#47;</span>april 17<span>&gt;</span>
	</div>
</div>

<style>
	.date {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2rem;

		max-width: 90vw;
		margin: 0 auto;
		min-height: 175px;

		color: var(--fg-b);

		font-size: clamp(1.25rem, 2rem, 4vw);
		font-family: var(--font-mono);

		letter-spacing: 0.2rem;
		word-wrap: break-word;
		white-space: pre-wrap;

		text-align: center;
		line-height: 2rem;
	}

	.date div {
		position: relative;
		display: flex;
	}

	:global(.tag span) {
		color: var(--bg-d);
		margin: 0 0.25rem;
	}

	.start {
		opacity: 0;
		transform: translateY(-1rem);
		animation: fly-down 1s cubic-bezier(0.22, 1, 0.36, 1) 250ms forwards;
	}

	.middle {
		padding-left: 3rem;

		color: var(--brand-a);
		opacity: 0;

		font-size: var(--font-lg);

		transform: translateX(1rem);
		animation: fly-over 1s cubic-bezier(0.22, 1, 0.36, 1) 350ms forwards;
	}

	.end {
		opacity: 0;
		transform: translateY(1rem);
		animation: fly-up 1s cubic-bezier(0.22, 1, 0.36, 1) 450ms forwards;
	}

	@keyframes fly-down {
		0% {
			opacity: 0;
			transform: translateY(-1rem);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fly-over {
		0% {
			opacity: 0;
			transform: translateX(1rem);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fly-up {
		0% {
			opacity: 0;
			transform: translateY(1rem);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
