<script lang="ts">
	export let prize: {
		name: string
		description: string
		award: string
		icon: string
	}

	const { name, description, award, icon } = prize
</script>

<div class="container">
	<div class="row">
		<div class="card">
			<div class="row">
				<div class="icon">{icon}</div>
				<h2>{name}</h2>
				<div class="award">{award}</div>
			</div>
			<p>{@html description}</p>
		</div>
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

	.card {
		box-shadow: var(--shadow-sm);
	}

	.icon {
		font-size: 40px;
		margin-right: 1rem;
	}

	.award {
		margin-left: auto;
		color: var(--dark-a);
		font-size: var(--font-lg);
	}

	:global(pre) {
		display: inline;
		padding: 4px;

		color: var(--brand-a);
		background: var(--light-b);

		font-weight: 700;
	}
</style>
