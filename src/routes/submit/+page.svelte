<script lang="ts">
	import type { ActionData, Snapshot } from './$types';

	import FieldError from './FieldError.svelte';
	import Removable from './Removable.svelte';
	import Confetti from './Confetti.svelte';
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	export const snapshot: Snapshot = {
		capture: () => (form?.success ? {} : form),
		restore: (data) => (form = data)
	};

	let authorTwo = false;
	let authorThree = false;

	function addAuthor() {
		if (!authorTwo) {
			authorTwo = true;
		} else {
			authorThree = true;
		}
	}
</script>

{#if form?.success}
	<section>
		<div class="br-xl" />
		<Confetti />
		<h2 class="thanks">Thank you for your submission!</h2>
	</section>
{:else}
	<section out:fly={{ y: 10, duration: 250 }}>
		<h2>Submit your project</h2>

		<div class="br-sm" />

		<p>
			Please review the <a href="/rules">rules</a>
			before submitting.
		</p>

		<div class="br-md" />

		{#if form?.error}
			<p>{form?.error}</p>
		{/if}

		<form method="POST" use:enhance>
			<label>
				<span>Author Name(s)</span>
				<input
					class="author"
					name="authorOne"
					type="text"
					value={form?.fields?.authorOne || ''}
					required
				/>
				<FieldError error={form?.fieldErrors?.authorOne} />

				<Removable bind:open={authorTwo}>
					<input
						class="author"
						name="authorTwo"
						type="text"
						value={form?.fields?.authorTwo || ''}
						required
					/>
					<FieldError error={form?.fieldErrors?.authorTwo} />
				</Removable>

				<Removable bind:open={authorThree}>
					<input
						class="author"
						name="authorThree"
						type="text"
						value={form?.fields?.authorThree || ''}
						required
					/>
					<FieldError error={form?.fieldErrors?.authorThree} />
				</Removable>

				<button
					title="add author"
					class:disabled={authorTwo && authorThree}
					type="button"
					class="add-author-btn"
					on:click={addAuthor}
				>
					+
				</button>
			</label>

			<label>
				<span>Project Title</span>
				<input name="title" type="text" value={form?.fields?.title || ''} required />
				<FieldError error={form?.fieldErrors?.title} />
			</label>

			<label>
				<span>Project Description</span>
				<textarea
					name="description"
					value={form?.fields?.description || ''}
					required
					rows="4"
				/>
				<FieldError error={form?.fieldErrors?.description} />
			</label>

			<label>
				<span>GitHub Repository</span>
				<input name="github" type="url" value={form?.fields?.github || ''} required />
				<FieldError error={form?.fieldErrors?.github} />
			</label>

			<label>
				<span>Demo URL</span>
				<input name="demo" type="url" value={form?.fields?.demo || ''} required />
				<FieldError error={form?.fieldErrors?.demo} />
			</label>

			<label>
				<span>
					Twitter <sup class="optional">optional</sup>
				</span>
				<input name="twitter" type="url" value={form?.fields?.twitter || ''} />
				<FieldError error={form?.fieldErrors?.twitter} />
			</label>

			<button type="submit" class="btn-b">Submit</button>
		</form>
	</section>
{/if}

<div class="br-xl" />

<style>
	h2.thanks {
		font-family: var(--font-a);
		font-weight: 300;
	}

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

	sup.optional {
		color: var(--bg-d);
		font-size: var(--font-xs);
		font-style: italic;
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
