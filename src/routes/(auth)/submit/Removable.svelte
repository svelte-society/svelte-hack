<script lang="ts">
	import { slide, scale } from 'svelte/transition'
	import type { Snippet } from 'svelte'

	let { open = $bindable(false), disabled = false, children }: {
		disabled?: boolean;
		open?: boolean;
		children: Snippet;
	} = $props()
</script>

{#if open}
	<div transition:slide|local={{ duration: 250 }} class="removable">
		{@render children()}

		{#if !disabled}
			<button
				transition:scale|local={{ duration: 200, delay: 200 }}
				class="close"
				title="remove author"
				aria-label="remove author"
				type="button"
				onclick={() => (open = !open)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					fill="none"
					viewBox="0 0 26 26"
				>
					<circle cx="13" cy="13" r="12" fill="var(--bg-a)" />
					<path
						class="x"
						stroke="var(--fg-d)"
						stroke-linecap="round"
						stroke-width="1"
						d="m8 8 10 10m0-10L8 18"
					/>
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	.removable {
		overflow: visible;
		position: relative;
		margin-top: 0.8rem;
		width: 100%;
	}

	.close {
		all: unset;

		position: absolute;
		top: -0.5rem;
		right: -0.5rem;

		height: 1.1rem;
		width: 1.1rem;
		margin: auto;

		font-family: monospace;
		font-size: 0.75rem;

		cursor: pointer;
	}

	.close:hover .x {
		stroke: tomato;
	}
</style>
