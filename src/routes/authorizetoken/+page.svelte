<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import Spinner from '../../components/spinner.svelte';
    import { onMount } from 'svelte';
    
    let authorizationtoken = $page.url.searchParams.get('code');
    let accesstoken = "Logged In"; let userinfo = {"name": "Username", "watching": 0, "completed": 0, "num_days_watched": 0}

    onMount(async () => {
        const response = await fetch("https://wbrk-anime-api.vercel.app/api/authorize?code="+authorizationtoken, {credentials: "include"});
        if (response.status === 200) {
            console.log(response);
            let json = await response.json();
            if (json.succesfull) {
                accesstoken = "Logged In"
                let userinfoR = await fetch("https://wbrk-anime-api.vercel.app/api/user/info", {credentials: "include"});
                let userinfoJ = await userinfoR.json();
                console.log(userinfoJ);
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
        {:else if accesstoken === "Logged In"}
            <div class="userinfo">
                <p class="title">{userinfo.name}</p>
                <p class="data">Completed Anime: <span>{userinfo.completed}</span></p>
                <p class="data">Watching Anime: <span>{userinfo.watching}</span></p>
                <p class="data">Days Watched: <span>{userinfo.num_days_watched}</span></p>
                <a href="/">Home</a>
            </div>
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

    .userinfo {
        display: flex;
        flex-direction: column;
        gap: 5px; box-sizing: border-box;
        padding: 10px;
        text-align: center;
        height: 100%;
    }

    .userinfo .title {
        font-size: 20px;
        font-weight: 700;
        margin: 15px 0;
    }

    .userinfo a {
        margin: auto 0 0 0;

        background-color: blue;
        color: #fff; text-decoration: none;
        border-radius: 5px; font-size: 18px;
        padding: 6px 0;
    }
</style>