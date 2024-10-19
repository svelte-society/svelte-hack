<script lang="ts" generics="T extends Record<string, unknown>">
	import type { FormPathLeaves } from 'sveltekit-superforms'

	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'
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
	select {
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

		cursor: pointer;
	}

	option {
		text-transform: capitalize;
	}
</style>
