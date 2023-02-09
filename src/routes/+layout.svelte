<script lang="ts">
	import 'greset/greset.css'
	import '../styles/app.scss'

	import { browser } from '$app/environment'
	import { Fractils, theme } from 'fractils'
	import { Header } from '$lib/components'
	import { pageTitle } from '$lib/utils'
	import { page } from '$app/stores'
	import { parse } from 'cookie'

	$: title = pageTitle($page.url.pathname)

	// Keeps the theme cookie in sync
	$: if (browser && $theme !== parse(document.cookie).theme) {
		document.cookie = `theme=${$theme}`
	}
</script>

<svelte:head>
	<title>
		Svelte Hack · {title}
	</title>
</svelte:head>

<Fractils />

<Header />

<div class="br-lg" />

<slot />
