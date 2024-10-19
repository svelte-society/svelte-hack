<script lang="ts">
	import { device } from '$lib/utils/device.svelte'
	import Mobile from './Mobile/Mobile.svelte'
	import Desktop from './Desktop.svelte'
	import { setContext } from 'svelte'

	let showMenu = false

	setContext('links', [
		['/2024', 'Home'],
		['/2024/prizes', 'Prizes'],
		['/2024/rules', 'Rules'],
		['/2024/winners', 'Winners'],
	])
</script>

{#if device.mobile}
	<Mobile bind:showMenu />
{:else}
	<Desktop />
{/if}
