<script>
	import Hat from '$lib/graphics/Hat.svelte'

	import Society from '$lib/graphics/Society.svelte'
</script>

<section>
	<div class="card-wrapper">
		<div class="society">
			<Society />
		</div>
		<div class="hat">
			<Hat />
		</div>
		<div class="card">
			<p>
				<strong><a href="https://sveltesociety.dev">Svelte Society</a></strong>
				is excited to bring you
				<strong style:color="var(--brand-a)">SvelteHack</strong>
				on behalf of the Svelte team, our generous sponsors, and the svelte community at large! We're inviting you to compete in this
				event and share your creations with the community.
			</p>
			<p>
				In turn, we're contributing thousands in cash
				<a href="/prizes">prizes</a>
				, and special rewards from our sponsors.
			</p>
			<p>
				Read our
				<a href="rules">rules</a>
				to learn more about how you can participate, and join our
				<a href="https://svelte.dev/chat">Discord channel</a>
				to stay tuned.
			</p>
		</div>
	</div>
</section>

<style>
	.society,
	.hat {
		--size: 100px;
		position: absolute;
		left: -9%;
		top: -11%;
	}
	.society {
		z-index: -1;
	}
</style>
