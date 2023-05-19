<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import Spinner from '../../components/spinner.svelte';
    import { onMount } from 'svelte';
    
    let authorizationtoken = $page.url.searchParams.get('code');
    let accesstoken = "";

    onMount(async () => {
        const response = await fetch("https://fair-red-agouti-robe.cyclic.app/authorize?code="+authorizationtoken);
        if (response.status === 200) {
            console.log(response);
            let json = await response.json();
            if (json.succesfull) {
                accesstoken = "Logged In"
            } else {
                accesstoken = "Failed to login"
            }
        }
    })
</script>

<main>
    <div class="dialog">
        {#if accesstoken === ""}
            <div class="spinner"><Spinner/></div>
        {:else}
            <div class="spinner">{accesstoken}</div>
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