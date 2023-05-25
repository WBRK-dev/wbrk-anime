<script>
    import { onMount } from 'svelte';
    import Iframe from "./videoview.svelte";
    import AnimeDetails from "./animedetails.svelte";
    import EpisodeList from "./episodelist.svelte";
    import EpisodeControls from "./episodecontrols.svelte";
    import Malcontroller from './malcontroller.svelte';

    export let data;

    /**@type {any}*/let animeDetails = {};
    /**@type {any}*/let animeStreamLinks = [];
    /**@type {string}*/let streamUrl = "";
    /**@type {any}*/let episodeButtons = [];
    /**@type {any}*/let streamButtons = [];
    /**@type {number}*/let currentEpisode = 0;
    /**@type {string}*/let currentStreamName = "Vidstreaming";

    onMount(() => {
        fetch(`https://api.consumet.org/anime/gogoanime/info/${data.slug}`)
        .then(r => r.json())
        .then(r => {
            animeDetails = r;
            fetch(`https://api.consumet.org/anime/gogoanime/servers/${data.slug}-episode-1`)
            .then(r => r.json())
            .then(r => {
                animeStreamLinks = r;
                streamUrl = r[0].url;
                currentEpisode = 1;
                changeEpisodeButtonsStyle(0);
                changeStreamButtonsStyle(currentStreamName);
            });
        });
    });

    /**@param {any} event*/
    async function changeEpisode(event) {
        changeEpisodeButtonsStyle(false);
        // TODO - Change video on episode event.

        let responseT = await fetch(`https://api.consumet.org/anime/gogoanime/servers/${data.slug}-episode-${event.detail.number+1}`);
        let responseJ = await responseT.json();
        streamUrl = responseJ[0].url;

        currentEpisode = event.detail.number + 1;
        changeEpisodeButtonsStyle(event.detail.number);
    }

    /**@param {number | boolean} i*/
    function changeEpisodeButtonsStyle(i) {
        for (let j = 0; j < episodeButtons.length; j++) {
            episodeButtons[j].style.backgroundColor = "#353535";
        }
        if (typeof i === 'number') {
            episodeButtons[i].style.backgroundColor = "#494949";
        }
    }

    /**@param {any} event*/
    function changeStream(event) {
        changeStreamButtonsStyle(false);
        // TODO - Change video on stream event.


        changeStreamButtonsStyle(event.detail.stream);
        console.log(event.detail.stream);
    }

    /**@param {number | string | boolean} i*/
    function changeStreamButtonsStyle(i) {
        for (let j = 0; j < streamButtons.length; j++) {
            streamButtons[j].classList.remove("active");
        }
        if (typeof i === "number") {
            streamButtons[i].classList.add("active");
        } else if (typeof i === 'string') {
            let found = false;
            for (let j = 0; j < streamButtons.length; j++) {
                if (streamButtons[j].innerHTML === i) {
                    found = true;
                    streamButtons[j].classList.add("active");
                }
            }
            if (!found) {
                streamButtons[0].classList.add("active");
            }
        }
    }
</script>

<main>
    <div class="width">
        <div class="row">
            <Iframe url={streamUrl}/>
            <EpisodeControls episodeLinks={animeStreamLinks} streamButtons={streamButtons} episode={currentEpisode} on:streamchange={changeStream}/>
            <Malcontroller/>
        </div>
        <div class="row">
            <AnimeDetails details={animeDetails}/>
            <EpisodeList episodes={animeDetails.episodes} bind:episodeButtons on:episode={changeEpisode}/>
        </div>
    </div>
</main>


<style>
    main {
        display: flex;
        justify-content: center;
        padding: 10px 30px 10px 10px;
    }
    .width {
        width: min(100%, 1200px);
        display: grid; gap: 20px;
        grid-template-columns: 70% 30%;
    }

    .row {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }


    @media only screen and (max-width: 900px) {
        main {
            padding: 10px;
        }

        .width {
            grid-template-columns: 1fr !important;
            gap: 10px;
        }

        .row {
            gap: 10px;
        }

        .row:nth-of-type(2) {
            flex-direction: column-reverse !important;
        }
    }
</style>