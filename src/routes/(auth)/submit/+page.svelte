<script lang="ts">
	import type { ActionData, PageData, SubmitFunction } from './$types'
	import FieldError from './FieldError.svelte'
	import Removable from './Removable.svelte'
	import Confetti from './Confetti.svelte'
	import { enhance } from '$app/forms'
	import { onDestroy } from 'svelte'

	export let data: PageData
	export let form: ActionData

	let disabled = false

	let authorTwo = !!data.submission?.authorTwo
	let authorThree = !!data.submission?.authorThree

	function addAuthor() {
		if (!authorTwo) {
			authorTwo = true
		} else {
			authorThree = true
		}
	}

	let confettiInterval: ReturnType<typeof setInterval>
	let confettiPlaying = false

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

			console.log('x', result)

			if (result.type == 'success') {
				triggerConfetti()
			}
		}
	}
</script>

{#if confettiPlaying}
	<Confetti />
{/if}

<section>
	<h2>Your SvelteHack Submission</h2>
	<div class="br-sm"></div>

	<!-- <p>Submissions are closed</p>
	<div class="br-md" /> -->

	<form method="POST" use:enhance={submit}>
		<label>
			<span>Author Email(s)</span>

			<input type="email" value={data.userEmail} disabled required />

			<Removable bind:open={authorTwo}>
				<input
					name="authorTwo"
					type="email"
					value={data.submission?.authorTwo}
					{disabled}
					required
				/>
				<FieldError error={form?.error?.authorTwo} />
			</Removable>

			<Removable bind:open={authorThree}>
				<input
					name="authorThree"
					type="email"
					value={data.submission?.authorThree}
					{disabled}
					required
				/>

				<FieldError error={form?.error?.authorThree} />
			</Removable>

			<button
				title="add author"
				class:disabled={authorTwo && authorThree}
				type="button"
				class="add-author-btn"
				on:click={addAuthor}
				{disabled}
			>
				+
			</button>
		</label>

		<label>
			<span>Project Title</span>
			<input name="title" type="text" value={data.submission?.title} {disabled} required />
			<FieldError error={form?.error?.title} />
		</label>

		<label>
			<span>Project Description</span>
			<textarea
				name="description"
				value={data.submission?.description}
				{disabled}
				required
				rows="4"
			></textarea>
			<FieldError error={form?.error?.description} />
		</label>

		<label>
			<span>GitHub Repository</span>
			<input name="github" type="url" value={data.submission?.github} {disabled} required />
			<FieldError error={form?.error?.github} />
		</label>

		<label>
			<span>Demo URL</span>
			<input name="demo" type="url" value={data.submission?.demo} {disabled} required />
			<FieldError error={form?.error?.demo} />
		</label>

		<label>
			<span>
				I have read and agree to the SvelteHack
				<a href="/2024/rules">rules</a>
			</span>
			<input name="rulesAccepted" type="checkbox" {disabled} required />
			<FieldError error={form?.error?.rulesAccepted} />
		</label>

		<button type="submit" class="btn-b" {disabled}>
			{confettiPlaying ? 'Saved!' : 'Save'}
		</button>

		{#if typeof form?.error == 'string'}
			<div class="center">
				<FieldError error={form.error} />
			</div>
		{/if}
	</form>
</section>

<div class="br-xl"></div>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}

	h2,
	p,
	.center {
		text-align: center;
	}

	p {
		font-style: italic;
		font-size: var(--font-sm);

		color: var(--fg-d);
	}

	button {
		margin: auto;

		box-shadow: var(--shadow-sm);

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
		box-shadow: var(--shadow-sm);
		border-radius: var(--radius);

		font-family: var(--font-a);
	}

	label {
		display: flex;
		flex-direction: column;
		position: relative;

		font-weight: 300;
	}

	label:first-of-type {
		margin: 0;
	}

	label span {
		margin: 0.5rem 0;
	}

	input,
	textarea {
		min-width: min(25rem, 90vw);
		max-width: 90vw;
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

		box-shadow: var(--shadow-xs);
		transition: 0.2s;
	}

	.disabled {
		max-height: 0;

		opacity: 0;

		pointer-events: none;
	}
</style>
