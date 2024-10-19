<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'
	import type { FormPathLeaves } from 'sveltekit-superforms'
	import FieldError from './FieldError.svelte'

	interface Props {
		form: SuperForm<T>
		field: FormPathLeaves<T>
		disabled: boolean
		options: string[]
	}

	const { form, field, disabled, options }: Props = $props()
	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<select name="category" bind:value={$value} {disabled} {...$constraints}>
	{#each options as option}
		<option value={option} selected={option == $value}>
			{option.replaceAll('-', ' ')}
		</option>
	{/each}
</select>
<FieldError error={$errors} />

<style>
	option {
		text-transform: capitalize;
	}
</style>
