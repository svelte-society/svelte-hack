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
	<h2>Your Preferences</h2>
	<div class="br-md"></div>

	<Form {form} action="?/updatePreferences" bind:showSuccessAnimation bind:disabled>
		<label>
			<span>Prefered Contact Email</span>
			<Text {form} type="email" field="preferedEmail" {disabled} />
		</label>

		<label>
			<span>Name or Username</span>
			<span class="muted">
				This can be any name you preffered to be called by, such as a username. This will
				used when sharing your submission online.
			</span>
			<Text {form} type="text" field="name" {disabled} />
		</label>

		<label>
			<span>Pronouns</span>
			<Text {form} type="text" field="pronouns" {disabled} />
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

	.muted {
		opacity: 0.6;
	}
</style>
