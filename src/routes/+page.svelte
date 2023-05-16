<script>
    import { onMount } from "svelte";
    import HeroCard from "../components/topairingcard.svelte";
    import AnimeCard from "../components/animecard.svelte";
    import AnimeCardSkel from "../components/animecardskeleton.svelte";
    import Spinner from "../components/spinner.svelte";
    /**@type {Array<string> | any[]}*/
    let topAiringAnime = [];
    /**@type {Array<string> | any[]}*/
        let topAiringAnimeTemp = [];
    /**@type {Array<string> | any[]}*/
    let watchingAnime = [];
    /**@type {Array<string> | any[]}*/
    let recentEpisodes = [];
    
    onMount(async () => {
        fetch("https://api.consumet.org/anime/gogoanime/top-airing")
        .then(response => response.json())
        .then(json => {
            topAiringAnimeTemp = json.results;
            fetch("https://api.consumet.org/anime/gogoanime/top-airing?page=2")
            .then(response => response.json())
            .then(json => {
                for (let i = 0; i < json.results.length; i++) {
                    topAiringAnimeTemp.push(json.results[i]);
                }
                topAiringAnime = topAiringAnimeTemp;
                for (let i = 0; i < topAiringAnime.length; i++) {
                    fetch(`https://api.consumet.org/anime/gogoanime/info/${topAiringAnime[i].id}`)
                    .then(response => response.json())
                    .then(data => {
                        topAiringAnime[i].subOrDub = data.subOrDub;
                        topAiringAnime[i].totalEpisodes = data.totalEpisodes;
                        topAiringAnime[i].releaseDate = data.releaseDate;
                    })
                }
            })
        })

        fetch("https://api.consumet.org/anime/gogoanime/recent-episodes")
        .then(response => response.json())
        .then(json => {
            recentEpisodes = json.results;
            fetch("https://api.consumet.org/anime/gogoanime/recent-episodes?page=2")
            .then(response => response.json())
            .then(json => {
                for (let i = 0; i < json.results.length; i++) {
                    recentEpisodes.push(json.results[i]);
                }
                for (let i = 0; i < recentEpisodes.length; i++) {
                    fetch(`https://api.consumet.org/anime/gogoanime/info/${recentEpisodes[i].id}`)
                    .then(response => response.json())
                    .then(data => {
                        recentEpisodes[i].subOrDub = data.subOrDub;
                        recentEpisodes[i].totalEpisodes = data.totalEpisodes;
                        recentEpisodes[i].releaseDate = data.releaseDate;
                    })
                }
            })
        })
        

    });

</script>

<main>
    <HeroCard topAiringAnime={topAiringAnime}/>

    <section id="popular">
        <p class="title">Popular Anime</p>
        <animewrapper>
                {#if topAiringAnime.length > 0}
                    {#each topAiringAnime as anime}
                        <AnimeCard id={anime.id} title={anime.title} img={anime.image} subOrDub={anime.subOrDub} releaseDate={anime.releaseDate} />
                    {/each}
                {:else}
                    {#each {length: 16} as _, i}
                        <AnimeCardSkel/>
                    {/each}
                {/if}
        </animewrapper>
    </section>
    {#if watchingAnime.length > 0}
    <section>
        <p class="title">Continue Watching</p>
        <animewrapper>
            {#each watchingAnime as anime}
                <AnimeCard id={anime.id} title={anime.title} img={anime.image} subOrDub={anime.subOrDub} releaseDate=""/>
            {/each}
        </animewrapper>
    </section>
    {/if}
    <section>
        <p class="title">Recent Episodes</p>
        <animewrapper>
                {#if recentEpisodes.length > 0}
                    {#each recentEpisodes as anime}
                            <AnimeCard id={anime.id} title={anime.title} img={anime.image} subOrDub={anime.subOrDub} releaseDate={anime.releaseDate}/>
                    {/each}
                {:else}
                    {#each {length: 16} as _, i}
                        <AnimeCardSkel/>
                    {/each}
                {/if}
        </animewrapper>
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    section > .title {
        font-weight: 700;
    }

    animewrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-template-rows: 1fr;
        grid-auto-rows: 0;

        width: calc(100% + 10px);
        margin-left: -10px;
        margin-top: -10px;
    }

    .spinner {
        padding: 10px;
    }
    


    @media only screen and (max-width: 800px) {
        animewrapper {
            grid-template-rows: repeat(2, 1fr);
        }
    }

    @media only screen and (max-width: 650px) {
        animewrapper {
            grid-template-rows: repeat(3, 1fr);
        }
    }
</style>