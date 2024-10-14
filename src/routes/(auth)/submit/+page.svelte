<script lang="ts">
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import Submission from './Submission.svelte'
	import { slide } from 'svelte/transition'

	export let data
	export let form

	let showSubmissionForm = !!data.submission
</script>

{#if !SUBMISSIONS_OPEN}
	<div class="card" transition:slide>
		<p>
			Submissions for
			<strong style:color="var(--theme-a)">SvelteHack 2024</strong>
			<sup>runes-edition</sup> are closed.
			{#if data.submission}
				Thanks for participating! You'll still be able to see your submission here, but you
				can no longer make any edits. Reach out to kev@sveltesociety.dev if you have any
				concerns.
			{:else}
				Thanks to everyone who entered.
			{/if}
			The <a href="/2024/winners">winners</a> will be posted on January 31st 2025. In the
			meantime why don't you come hang out on the
			<a href="https://svelte.dev/chat">Svelte Discord</a>!
		</p>
	</div>
	<div class="br-md"></div>
{/if}

{#if showSubmissionForm}
	<Submission
		submission={data.submission || {}}
		isSubmitter={data.isSubmitter}
		user={data.user!}
		{form}
	/>
{:else if SUBMISSIONS_OPEN}
	<div class="card" transition:slide>
		<p>
			Welcome to
			<strong style:color="var(--theme-a)">SvelteHack 2024</strong>
			<sup>runes-edition</sup>. To get started take a look at the
			<a href="/2024/prizes">categories</a>, and read the
			<a href="/2024/rules">rules</a>. Then you can create your submission below! If you're
			working on a team only one of you will need to do this.
		</p>

		<button class="button btn-b" onclick={() => (showSubmissionForm = true)}>
			Let's do it
		</button>
	</div>
{/if}

<div class="br-xl"></div>
