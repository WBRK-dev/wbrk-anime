<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import Spinner from '../../components/spinner.svelte';
    import { onMount } from 'svelte';
    
    let authorizationtoken = $page.url.searchParams.get('code');
    let accesstoken = ""; let refreshtoken = ""; let code_verifier = "";
    if (browser) {
        // code_verifier = localStorage.getItem("code_verifier") || "jfdkslhfsdjkfheiahjdkfhdjfeiuahjvnjdhfafhejknvndhsafdjsabnfndjhieopahi";
        code_verifier = "jfdkslhfsdjkfheiahjdkfhdjfeiuahjvnjdhfafhejknvndhsafdjsabnfndjhieopahi";
    }

    onMount(async () => {
        const response = await fetch("https://myanimelist.net/v1/oauth2/token?client_id=fb5613df0f39524a295b0d1d7a6213ca&client_secret=6a5608848f4b676ccc737203f6dd56322505706bb3a457e52c342125be0fd393&grant_type=authorization_code&code="+authorizationtoken+"&code_verifier=", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({client_id: "fb5613df0f39524a295b0d1d7a6213ca", client_secret: "6a5608848f4b676ccc737203f6dd56322505706bb3a457e52c342125be0fd393", grant_type: "authorization_code", code: authorizationtoken, code_verifier: ""}),
        });
        let json = await response.json();
        accesstoken = json.access_token;
        refreshtoken = json.refresh_token;
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