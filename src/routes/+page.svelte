<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import HeroCard from "../components/topairingcard.svelte";
    import AnimeCard from "../components/animecard.svelte";
    import AnimeCardSkel from "../components/animecardskeleton.svelte";
    let code = "this-is-bs-and-i-hate-this-part-so-just-make-something-really-massive";
    /**@type {any}*/
    export let data;
    /**@type {Array<string> | any[]}*/
    let topAiringAnime = [];
    /**@type {Array<string> | any[]}*/
    let topAiringAnimeTemp = [];
    /**@type {any}*/
    let watchingAnime = [];
    /**@type {Array<string> | any[]}*/
    let recentEpisodes = [];
    let impMessage = "none";
    
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
        }).catch(err => {impMessage = "block"})

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

        fetch("https://wbrk-anime-api.vercel.app/api/list/get", {credentials: "include"})
        .then(r => r.json()).then(r => {
            if (r.error) {watchingAnime = false; return;}
            for (let i = 0; i < r.data.length; i++) {
                watchingAnime.push({
                    id: r.data[i].node.id,
                    title: r.data[i].node.title,
                    image: r.data[i].node.main_picture.medium,
                    status: r.data[i].list_status.status,
                    epsWatched: r.data[i].list_status.num_episodes_watched
                })
            }
        })
        .catch(err => {watchingAnime = false})
        

    });

</script>

<main>
    <div class="impMessage" style="display: {impMessage};">Some important services are offline. <a href="/status">WBRK Anime Status</a></div>

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
    <section>
        <p class="title">Continue Watching</p>
        {#if watchingAnime.length > 0 && watchingAnime !== false}
            <animewrapper>
                {#each watchingAnime as anime}
                    {#if anime.status === "watching"}
                        <AnimeCard id={anime.id} title={anime.title} img={anime.image} subOrDub="Ep {String(anime.epsWatched)}" releaseDate=""/>
                    {/if}
                {/each}
            </animewrapper>
        {:else if watchingAnime.length === 0 && watchingAnime !== false}
            <animewrapper>
                {#each {length: 16} as _, i}
                    <AnimeCardSkel/>
                {/each}
            </animewrapper>
        {:else}
            <div class="show">
                <p class="title">Login with My Anime List to create your watch history.</p>
                <a href='https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=fb5613df0f39524a295b0d1d7a6213ca&code_challenge={code}'>Login With MAL</a>
            </div>
        {/if}
    </section>
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

    .impMessage {text-align: center;}

    animewrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-template-rows: 1fr;
        grid-auto-rows: 0;

        width: calc(100% + 10px);
        margin-left: -10px;
        margin-top: -10px;
    }

    .show {
        padding: 40px 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .show .title {
        font-size: 22px;
        font-weight: 700;
        text-align: center;
    }

    .show a {
        background-color: blue;
        color: #fff; text-decoration: none;
        padding: 10px 14px;
        border-radius: 8px;

        animation: shadow 2s infinite;
    }

    @keyframes shadow {
        0% {box-shadow: 0 0 15px #0000ff75;}
        50% {box-shadow: 0 0 15px #0000ff;}
        100% {box-shadow: 0 0 15px #0000ff75;}
    }
    .show a:focus {animation: pressed 1000ms forwards;}
    @keyframes pressed {
        0% {transform: scale(1); box-shadow: 0 0 0px #0000ff; background-color: #0000ff;}
        50% {transform: scale(0.95); box-shadow: 0 0 200px 50px #0000ff; background-color: #868686;}
        100% {transform: scale(0.95); box-shadow: 0 0 200px 50px #0000ff00; background-color: #868686;}
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