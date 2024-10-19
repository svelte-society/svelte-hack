<div class="date">
	<div class="tag start">
		<span>[</span> Oct 19
		<div class="span">...</div>
		Jan 10<span>&nbsp;]</span>
	</div>
</div>

<style>
	.date {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;

		max-width: 90vw;
		margin: 0 auto;
		min-height: 175px;

		color: var(--fg-b);

		font-size: var(--font-xl);
		font-family: var(--font-mono);
		font-variation-settings:
			'wght' 400,
			'wdth' 100;

		word-wrap: break-word;
		white-space: pre-wrap;

		text-align: center;
		line-height: 2rem;
	}

	.tag span {
		font-variation-settings: 'wght' 900;
	}

	.date div {
		position: relative;
		display: flex;
	}

	:global(.tag span) {
		color: var(--bg-d);
		margin: 0 0.25rem;

		&:first-of-type,
		&:last-of-type {
			color: var(--theme-a);
		}
	}

	.start {
		opacity: 0;
		transform: translateY(-1rem);
		animation: fly-down 1s cubic-bezier(0.22, 1, 0.36, 1) 250ms forwards;
	}

	.middle {
		padding-left: 3rem;

		color: var(--theme-a);
		opacity: 0;

		font-family: var(--font-b);
		font-size: var(--font-md);
		font-variation-settings:
			'wght' 550,
			'wdth' 110;

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
