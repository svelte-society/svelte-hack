<div class="awards col">
	<ul class="col">
		<li class="first">
			<k>1<sup>st</sup></k> <v><span class="currency">$</span>3,000</v>
		</li>
		<li class="second">
			<k>2<sup>nd</sup></k> <v><span class="currency">$</span>1,000</v>
		</li>
		<li>
			<k>3<sup>rd</sup></k> <v><span class="currency">$</span>250</v>
		</li>
		<li>
			<k>4<sup>th</sup></k> <v><span class="currency">$</span>250</v>
		</li>
		<li>
			<k>5<sup>th</sup></k> <v><span class="currency">$</span>250</v>
		</li>
	</ul>
</div>

<style lang="scss">
	.awards {
		width: fit-content;
		margin: 0 auto;
		color: var(--fg-a);
		border-radius: var(--radius);
		outline: none;
	}

	.awards ul {
		gap: 0.5rem;
		position: relative;
	}

	.awards li {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		font-size: var(--font);
		white-space: nowrap;
		list-style: none;
	}

	.awards k {
		width: 1rem;
		font-weight: 200;
	}

	.awards k sup {
		margin-left: 2px;
		color: var(--fg-d);
		font-weight: 300;
	}

	.awards v {
		width: 8.5rem;
		padding: 0.25rem 0.5rem;
		font-family: var(--font-a);
		font-size: var(--font-xl);
		letter-spacing: 0.1rem;
		font-weight: 400;
	}

	.first v {
		background: linear-gradient(to bottom, var(--theme-a), var(--fg-a) 200%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.second v {
		background: linear-gradient(to bottom, var(--theme-a) -50%, var(--fg-a));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.awards v .currency {
		// color: var(--fg-c);
		font-weight: 200;
		font-size: 0.8em;
	}

	.awards ul::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, var(--theme-a), blue);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		z-index: -1;
	}

	$li-duration: 0.5s;

	$li-delays: (
		1: 0.2s,
		2: 0.35s,
		3: 0.5s,
		4: 0.6s,
		5: 0.7s,
	);

	$k-delays: (
		1: 0.3s,
		2: 0.45s,
		3: 0.6s,
		4: 0.7s,
		5: 0.8s,
	);

	@each $index, $delay in $li-delays {
		li:nth-child(#{$index}) {
			animation-delay: $delay;
		}

		li:nth-child(#{$index}) k {
			animation-delay: map-get($k-delays, $index);
		}
	}

	ul li {
		opacity: 0;
		transform: translateY(1rem);
		animation: fade $li-duration cubic-bezier(0.05, 1, 0.18, 0.99) forwards;
	}

	k {
		opacity: 0;
		transform: translateX(-7px);
		animation: fade-left $li-duration cubic-bezier(0.05, 1, 0.18, 0.99) forwards;
	}

	@keyframes fade {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-left {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
