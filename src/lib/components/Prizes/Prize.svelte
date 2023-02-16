<script lang="ts">
	import StackblitzIcon from '$lib/graphics/sponsors/StackblitzIcon.svelte';
	import VercelIcon from '$lib/graphics/sponsors/VercelIcon.svelte';

	export let prize: {
		name: string;
		description: string;
		award: string;
		icon: string;
		glow?: boolean;
	};

	const { name, description, award, icon, glow } = prize;
</script>

<div class="container">
	<div class="card" class:glow>
		<div class="row">
			<div class="icon">{icon}</div>
			<h2>{name}</h2>
			{#if award === 'sponsors'}
				<div class="sponsors">
					<StackblitzIcon />
					<VercelIcon />
				</div>
			{:else}
				<div class="award">{award}</div>
			{/if}
		</div>

		<p>{@html description}</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.card:not(.glow) {
		box-shadow: var(--shadow-sm);
	}

	.icon {
		font-size: 40px;
		margin-right: 1rem;
	}

	.award {
		margin-left: auto;
		color: var(--fg-a);
		font-size: var(--font-lg);
	}

	.sponsors {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-left: auto;
	}

	:global(pre) {
		display: inline;
		padding: 4px;

		color: var(--brand-a);
		background: var(--bg-b);

		font-weight: 700;
	}
</style>
