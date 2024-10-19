<script lang="ts" generics="T extends Record<string, unknown>">
	import type { FormPathLeaves } from 'sveltekit-superforms'
	import type { Snippet } from 'svelte'

	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'
	import FieldError from './FieldError.svelte'

	interface Props {
		form: SuperForm<T>
		field: FormPathLeaves<T>
		disabled: boolean
		children: Snippet
	}

	const { form, field, disabled, children }: Props = $props()
	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<select name="category" bind:value={$value} {disabled} {...$constraints}>
	{@render children()}
</select>

<FieldError error={$errors} />
