<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		open?: boolean
		dialog?: HTMLDialogElement
		onOpen?: (event: { dialog: HTMLDialogElement }) => void
		onClose?: (event: { dialog: HTMLDialogElement }) => void
		activator?: Snippet
		content: Snippet<[open: () => void, close: () => void]>
	}

	let {
		dialog = $bindable(),
		open = $bindable(false),
		onClose,
		onOpen,
		activator,
		content: children,
	}: Props = $props()

	$effect(() => {
		if (dialog) {
			open ? openModal() : closeModal()
		}
	})

	// Based on code from https://stackoverflow.com/a/57463812
	function click(event: MouseEvent) {
		if (!dialog || event.target != dialog) return

		const rect = dialog.getBoundingClientRect()

		const clickedInDialog =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width

		if (clickedInDialog === false) {
			closeModal()
		}
	}

	function openModal() {
		if (!dialog) return
		dialog.showModal()
		open = true
		onOpen?.({ dialog })
	}

	function closeModal() {
		if (!dialog) return
		dialog.close()
		open = false
		onClose?.({ dialog })
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="activator" onclick={openModal}>
	{@render activator?.()}
</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog onclick={click} bind:this={dialog}>
	{@render children(openModal, closeModal)}
</dialog>

<style lang="scss">
	.activator {
		display: contents;
	}

	dialog {
		box-shadow: var(--shadow-lg);
		border-radius: var(--radius);
		border: 1px solid var(--theme-a);

		&::backdrop {
			@starting-style {
				backdrop-filter: blur(0);
			}
			transition: 0.15s ease-out;
			backdrop-filter: blur(5px);
		}
	}
</style>
