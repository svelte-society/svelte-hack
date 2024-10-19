<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'
	import type { FormPathLeaves } from 'sveltekit-superforms'
	import FieldError from './FieldError.svelte'

	interface Props {
		form: SuperForm<T>
		field: FormPathLeaves<T>
		disabled: boolean
	}

	const { form, field, disabled }: Props = $props()
	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<textarea name={field} bind:value={$value} {...$constraints} {disabled}></textarea>
<FieldError error={$errors} />
