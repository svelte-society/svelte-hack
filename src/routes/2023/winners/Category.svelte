<script lang="ts">
	import GitHub from '$lib/graphics/GitHub.svelte';
	import Website from '$lib/graphics/Website.svelte';
	import type { Winner } from './types';

	export let category: string;
	export let winners: Winner[];

	function icon(place: number) {
		switch (place) {
			case 1:
				return '🏆';

			case 2:
				return '🥈';

			default:
				return `#${place}`;
		}
	}
</script>

<div class="category">
	<h2>{category}</h2>

	<div class="winners">
		{#each winners as winner}
			<div
				class="card"
				style:--glow-colour={winner.place == 1 ? '218, 165, 32' : '192, 192, 192'}
				class:glow={winner.place == 1 || winner.place == 2}
			>
				<div class="top-row">
					<h2>{icon(winner.place)} {winner.title}</h2>

					<div class="links">
						<a href={winner.github} target="_blank" rel="noreferrer" class="icon-link">
							<GitHub />
						</a>

						<a href={winner.website} target="_blank" rel="noreferrer" class="icon-link">
							<Website />
						</a>
					</div>
				</div>

				<p>{winner.description}</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.category {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.winners {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: 1fr;
		gap: 22px;

		height: 100%;

		@media (max-width: 400px) {
			grid-auto-rows: max-content;
		}
	}

	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;

		@media (max-width: 400px) {
			flex-direction: column-reverse;
			align-items: flex-start;
			justify-content: initial;
			gap: 16px;
		}
	}

	.card {
		width: 100%;
		max-width: 800px;

		&.glow {
			box-shadow: -0.25rem 0.5rem 2rem 0.25rem rgba(var(--glow-colour), 0.2) inset;
		}

		&:not(&.glow) {
			box-shadow: var(--shadow-sm);
		}
	}

	.links {
		display: flex;
		align-items: center;
	}

	.icon-link {
		width: 40px;
		height: 40px;
		padding: 8px;

		opacity: 0.6;
		transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;

		cursor: pointer;

		&:hover,
		&:focus {
			opacity: 1;
			fill: var(--brand-a);
			color: var(--brand-a);
		}

		@media (max-width: 400px) {
			padding: 0px;
			margin-right: 12px;
			width: 20px;
			height: 20px;
		}
	}
</style>
