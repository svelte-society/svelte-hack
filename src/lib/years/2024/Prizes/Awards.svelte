<div class="right col">
	<ul class="col">
		<li class="first">
			<k>1<sup>st</sup></k> <v><span class="currency">$</span>3000</v>
		</li>
		<li class="second">
			<k>2<sup>nd</sup></k> <v><span class="currency">$</span>1000</v>
		</li>
		<li class="third">
			<k>3<sup>rd</sup></k> <v><span class="currency">$</span>250</v>
		</li>
		<li class="third">
			<k>4<sup>th</sup></k> <v><span class="currency">$</span>250</v>
		</li>
		<li class="third">
			<k>5<sup>th</sup></k> <v><span class="currency">$</span>250</v>
		</li>
	</ul>
</div>

<style lang="scss">
	.right {
		flex-shrink: 0;

		width: fit-content;
		padding: 1rem;

		color: var(--fg-a);
		background: color-mix(in hsl, var(--bg-a), var(--bg-b));
		border-radius: var(--radius);
		box-shadow: var(--shadow-lg);
		outline: 1px solid var(--bg-b);
	}

	.right ul {
		gap: 0.5rem;
	}

	.right li {
		display: flex;
		align-items: center;
		gap: 1.5rem;

		font-size: var(--font);
		font-family: var(--font-mono);

		white-space: nowrap;
		list-style: none;
	}

	.right k {
		width: 1rem;
		font-weight: 600;
	}

	.right k sup {
		font-weight: 400;
		color: var(--fg-d);
	}

	.right v {
		width: 4.5rem;
		padding: 0.25rem 0.5rem;
		color: var(--fg-a);
		background: var(--bg-b);
		outline: 1px solid light-dark(var(--light-d), var(--dark-c));
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);
		font-family: var(--font-a);
		font-size: 1.1rem;
		font-weight: 600;
	}

	.right v .currency {
		margin-left: -0.2rem;
		margin-right: 0.2rem;
		color: var(--fg-c);
		font-weight: 300;
	}
</style>
