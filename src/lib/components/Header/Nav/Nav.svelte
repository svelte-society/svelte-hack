<script lang="ts">
	import { device } from '$lib/utils/device.svelte'
	import Mobile from './Mobile/Mobile.svelte'
	import Desktop from './Desktop.svelte'
	import { page } from '$app/state'

	let showMenu = $state(false)

	let year = $derived(page.url.pathname.startsWith('/2023') ? '2023' : '2024')

	let links: [string, string][] = $derived([
		[`/${year}`, 'Home'],
		[`/${year}/prizes`, 'Prizes'],
		[`/${year}/rules`, 'Rules'],
		[`/${year}/winners`, 'Winners'],
	])
</script>

{#if device.mobile}
	<Mobile bind:showMenu {links} />
{:else}
	<Desktop {links} />
{/if}
