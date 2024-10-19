<script lang="ts">
	import type { Snippet } from 'svelte'
	import Dialog from './Dialog.svelte'

	interface Props {
		children: Snippet
		message: string
		action: string
	}

	const { children, message, action }: Props = $props()
</script>

<Dialog>
	{#snippet content(open, close)}
		<p>{message}</p>

		<div class="row">
			<button class="button btn-a" onclick={close}>No</button>

			<form method="POST" {action}>
				<button class="button btn-a" onclick={close}> Yes </button>
			</form>
		</div>
	{/snippet}

	{#snippet activator()}
		{@render children()}
	{/snippet}
</Dialog>
