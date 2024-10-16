<script lang="ts">
	const { activeYear = '2024' }: { activeYear: string } = $props()
</script>

<div class="year-selector">
	<a href="/2024/winners" class="button" class:active={activeYear === '2024'}>2024</a>
	<a href="/2023/winners" class="button" class:active={activeYear === '2023'}>2023</a>
</div>

<style lang="scss">
	.year-selector {
		display: flex;
		gap: 1rem;

		.button {
			padding: 0.25rem 1.25rem;

			outline: 1px solid var(--bg-d);
			border-radius: var(--radius);

			font-size: var(--font-sm);
			font-weight: 400;

			&.active {
				background: var(--bg-b);
				outline-color: var(--theme-a);
				font-weight: 600;
			}

			&:hover {
				outline-color: var(--theme-a);
			}
		}
	}
</style>
