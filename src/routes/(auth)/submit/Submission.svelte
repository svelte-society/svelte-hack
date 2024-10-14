<script lang="ts">
	import type { SubmissionsTable, UsersTable } from '$lib/types/pocketbase'
	import type { ActionData, SubmitFunction } from './$types'
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import FieldError from './FieldError.svelte'
	import Removable from './Removable.svelte'
	import { fade } from 'svelte/transition'
	import Confetti from './Confetti.svelte'
	import { enhance } from '$app/forms'
	import { onDestroy } from 'svelte'

	const {
		submission = {},
		isSubmitter,
		user,
		form,
	}: {
		submission?: Partial<SubmissionsTable>
		isSubmitter: boolean | null
		user: UsersTable
		form: ActionData
	} = $props()

	const locked = isSubmitter === false || !SUBMISSIONS_OPEN
	let disabled = $state(locked)

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

	const submit: SubmitFunction = () => {
		disabled = true

		return async ({ result, update }) => {
			await update({ reset: false })
			disabled = false

			if (result.type == 'success') {
				triggerConfetti()
			}
		}
	}
</script>

{#if confettiPlaying}
	<Confetti />
{/if}

<section transition:fade>
	<div class="br-sm"></div>
	<h2>Your SvelteHack Submission</h2>
	<div class="br-md"></div>

	<form method="POST" action="?/updateSubmission" use:enhance={submit}>
		<label>
			<span>Author Email(s)</span>

			<input
				type="email"
				name="authorOne"
				value={submission.authorOne || user.email}
				{disabled}
				required
			/>
			<FieldError error={form?.error?.authorOne} />

			<Removable bind:open={authorTwo} {disabled}>
				<input
					type="email"
					name="authorTwo"
					value={submission.authorTwo}
					{disabled}
					required
				/>
				<FieldError error={form?.error?.authorTwo} />
			</Removable>

			<Removable bind:open={authorThree} {disabled}>
				<input
					type="email"
					name="authorThree"
					value={submission.authorThree}
					{disabled}
					required
				/>

				<FieldError error={form?.error?.authorThree} />
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
			<input name="title" type="text" value={submission.title} {disabled} required />
			<FieldError error={form?.error?.title} />
		</label>

		<label>
			<span>Project Description</span>
			<textarea name="description" value={submission.description} {disabled} required rows="4"
			></textarea>
			<FieldError error={form?.error?.description} />
		</label>

		<label>
			<span>GitHub Repository</span>
			<input name="github" type="url" value={submission.github} {disabled} required />
			<FieldError error={form?.error?.github} />
		</label>

		<label>
			<span>Demo URL</span>
			<input name="demo" type="url" value={submission.demo} {disabled} required />
			<FieldError error={form?.error?.demo} />
		</label>

		{#if !isSubmitter}
			<p style="font-size: var(--font-xs);">
				Only the member of your team that made the submission can make edits
			</p>
		{/if}

		{#if !locked}
			<label>
				<input name="rulesAccepted" type="checkbox" {disabled} required />
				<span>
					I have read and agree to the
					<a href="/2024/rules">SvelteHack 2024 rules</a>
				</span>
				<FieldError error={form?.error?.rulesAccepted} />
			</label>

			<button type="submit" class="btn-b" {disabled}>
				{confettiPlaying ? 'Saved!' : 'Save'}
			</button>
		{/if}

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
		padding: 2rem;

		background: var(--bg-b);
		box-shadow: var(--shadow);
		border-radius: var(--radius);

		font-family: var(--font-a);
	}

	label {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;

		font-weight: 300;
	}

	label:has(input[type='checkbox']) {
		display: block;
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
		margin-top: 0.5rem;

		border: none;
		background: var(--bg-a);
		border-radius: var(--radius);

		box-shadow: var(--shadow-sm);
		transition: 0.2s;
	}

	.disabled {
		max-height: 0;

		opacity: 0;

		pointer-events: none;
	}
</style>
