<script lang="ts">
	import { setContext } from 'svelte'
	import { mobile } from 'fractils'

	import Mobile from './Mobile/Mobile.svelte'
	import Desktop from './Desktop.svelte'

	let showMenu = false

	setContext('links', [
		['/', 'Home'],
		['/prizes', 'Prizes'],
		['/rules', 'Rules'],
		['/winners', 'Winners']
	])
</script>

{#if $mobile}
	<Mobile bind:showMenu />
{:else}
	<Desktop />
{/if}
