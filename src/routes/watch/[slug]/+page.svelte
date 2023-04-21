<script>
    import { onMount } from "svelte";
    /**@type {any}*/
    export let data;
    /**@type {any}*/
    let animeDetails = {};
    /**@type {any}*/
    let streams = [{url: ""}];
    let streamButtons;


    onMount(() => {
        fetch(`https://api.consumet.org/anime/gogoanime/info/${data.slug}`)
        .then(r => r.json())
        .then(json => {
            console.log(json);
        })

        fetch(`https://api.consumet.org/anime/gogoanime/servers/${data.slug}-episode-1`)
        .then(r => r.json())
        .then(json => {
            streams = json;
        })
    })

    
</script>

<main>
    <div class="content">
        <div class="stream">
            <iframe src="{streams[0].url}" title="Anime WebView" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts"></iframe>
            <div class="controls"><p>Previous</p><p>Next</p></div>
        </div>
        <div class="servers">
            <p class="title">Available Servers:</p>
            <div id="servers">
                {#each streams as stream}
                    <p id="server" bind:this={streamButtons}>{stream.name}</p>
                {/each}
            </div>
        </div>
    </div>
</main>


<style>
    main {
        padding: 10px;

        display: flex;
        justify-content: center;
    }

    .content {
        width: min(1000px, 100%);

        display: flex;
        flex-direction: column;
        gap: 10px;
    }





    .stream {
        overflow: hidden;
        border-radius: 10px;
    }

    iframe {
        background-color: #000;
        width: 100%;
        aspect-ratio: 16/9;
        display: block;
    }

    .stream .controls {
        background-color: #1a1a1a;
        width: 100%;
        padding: 0 10px;
        color: #fff;

        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .stream .controls > * {
        padding: 6px 10px;
        cursor: pointer;
    }




    .servers {
        background-color: #000;
        border-radius: 10px;
        color: #fff;
        overflow: hidden;
    }

    .servers .title {
        padding: 4px 10px;
        width: 100%;
        box-sizing: border-box;
    }

    .servers #servers {
        background-color: #1a1a1a;
        padding: 10px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .servers #servers #server {
        padding: 4px 6px;
        border-radius: 4px;
        background-color: #424242;
        cursor: pointer;
    }
</style>