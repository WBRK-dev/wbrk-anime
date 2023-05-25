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
            });
        });
    });

    /**
     * @param {Number} i
     */
    function changeEpisode(i) {
        console.log(i);
    }
</script>

<main>
    <div class="width">
        <div class="row">
            <Iframe url={streamUrl}/>
            <EpisodeControls episodeLinks={animeStreamLinks}/>
            <Malcontroller/>
        </div>
        <div class="row">
            <AnimeDetails details={animeDetails}/>
            <EpisodeList episodes={animeDetails.episodes} bind:episodeButtons/>
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