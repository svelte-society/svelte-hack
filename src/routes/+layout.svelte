<script lang="ts">
	import 'greset/greset.css'
	import '../styles/app.scss'

	import { browser } from '$app/environment'
	import { page } from '$app/stores'

	import Header from '$lib/components/Header/Header.svelte'
	import { themer } from '$lib/themer/themer.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { pageTitle } from '$lib/utils/pageTitle'
	import { Fractils } from 'fractils'
	import { parse } from 'cookie'

	let title = $derived.by(() => pageTitle($page.url.pathname))

	// Keeps the theme cookie in sync
	$effect(() => {
		if (themer.mode !== parse(document.cookie).theme && browser) {
			document.cookie = `theme=${themer.mode}`
		}
	})
</script>

<svelte:head>
	<title>
		Svelte Hack · {title}
	</title>
</svelte:head>

<Fractils />

<Header />

<div class="br-lg"></div>

<!-- svelte-ignore slot_element_deprecated -->
<slot />

<Footer />
