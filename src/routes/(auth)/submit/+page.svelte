<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import FieldError from './FieldError.svelte';
	import Removable from './Removable.svelte';
	import Confetti from './Confetti.svelte';
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	export let form: ActionData;

	$: fields = {
		authorOne: form?.fields?.authorOne || data?.authorOne || '',
		authorTwo: form?.fields?.authorTwo || data?.authorTwo || '',
		authorThree: form?.fields?.authorThree || data?.authorThree || '',
		title: form?.fields?.title || data?.title || '',
		description: form?.fields?.description || data?.description || '',
		github: form?.fields?.github || data?.github || '',
		demo: form?.fields?.demo || data?.demo || ''
	};

	let disabled = true;

	let interval: ReturnType<typeof setInterval>;
	let saveAnimation = false;

	let authorTwo = !!data?.authorTwo;
	let authorThree = !!data?.authorThree;

	function addAuthor() {
		if (!authorTwo) {
			authorTwo = true;
		} else {
			authorThree = true;
		}
	}

	function saved() {
		if (saveAnimation && !disabled) return;

		disabled = false;
		saveAnimation = true;

		interval = setInterval(() => {
			saveAnimation = false;
		}, 5000);
	}

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#if saveAnimation}
	<Confetti />
{/if}

<section>
	<h2>Your SvelteHack Project</h2>

	<div class="br-sm" />

	<p>Submissions are closed</p>

	<div class="br-md" />

	{#if form?.error}
		<p>{form?.error}</p>
	{/if}

	<form
		method="POST"
		use:enhance={() => {
			disabled = true;

			return async ({ update }) => {
				saved();
				await update({ reset: false });
			};
		}}
	>
		<label>
			<span>Author Email(s)</span>

			<input name="authorOne" type="email" value={fields.authorOne} disabled required />
			<FieldError error={form?.fieldErrors?.authorOne} />

			<Removable bind:open={authorTwo}>
				<input name="authorTwo" type="email" value={fields.authorTwo} disabled required />
				<FieldError error={form?.fieldErrors?.authorTwo} />
			</Removable>

			<Removable bind:open={authorThree}>
				<input
					name="authorThree"
					type="email"
					value={fields.authorThree}
					disabled
					required
				/>

				<FieldError error={form?.fieldErrors?.authorThree} />
			</Removable>

			<!-- <button
				title="add author"
				class:disabled={authorTwo && authorThree}
				type="button"
				class="add-author-btn"
				on:click={addAuthor}
				disabled
			>
				+
			</button> -->
		</label>

		<label>
			<span>Project Title</span>
			<input name="title" type="text" value={fields.title} disabled required />
			<FieldError error={form?.fieldErrors?.title} />
		</label>

		<label>
			<span>Project Description</span>
			<textarea name="description" value={fields.description} disabled required rows="4" />
			<FieldError error={form?.fieldErrors?.description} />
		</label>

		<label>
			<span>GitHub Repository</span>
			<input name="github" type="url" value={fields.github} disabled required />
			<FieldError error={form?.fieldErrors?.github} />
		</label>

		<label>
			<span>Demo URL</span>
			<input name="demo" type="url" value={fields.demo} disabled required />
			<FieldError error={form?.fieldErrors?.demo} />
		</label>

		<!-- <button type="submit" class="btn-b" disabled>
			{saveAnimation ? 'Saved!' : 'Save'}
		</button> -->
	</form>
</section>

<div class="br-xl" />

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}

	h2,
	p {
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
