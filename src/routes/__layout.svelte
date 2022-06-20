<script lang="ts">
	import { Header } from '$lib/components'
	import { pageTitle } from '$lib/utils'
	import { Fractils } from 'fractils'
	import { page } from '$app/stores'
	import 'greset/css/greset.css'
	import '../styles/app.scss'

	$: title = pageTitle($page.url.pathname)
</script>

<svelte:head>
	<title>
		Svelte Hack · {title}
	</title>
</svelte:head>

<Fractils />

<Header />

<slot />
