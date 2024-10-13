<script lang="ts">
	import Submission from './Submission.svelte'
	import { slide } from 'svelte/transition'

	export let data
	export let form

	let showSubmissionForm = !!data.submission;
</script>

{#if showSubmissionForm}
	<Submission submission={data.submission || {}} user={data.user!} {form} />
{:else}
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
{/if}

<div class="br-xl"></div>
