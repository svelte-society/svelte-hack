<script lang="ts">
	import type { SubmissionsTable } from '$lib/types/pocketbase'
	import FieldError from '$lib/forms/FieldError.svelte'
	import TextArea from '$lib/forms/TextArea.svelte'
	import { superForm } from 'sveltekit-superforms'
	import Select from '$lib/forms/Select.svelte'
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import Text from '$lib/forms/Text.svelte'
	import Removable from './Removable.svelte'
	import Form from '$lib/forms/Form.svelte'
	import { fade } from 'svelte/transition'
	import Confetti from './Confetti.svelte'
	import type { PageData } from './$types'
	import { page } from '$app/stores'

	interface Props {
		submission?: Partial<SubmissionsTable>
		isSubmitter: boolean | null
	}

	const { submission = {}, isSubmitter }: Props = $props()
	const LOCKED = !isSubmitter || !SUBMISSIONS_OPEN

	const form = superForm(($page.data as PageData).submissionForm, { resetForm: false })
	const { constraints, errors } = form

	let showSuccessAnimation = $state(false)
	let disabled = $state(LOCKED)

	let authorTwo = $state(!!submission.authorTwo)
	let authorThree = $state(!!submission.authorThree)

	function addAuthor() {
		if (!authorTwo) {
			authorTwo = true
		} else {
			authorThree = true
		}
	}
</script>

{#if showSuccessAnimation}
	<Confetti />
{/if}

<section transition:fade>
	<div class="br-sm"></div>
	<h2>Your SvelteHack Submission</h2>
	<div class="br-md"></div>

	<Form
		{form}
		action="?/updateSubmission"
		locked={LOCKED}
		bind:showSuccessAnimation
		bind:disabled
	>
		<label>
			<span>Author Email(s)</span>

			<input type="email" value={submission.authorOne || $page.data.user!.email} disabled />

			<Removable bind:open={authorTwo} {disabled}>
				<Text type="email" field="authorTwo" {form} {disabled} />
			</Removable>

			<Removable bind:open={authorThree} {disabled}>
				<Text type="email" field="authorThree" {form} {disabled} />
			</Removable>

			{#if !LOCKED}
				<button
					title="add author"
					type="button"
					class="add-author-btn"
					onclick={addAuthor}
					disabled={disabled || (authorTwo && authorThree)}
				>
					+
				</button>
			{/if}
		</label>

		<label>
			<span>Category</span>
			<Select {form} field="category" {disabled}>
				<option value="wizzbangery-wizard">Wizzbangery Wizard</option>
				<option value="rune-revolutionary">Rune Revolutionary</option>
				<option value="migration-master">Migration Master</option>
			</Select>
			<FieldError error={$errors.category} />
		</label>

		<label>
			<span>Project Title</span>
			<Text type="text" field="title" {form} {disabled} />
		</label>

		<label>
			<span>Project Description</span>
			<TextArea field="description" {form} {disabled} />
		</label>

		<label>
			<span>GitHub Repository</span>
			<Text type="url" field="github" {form} {disabled} />
		</label>

		<label>
			<span>Demo URL</span>
			<Text type="url" field="demo" {form} {disabled} />
		</label>

		{#if !isSubmitter}
			<p class="not-submitter" style="font-size: var(--font-xs); text-align: center;">
				To edit a submission, you must be the team member who created it.
			</p>
		{/if}

		{#if !LOCKED}
			<label>
				<input
					name="rulesAccepted"
					type="checkbox"
					{disabled}
					{...$constraints.rulesAccepted}
				/>
				<span>
					I have read and agree to the
					<a href="/2024/rules">SvelteHack 2024 rules</a>
				</span>
				<FieldError error={$errors.rulesAccepted} />
			</label>
		{/if}
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

	h2 {
		text-align: center;
	}

	button {
		margin: auto;

		box-shadow: var(--shadow);

		text-align: center;

		transition: opacity 0.2s ease-in-out;
	}

	.add-author-btn {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 2rem;
		height: 1rem;
		max-height: 2rem;
		padding: 0;
		padding-bottom: 0.25rem;
		line-height: 1rem;
		margin-top: 0.5rem;

		border: none;
		background: var(--bg-a);
		border-radius: var(--radius);
		outline: 2px solid transparent;

		box-shadow: var(--shadow-sm);
		transition: 0.2s;

		&:hover,
		&:focus-visible {
			outline-color: var(--bg-d);
		}
	}

	.not-submitter {
		width: 20rem;
		max-width: 90%;
		margin: 0 auto;
		text-align: center;
		color: var(--fg-c);
		font-size: var(--font-sm);
		flex-shrink: 1;
	}
</style>
