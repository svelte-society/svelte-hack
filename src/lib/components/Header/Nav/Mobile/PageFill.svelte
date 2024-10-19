<script>
	export let showMenu = false
</script>

<div class="page-fill" class:showMenu></div>

<style>
	.page-fill {
		position: fixed;
		top: 0.5rem;
		right: 1rem;

		width: 50px;
		height: 50px;

		background-color: var(--bg-a);
		border-radius: 100%;
		border: 0.1px solid var(--bg-c);
		opacity: 1;

		transform: scale(0.01);
		transition:
			transform 0.5s cubic-bezier(0.07, 1.05, 0.56, 0.91),
			opacity 0.5s ease-out;

		pointer-events: none;
		z-index: 20;
	}

	.showMenu {
		opacity: 1;
		transform: scale(42);
		transition:
			transform 1s cubic-bezier(0.2, 0.25, 0, 1),
			opacity 0.5s ease;
	}
</style>
