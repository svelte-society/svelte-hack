<script lang="ts">
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import Submission from './Submission.svelte'
	import { slide } from 'svelte/transition'

	export let data
	export let form

	let showSubmissionForm = !!data.submission;
</script>

{#if showSubmissionForm}
	<Submission submission={data.submission || {}} user={data.user!} {form} />
{:else if SUBMISSIONS_OPEN}
	<div class="card" transition:slide>
		<p>
			Welcome to
			<strong style:color="var(--brand-a)">SvelteHack 2024</strong>
			<sup>runes-edition</sup>. To get started take a look at the
			<a href="/2024/prizes">categories</a>, and read the
			<a href="/2024/rules">rules</a>. Then you can create your submission below!
			If you're working on a team only one of you will need to do this.
		</p>

		<button class="button btn-b" onclick={() => (showSubmissionForm = true)}>
			Let's do it
		</button>
	</div>
{:else}
	<div class="card" transition:slide>
		<p>
			Submissions for
			<strong style:color="var(--brand-a)">SvelteHack 2024</strong>
			<sup>runes-edition</sup> are closed. Thanks to everyone who entered.
			Keep an eye on the <a href="/2024/winners">winners</a> page, to see
			what incredible projects have won this year! You can also join us on
			<a href="https://svelte.dev/chat">Discord</a> to chat with fellow
			community members, and learn about any future events.
		</p>
	</div>
{/if}

<div class="br-xl"></div>
