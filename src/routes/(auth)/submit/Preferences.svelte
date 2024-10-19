<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import Form from '$lib/forms/Form.svelte'
	import Text from '$lib/forms/Text.svelte'
	import { fade } from 'svelte/transition'
	import type { PageData } from './$types'
	import { page } from '$app/stores'

	const form = superForm(($page.data as PageData).preferencesForm, { resetForm: false })
	let showSuccessAnimation = $state(false)
	let disabled = $state(false)
</script>

<section transition:fade>
	<div class="br-sm"></div>
	<h3>Preferences</h3>
	<div class="br-md"></div>

	<Form {form} action="?/updatePreferences" bind:showSuccessAnimation bind:disabled>
		<label>
			<span>Contact Email</span>
			<Text {form} type="email" field="preferedEmail" {disabled} />
		</label>

		<label>
			<span>Display Name</span>
			<span class="muted"> This will be seen when sharing your submission online. </span>
			<Text {form} type="text" field="name" {disabled} />
		</label>
	</Form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
		max-width: 500px;
	}

	label {
		display: flex;
		flex-direction: column;
		position: relative;

		width: 100%;
		padding: 0 0.5rem 0.5rem;

		background: color-mix(in hsl, var(--bg-a), var(--bg-b) 75%);
		outline: 1px solid var(--bg-a);
		border-radius: var(--radius);

		font-weight: 300;

		span {
			margin: 0.5rem 0;
		}
	}

	label:first-of-type {
		margin: 0;
	}
</style>
