<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'
	import type { FormPathLeaves } from 'sveltekit-superforms'
	import FieldError from './FieldError.svelte'

	interface Props {
		form: SuperForm<T>
		field: FormPathLeaves<T>
		disabled: boolean
		type?: 'text' | 'email' | 'url' | 'checkbox'
	}

	const { form, field, type = 'text', disabled }: Props = $props()
	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<input {type} name={field} bind:value={$value} {...$constraints} {disabled} />
<FieldError error={$errors} />

<style>
	input:not([type='checkbox']) {
		min-width: min(25rem, 90vw);
		max-width: 90vw;
		width: 100%;
		max-height: 10rem;

		border: none;
		background: var(--bg-a);
		padding: 0.5rem;
		border-radius: var(--radius);
		outline-color: var(--fg-e);

		font-family: var(--font-mono);

		transition: 0.2s;
	}
</style>
