<script lang="ts">
	export let error: string[] | undefined
</script>

{#if error?.length}
	<p class="error">
		{error[0]}
	</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>
