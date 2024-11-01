<script lang="ts">
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte'
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
		// todo remove in favour of $form
		submission?: Partial<SubmissionsTable>
		isSubmitter: boolean
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
	<h2>{$page.data.hasSubmission ? 'Edit Your Submission' : 'SvelteHack Submission'}</h2>
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

			<span class="muted">
				Please ensure you use your
				<a
					href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/changing-your-primary-email-address"
				>
					GitHub primary email
				</a>
				here.
			</span>

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
			<span>Preferred Category</span>
			<Select
				{form}
				field="category"
				{disabled}
				options={[
					{ label: 'Wizzbangery Wizard', value: 'wizzbangery' },
					{ label: 'Rune Ritualist', value: 'package' },
					{ label: 'Migration Magician', value: 'migration' },
				]}
			/>
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

	{#if submission?.id && isSubmitter}
		<div class="br-sm"></div>
		<ConfirmDialog action="?/withdraw" message="Are you sure you'd like to withdraw?">
			<button class="withdraw btn-b"> Withdraw Submission </button>
		</ConfirmDialog>
	{/if}
</section>

<style lang="scss">
	.withdraw {
		transition: color 0.2s ease-in-out;

		&:focus-visible,
		&:hover {
			color: var(--theme-a);
		}
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
		max-width: 500px;
	}

	button {
		margin: auto;

		box-shadow: var(--shadow);

		text-align: center;

		transition: opacity 0.2s ease-in-out;
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

		&:not(:has(select, input[disabled], :focus-within)) {
			cursor: pointer;
		}
	}

	label:first-of-type {
		margin: 0;
	}

	:global(label:has(input[type='checkbox'])) {
		display: block;
		padding-top: 0.5rem;
		* {
			outline-color: var(--fg-e);
		}
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
		outline-color: var(--fg-e);

		font-family: var(--font-mono);

		transition: 0.2s;
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

	.withdraw {
		font-size: var(--font-xs);
		padding: 0.5rem 1rem;
	}
</style>
