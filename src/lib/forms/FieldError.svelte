<script lang="ts">
	interface Props {
		error: string[] | string | undefined
	}

	const { error }: Props = $props()
	const errorMessage = $derived(Array.isArray(error) ? error[0] : error)
</script>

{#if errorMessage}
	<p class="error">
		{errorMessage}
	</p>
{/if}

<style>
	.error {
		color: tomato;
		font-size: var(--font-sm);
		margin-top: 6px;
	}
</style>
