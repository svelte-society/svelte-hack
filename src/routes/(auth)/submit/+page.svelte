<script lang="ts">
	import Preferences from './Preferences.svelte'
	import Submission from './Submission.svelte'
	import { SUBMISSIONS_OPEN } from '$lib/vars'
	import { slide } from 'svelte/transition'
	import '../../../styles/inputs.scss'

	const { data } = $props()

	let showSubmissionForm = $state(!!data.submission)
</script>

{#if !SUBMISSIONS_OPEN}
	<div class="card" transition:slide>
		<p>
			Submissions for
			<span class="sveltehack">SvelteHack</span> <span class="year">2024</span>
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
	<Submission submission={data.submission || {}} isSubmitter={data.isSubmitter} />

	<div class="br-lg"></div>
	<Preferences />
{:else if SUBMISSIONS_OPEN}
	<div transition:slide>
		<div class="br-md"></div>

		<p class="above-text">
			Welcome to
			<span class="sveltehack">SvelteHack</span>
			<span class="year">2024</span><!-- <sup>runes-edition</sup>-->
		</p>

		<div class="br-md"></div>

		<h2 class="before-submit center">Before Submitting</h2>

		<div class="br-sm"></div>

		<div class="card">
			<ul>
				<li>
					Read the <a href="/2024/rules">rules</a>.
				</li>

				<li>
					Join us on the <a href="https://svelte.dev/chat">Svelte Discord</a>
					<sup>(if you want to)</sup>
				</li>

				<li>
					For teams, choose <strong>one</strong> member to submit on behalf of the group.
				</li>
			</ul>
		</div>

		<div class="br-md"></div>

		<p class="center">When you're ready, click below to create your submission!</p>

		<div class="br-md"></div>

		<button class="btn-b" onclick={() => (showSubmissionForm = true)}> Let's do this! </button>
	</div>
{/if}

<div class="br-xl"></div>

<style lang="scss">
	sup {
		color: var(--fg-d);
	}

	.center {
		text-align: center;
	}

	.before-submit {
		font-size: var(--font-md);
		margin-top: -0.5rem;
		font-variation-settings:
			'wght' 500,
			'wdth' 95;
	}

	.card {
		max-width: min(var(--max-w), 95vw);
		box-shadow: var(--shadow);
		background: none;
	}

	.above-text {
		position: relative;

		width: fit-content;
		margin: 0 auto;

		box-shadow: none;

		overflow: visible;

		text-align: center;
		text-wrap: balance;
		font-size: var(--font-lg);
	}

	.sveltehack {
		font-family: var(--font-b) !important;
		color: var(--theme-a);
		font-variation-settings:
			'wght' 500,
			'wdth' 105;
	}

	.year {
		color: var(--theme-a);
		font-family: var(--font-b) !important;
		font-variation-settings:
			'wght' 200,
			'wdth' 105;
	}

	ul {
		padding-left: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	button {
		width: fit-content;
		margin: 0 auto;
	}
</style>
