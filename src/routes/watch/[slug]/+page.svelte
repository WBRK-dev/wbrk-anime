<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    /**@type {any}*/
    export let data;
    /**@type {any}*/
    let animeDetails = {"episodes":[]};
    /**@type {any}*/
    let streams = [{},[{url: ""}]];
    /**@type {any}*/
    let streamButtons = [];
    /**@type {any}*/
    let episodeButtons = [];
    /**@type {any}*/
    let episodeDisplay;


    let userdata = {watching: [], search: [], saved: []};
    if (browser) {
        // @ts-ignore
        if (localStorage.getItem("userdata") !== null) {userdata = JSON.parse(localStorage.getItem("userdata"))};
        console.log(userdata);
    }


    onMount(() => {
        fetch(`https://api.consumet.org/anime/gogoanime/info/${data.slug}`)
        .then(r => r.json())
        .then(async json => {
            animeDetails = json;

            let notFound = true;
            if (userdata.watching.length > 0) {
                for (let i = 0; i < userdata.watching.length; i++) {
                    if (userdata.watching[i].id === data.slug) {
                        notFound = false;
                        updateStream(userdata.watching[i].ep);
                    }
                }
            }

            if (notFound) {
                updateStream(1);
            }
        })
    })


    /**@param {number} ep*/
    async function updateStream(ep) {
        fetch(`https://api.consumet.org/anime/gogoanime/servers/${data.slug}-episode-${ep}`)
        .then(r => r.json())
        .then(async json => {
            setStreamButtons(0)
            streams[1] = json;
            streams[0].url = streams[1][0].url;
            
            for (let j = 0; j < episodeButtons.length; j++) {
                episodeButtons[j].style.backgroundColor = "";
            }
            episodeButtons[ep-1].style.backgroundColor = "#666666";
        })

        episodeDisplay.innerText = ep;

        // TODO - Save watching episode
        /**@type {any}*/
        let updatedUserdata = userdata;
        if (browser) {
            console.log(updatedUserdata);
            updatedUserdata.watching = [{"id":data.slug, "ep":ep}];
            console.log(updatedUserdata);
            if (userdata.watching.length > 0) {
                for (let i = 0; i < userdata.watching.length; i++) {
                    console.log(userdata.watching[i].id);
                    if (userdata.watching[i].id !== data.slug) {
                        updatedUserdata.watching.push({
                            id: userdata.watching[i].id,
                            ep: userdata.watching[i].ep
                        })
                    }
                }
            }
        }

        userdata = updatedUserdata;
        if (browser) {
            localStorage.setItem("userdata", JSON.stringify(userdata));
        }
    }

    /**@param {string | number} i*/
    function changeServer(i) {
        streams[0].url = streams[1][i].url;
        
        setStreamButtons(i);
    }

    /**@param {string | number} i*/
    function setStreamButtons(i) {
        for (let j = 0; j < streamButtons.length; j++) {
            if (streamButtons[j] !== null) {
                streamButtons[j].style.backgroundColor = "";
            }
        }
        streamButtons[i].style.backgroundColor = "#666666";
    }
    
</script>

<main>
    <div class="content">
        <div class="stream">
            <iframe src="{streams[0].url}" title="Anime WebView" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts"></iframe>
            <div class="controls"><p>Previous</p><p>Next</p></div>
        </div>
        <div class="episode"><p>You are watching episode <span bind:this={episodeDisplay}>0</span></p></div>
        <div class="servers">
            <p class="title">Available Servers:</p>
            <div id="servers">
                {#each streams[1] as stream, i}
                    <p id="server" on:click={() => changeServer(i)} on:keyup={() => changeServer(i)} bind:this={streamButtons[i]}>{stream.name}</p>
                {/each}
            </div>
        </div>
        <div class="episodes">
            {#each animeDetails.episodes as episode, i}
                <p on:click={() => updateStream(i+1)} on:keyup={() => updateStream(i+1)} bind:this={episodeButtons[i]}>{episode.number}</p>
            {/each}
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




    .episode {
        background-color: #000;
        border-radius: 10px;
        padding: 20px 10px;
        color: #fff;
        overflow: hidden;
    }

    .episode p {
        text-align: center;
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


    .episodes {
        background-color: #000;
        border-radius: 10px;
        color: #fff;
        overflow: hidden auto;
        padding: 10px;

        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        max-height: 300px;
    }

    .episodes p {
        background-color: #424242;
        border-radius: 4px;
        min-width: 50px; max-width: 65px; height: 30px;
        flex: 1 0 0;

        display: grid; place-items: center;
        cursor: pointer;
    }
</style>