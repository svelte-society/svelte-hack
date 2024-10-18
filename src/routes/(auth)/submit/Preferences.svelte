<script lang="ts">
	import type { UsersTable } from '$lib/types/pocketbase'
	import type { ActionData, SubmitFunction } from './$types'
	import FieldError from './FieldError.svelte'
	import { fade } from 'svelte/transition'
	import { enhance } from '$app/forms'

	const {
		user,
		form,
	}: {
		user: UsersTable
		form: ActionData
	} = $props()

	let disabled = $state(false)
	let saved = $state(false)

	const submit: SubmitFunction = () => {
		disabled = true

		return async ({ update }) => {
			await update({ reset: false })
			disabled = false
			saved = true
			setTimeout(() => (saved = false), 1000)
		}
	}
</script>

<!-- todo superforms -->

<section transition:fade>
	<div class="br-sm"></div>
	<h2>Your Preferences</h2>
	<div class="br-md"></div>

	<form method="POST" action="?/updatePreferences" use:enhance={submit}>
		<label>
			<span>Prefered Contact Email</span>
			<input
				name="preferedEmail"
				type="email"
				value={user.preferedEmail || user.email}
				{disabled}
			/>
			<FieldError {form} error={form?.error?.preferedEmail} />
		</label>

		<label>
			<span>Name or Username</span>
			<span class="muted">
				This can be any name you preffered to be called by, such as a username. This will
				used when sharing your subnmission online.
			</span>
			<input name="name" type="text" maxlength="64" value={user.name} {disabled} />
			<FieldError error={form?.error?.name} />
		</label>

		<label>
			<span>Pronouns</span>
			<input name="name" type="text" maxlength="32" value={user.name} {disabled} />
			<FieldError error={form?.error?.pronouns} />
		</label>

		<button type="submit" class="btn-b" {disabled}>
			{saved ? 'Saved!' : 'Save'}
		</button>

		{#if typeof form?.error == 'string'}
			<div class="center">
				<FieldError error={form.error} />
			</div>
		{/if}
	</form>
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

	h2 {
		text-align: center;
	}

	button {
		margin: auto;

		box-shadow: var(--shadow);

		text-align: center;

		transition: opacity 0.2s ease-in-out;
	}

	button:disabled,
	input:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		width: fit-content;
		padding: 1rem;

		/* background: var(--bg-b); */
		background: color-mix(in hsl, var(--bg-a), var(--bg-b) 50%);
		box-shadow: var(--shadow);
		border-radius: var(--radius);

		font-family: var(--font-a);
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
	}

	label:has(input[type='checkbox']) {
		display: block;
		padding-top: 0.5rem;
		* {
			outline-color: var(--fg-e);
		}
	}

	label:first-of-type {
		margin: 0;
	}

	label span {
		margin: 0.5rem 0;
	}

	input:not([type='checkbox']) {
		min-width: min(25rem, 90vw);
		max-width: 90vw;
		width: 100%;
		max-height: 10rem;

		border: none;
		background: var(--bg-a);
		padding: 0.5rem;
		border-radius: var(--radius);
		/* outline-color: color-mix(in hsl, var(--theme-a), transparent 50%); */
		outline-color: var(--fg-e);

		font-family: var(--font-mono);

		transition: 0.2s;
	}
</style>
