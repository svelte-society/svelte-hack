<div class="blob-a">
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 279 886"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			class="bg"
			d="
				M 111 283
				C -21 160 72 127 -44 0
				L -43 845
				C 71 780 295 657 277 538
				C 254 390 245 406 111 283
			"
			fill="var(--theme-a)"
		/>
		<path
			class="fg"
			d="
				M 109 324
				C -23 200 70 168 -46 41
				L -45 885
				C 68 820 292 698 275 579
				C 252 431 243 447 109 324
			"
			fill="var(--bg-b)"
		/>
	</svg>
</div>

<style lang="scss">
	.blob-a {
		width: var(--size, 279px);
	}

	.bg {
		transform: translate(0rem, 2rem);
	}

	:global(:root[theme='dark'] .blob-a) {
		filter: saturate(1.25) brightness(0.5) contrast(1.25);
	}
</style>
