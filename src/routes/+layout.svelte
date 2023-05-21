<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import Searchbar from "../components/searchbar.svelte";

    let code = "this-is-bs-and-i-hate-this-part-so-just-make-something-really-massive";
    let loggedin = false;
    onMount(() => {
        fetch("https://wbrk-anime-api.vercel.app/api/list/get", {credentials: "include"}).then(r => r.json()).then(r => {if (!r.error) {loggedin = true}});
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="/wbrk.css/wbrk.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <title>WBRK Anime</title>
</svelte:head>

<body>
    <header>
        <a class="title" href="/">WBRK Anime</a>
        <!-- <Searchbar/> -->
        <div class="right">
            <a href="/watch">Featured</a>
        </div>
        {#if !loggedin}
            <a href='https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=fb5613df0f39524a295b0d1d7a6213ca&code_challenge={code}'>Login</a>
        {:else}
            <a href='account/'>Account</a>
        {/if}
    </header>
    <slot></slot>
</body>

<style>
    header {
        position: relative;
        padding-right: 15px;
    }

    header .title {
        color: #000;
        text-decoration: none;
    }

    header a {
        color: #000;
        text-decoration: none;
        display: block;

        padding: 4px 10px;
        border-radius: 50px;
    }

    header a:hover {
        background-color: #0000001e;
    }
</style>