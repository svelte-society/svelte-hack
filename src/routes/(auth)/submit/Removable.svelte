<script lang="ts">
	import { slide, scale } from 'svelte/transition';

	export let open = false;
</script>

{#if open}
	<div transition:slide|local={{ duration: 250 }} class="removable">
		<slot />

		<button
			transition:scale|local={{ duration: 200, delay: 200 }}
			class="close"
			title="remove author"
			type="button"
			on:click={() => (open = !open)}
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
	</div>
{/if}

<style>
	.removable {
		position: relative;
		margin-top: 0.8rem;

		overflow: visible;
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
