<script lang="ts">
	import 'greset/greset.css'
	import '../styles/app.scss'

	import Header from '$lib/components/Header/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { pageTitle } from '$lib/utils/pageTitle'
	import { Fractils } from 'fractils'
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>
		SvelteHack · {pageTitle($page.url.pathname)}
	</title>
</svelte:head>

<Fractils />

<Header />

<div class="br-lg"></div>

<!-- svelte-ignore slot_element_deprecated -->
<slot />

<Footer />
