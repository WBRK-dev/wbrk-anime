<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import Searchbar from "../components/searchbar.svelte";

    let accesstoken = ""; let code = ""
    if (browser) {
        accesstoken = localStorage.getItem("accesstoken") || "";
        if (localStorage.getItem("code_verifier") === null) {
            let letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H",
            "I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            while (code.length < 50) {
                code = code + letters[Math.floor(letters.length * Math.random())];
            }
            localStorage.setItem("code_verifier", code);
        } else {
            code = localStorage.getItem("code_verifier") || "";
        }
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/wbrk.css/wbrk.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <title>WBR_K Anime</title>
</svelte:head>

<body>
    <header>
        <a class="title" href="/">WBR_K Anime</a>
        <!-- <Searchbar/> -->
        <div class="right">
            <a href="/watch">Featured</a>
        </div>
        {#if accesstoken === ""}
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