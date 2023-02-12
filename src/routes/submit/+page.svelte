<script lang="ts">
	import type { ActionData } from './$types'

	import FieldError from './FieldError.svelte'
	import { enhance } from '$app/forms'

	export let form: ActionData

	function REMOVE_ME() {
		if (!form) {
			// @ts-ignore
			form = {}
		}

		// @ts-ignore
		form.fields = {
			title: 'test',
			github: 'https://example.com',
			demo: 'https://example.com',
			description: 'test',
			author: 'test',
			twitter: 'https://example.com'
		}
	}

	REMOVE_ME()
</script>

{#if form?.error}
	<p>{form?.error}</p>
{/if}

{#if form?.success}
	<!-- maybe confetti? -->
	<p>success</p>
{/if}

<form method="POST" use:enhance>
	<label>
		<span>
			Project Title <span class="required">*</span>
		</span>
		<input name="title" type="text" value={form?.fields?.title || ''} required />
		<FieldError error={form?.fieldErrors?.title} />
	</label>

	<label>
		<span>
			Project Description <span class="required">*</span>
		</span>
		<textarea name="description" value={form?.fields?.description || ''} required />
		<FieldError error={form?.fieldErrors?.description} />
	</label>

	<label>
		<span>
			Author Name <span class="required">*</span>
		</span>
		<input name="author" type="text" value={form?.fields?.author || ''} required />
		<FieldError error={form?.fieldErrors?.author} />
	</label>

	<label>
		<span>
			GitHub Repository <span class="required">*</span>
		</span>
		<input name="github" type="url" value={form?.fields?.github || ''} required />
		<FieldError error={form?.fieldErrors?.github} />
	</label>

	<label>
		<span>
			Demo URL <span class="required">*</span>
		</span>
		<input name="demo" type="url" value={form?.fields?.demo || ''} required />
		<FieldError error={form?.fieldErrors?.demo} />
	</label>

	<label>
		<span>Twitter</span>
		<input name="twitter" type="url" value={form?.fields?.twitter || ''} />
		<FieldError error={form?.fieldErrors?.twitter} />
	</label>

	<button class="btn-a">Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 3rem;

		width: fit-content;
		margin: auto;

		border: 1px solid var(--brand-a);
		border-radius: var(--radius);
		background: var(--bg-b);

		padding: 2rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	input,
	textarea {
		width: 20rem;
		max-width: 90vw;

		background: var(--bg-a);
		border: none;
		padding: 0.5rem;
		border-radius: var(--radius);
	}

	button {
		width: 50%;
	}

	.required {
		color: var(--brand-a);
	}
</style>
