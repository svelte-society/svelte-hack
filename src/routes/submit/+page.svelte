<script lang="ts">
	import FieldError from './FieldError.svelte'
	import type { ActionData } from './$types'
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
		<span>Project Title *</span>
		<input name="title" type="text" value={form?.fields?.title || ''} required />
		<FieldError error={form?.fieldErrors?.title} />
	</label>

	<label>
		<span>Project Description *</span>
		<textarea name="description" value={form?.fields?.description || ''} required />
		<FieldError error={form?.fieldErrors?.description} />
	</label>

	<label>
		<span>Your Name *</span>
		<input name="author" type="text" value={form?.fields?.author || ''} required />
		<FieldError error={form?.fieldErrors?.author} />
	</label>

	<label>
		<span>GitHub Repository *</span>
		<input name="github" type="url" value={form?.fields?.github || ''} required />
		<FieldError error={form?.fieldErrors?.github} />
	</label>

	<label>
		<span>Demo URL *</span>
		<input name="demo" type="url" value={form?.fields?.demo || ''} required />
		<FieldError error={form?.fieldErrors?.demo} />
	</label>

	<label>
		<span>Twitter</span>
		<input name="twitter" type="url" value={form?.fields?.twitter || ''} required />
		<FieldError error={form?.fieldErrors?.twitter} />
	</label>

	<button>Submit</button>
</form>
