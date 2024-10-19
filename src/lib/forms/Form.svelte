<script lang="ts" generics="T extends Record<string, unknown>">
	import type { SuperForm } from 'sveltekit-superforms'
	import { onDestroy, type Snippet } from 'svelte'
	import FieldError from './FieldError.svelte'

	interface Props {
		form: SuperForm<T>
		action: string
		children: Snippet

		showSuccessAnimation?: boolean
		disabled?: boolean
		locked?: boolean
	}

	let {
		form,
		action,
		children,
		showSuccessAnimation = $bindable(false),
		disabled = $bindable(false),
		locked = false,
	}: Props = $props()

	const { errors, enhance, submitting } = form

	$effect(() => {
		disabled = locked || $submitting
	})

	let successAnimationTimeout: ReturnType<typeof setTimeout> | undefined

	onDestroy(() => {
		clearTimeout(successAnimationTimeout)
	})
</script>

<form
	method="POST"
	{action}
	use:enhance={{
		onUpdated({ form }) {
			if (form.valid) {
				showSuccessAnimation = true
				successAnimationTimeout = setTimeout(() => (showSuccessAnimation = false), 5000)
			}
		},
	}}
>
	{@render children()}

	{#if !locked}
		<button type="submit" class="btn-b" {disabled}>
			{showSuccessAnimation ? 'Saved!' : 'Save'}
		</button>
	{/if}

	{#if $errors._errors}
		<div class="center">
			<FieldError error={$errors._errors} />
		</div>
	{/if}
</form>

<style>
	.center {
		margin: 0 auto;
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		width: fit-content;
		padding: 1rem;

		background: color-mix(in hsl, var(--bg-a), var(--bg-b) 50%);
		box-shadow: var(--shadow);
		border-radius: var(--radius);

		font-family: var(--font-a);
	}
</style>
