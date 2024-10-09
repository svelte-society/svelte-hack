<div class="triple-chevron">
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 22 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			class="a"
			d="M1 13.3047L7 7.30469L1 1.30469"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			class="b"
			d="M8 13.3047L14 7.30469L8 1.30469"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			class="c"
			d="M15 13.3047L21 7.30469L15 1.30469"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>

<style lang="scss">
	.triple-chevron {
		--color: #ff3e00;
		color: var(--color);
		width: var(--size, 20px);
		transform: translate(12px, 1px);
	}

	svg {
		overflow: visible;
	}

	path {
		animation-name: animate;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-play-state: paused;
	}

	.a {
		animation-delay: 0s;
	}
	.b {
		animation-delay: 0.05s;
	}
	.c {
		animation-delay: 0.1s;
	}

	@keyframes animate {
		0% {
			color: var(--color);
			transform: translateX(0);
		}
		10% {
			color: #ff3e00;
			transform: translateX(4px);
		}
		50% {
			color: var(--color);
			transform: translateX(0);
		}
	}
</style>
