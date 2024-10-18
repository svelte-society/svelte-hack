<script lang="ts">
	import type { SubmissionsTable, UsersTable } from '$lib/types/pocketbase'
	import type { ActionData, PageData, SubmitFunction } from './$types'
	import { superForm } from 'sveltekit-superforms'
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import FieldError from './FieldError.svelte'
	import Removable from './Removable.svelte'
	import { fade } from 'svelte/transition'
	import Confetti from './Confetti.svelte'
	import { onDestroy } from 'svelte'
	import { page } from '$app/stores'

	const {
		submission = {},
		isSubmitter,
		user,
	}: {
		submission?: Partial<SubmissionsTable>
		isSubmitter: boolean | null
		user: UsersTable
	} = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(
		($page.data as PageData).submissionForm,
	)

	const locked = !isSubmitter || !SUBMISSIONS_OPEN
	let disabled = $derived(locked || $submitting)

	let authorTwo = $state(!!submission.authorTwo)
	let authorThree = $state(!!submission.authorThree)

	function addAuthor() {
		if (!authorTwo) {
			authorTwo = true
		} else {
			authorThree = true
		}
	}

	let confettiInterval: ReturnType<typeof setInterval>
	let confettiPlaying = $state(false)

	function triggerConfetti() {
		confettiPlaying = true
		confettiInterval = setInterval(() => (confettiPlaying = false), 5000)
	}

	onDestroy(() => {
		clearInterval(confettiInterval)
	})
</script>

{#if confettiPlaying}
	<Confetti />
{/if}

<section transition:fade>
	<div class="br-sm"></div>
	<h2>Your SvelteHack Submission</h2>
	<div class="br-md"></div>

	<form
		method="POST"
		action="?/updateSubmission"
		use:enhance={{
			onUpdated({ form }) {
				if (form.valid) {
					triggerConfetti()
				}
			},
		}}
	>
		<label>
			<span>Author Email(s)</span>

			<input type="email" value={submission.authorOne || user.email} disabled />

			<Removable bind:open={authorTwo} {disabled}>
				<input
					type="email"
					name="authorTwo"
					{disabled}
					bind:value={$form.authorTwo}
					{...$constraints.authorTwo}
				/>
				<FieldError error={$errors.authorTwo} />
			</Removable>

			<Removable bind:open={authorThree} {disabled}>
				<input
					type="email"
					name="authorThree"
					{disabled}
					bind:value={$form.authorThree}
					{...$constraints.authorThree}
				/>

				<FieldError error={$errors.authorThree} />
			</Removable>

			{#if !locked}
				<button
					title="add author"
					class:disabled={authorTwo && authorThree}
					type="button"
					class="add-author-btn"
					onclick={addAuthor}
					{disabled}
				>
					+
				</button>
			{/if}
		</label>

		<label>
			<span>Project Title</span>
			<input
				name="title"
				type="text"
				{disabled}
				bind:value={$form.title}
				{...$constraints.title}
			/>
			<FieldError error={$errors.title} />
		</label>

		<label>
			<span>Project Description</span>
			<textarea
				name="description"
				rows="4"
				{disabled}
				bind:value={$form.description}
				{...$constraints.description}
			></textarea>
			<FieldError error={$errors.description} />
		</label>

		<label>
			<span>GitHub Repository</span>
			<input
				name="github"
				type="url"
				{disabled}
				bind:value={$form.github}
				{...$constraints.github}
			/>
			<FieldError error={$errors.github} />
		</label>

		<label>
			<span>Demo URL</span>
			<input
				name="demo"
				type="url"
				{disabled}
				bind:value={$form.demo}
				{...$constraints.demo}
			/>
			<FieldError error={$errors.demo} />
		</label>

		{#if !isSubmitter}
			<p class="not-submitter" style="font-size: var(--font-xs); text-align: center;">
				To edit a submission, you must be the team member who created it.
			</p>
		{/if}

		{#if !locked}
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

			<button type="submit" class="btn-b" {disabled}>
				{confettiPlaying ? 'Saved!' : 'Save'}
			</button>
		{/if}

		{#if $errors._errors}
			<div class="center">
				<FieldError error={$errors._errors} />
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
	input:disabled,
	textarea:disabled {
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

	input:not([type='checkbox']),
	textarea {
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

	textarea {
		resize: vertical;
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

	.disabled {
		max-height: 0;

		opacity: 0;

		pointer-events: none;
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
