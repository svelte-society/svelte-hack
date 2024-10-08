<script lang="ts">
	import Mobile from './Mobile/Mobile.svelte'
	import { mobile, OnMount } from 'fractils'
	import Desktop from './Desktop.svelte'
	import { setContext } from 'svelte'

	let showMenu = false

	setContext('links', [
		['/', 'Home'],
		['/2024/prizes', 'Prizes'],
		['/2024/rules', 'Rules'],
		['/2024/winners', 'Winners'],
	])
</script>

<OnMount>
	{#if $mobile}
		<Mobile bind:showMenu />
	{:else}
		<Desktop />
	{/if}
</OnMount>
