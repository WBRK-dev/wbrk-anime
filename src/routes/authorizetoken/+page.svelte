<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import Spinner from '../../components/spinner.svelte';
    import { onMount } from 'svelte';
    
    let authorizationtoken = $page.url.searchParams.get('code');
    let accesstoken = ""; let refreshtoken = ""; let code_verifier = "";
    if (browser) {
        code_verifier = localStorage.getItem("code_verifier") || "";
    }

    onMount(async () => {
        const response = await fetch("localhost:8088/accesstoken/authorize?code="+authorizationtoken);
        let json = await response.json();
        console.log(json);
    })
</script>

<main>
    <div class="dialog">
        {#if accesstoken === ""}
            <div class="spinner"><Spinner/></div>
        {:else}
            {accesstoken}
        {/if}
    </div>
</main>

<style>
    main {
        display: grid;
        place-items: center;
        height: calc(100dvh - 51px);
    }

    .spinner {display: grid; place-items: center; height: 100%;}

    .dialog {
        background-color: rgb(224, 224, 224);
        width: 300px; height: 400px;
        border: 1px solid #b3b3b3;
        border-radius: 10px;
    }
</style>