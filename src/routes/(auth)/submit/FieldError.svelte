<script lang="ts">
	export let error: string[] | string | undefined
	$: errorMessage = Array.isArray(error) ? error[0] : error
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
