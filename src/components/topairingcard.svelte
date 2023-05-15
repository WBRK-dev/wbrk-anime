<script>
    import Spinner from "./spinner.svelte";
    /**@type {any}*/
    export let topAiringAnime;
    let selectedAnime = Math.random();
    console.log(topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)]);
</script>

<hero>
    {#if topAiringAnime.length > 0}
    <div class="content">
        <div class="info">
            <p class="title">{topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].title}</p>
            <p class="id">Released: {topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].releaseDate}</p>
            <div class="flex">
                {#each topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].genres as genre}
                    <p class="tag">{genre}</p>
                {/each}
            </div>
            {#if topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].subOrDub !== undefined}
            <div class="flex"><p class="tag">
                {topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].subOrDub.toUpperCase()}
            </p></div>
            {/if}
            <div class="buttonbox">
                <a href="watch/{topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].id}">Watch</a>
            </div>
        </div>
        <img src="{topAiringAnime[Math.floor((topAiringAnime.length - 1) * selectedAnime)].image}" alt="">
    </div>
    {:else}
    <div class="spinner"><Spinner/></div>
    {/if}
</hero>


<style>
    hero {
        padding: 10px;
        background-color: #0000001e;
        box-sizing: border-box;
        border-radius: 10px;
        width: 100%;
        min-height: 250px;
        aspect-ratio: 5/1;

        display: flex;
        justify-content: center;
    }

    hero .content {
        width: min(1000px, 100%);
        display: flex;
    }

    hero img {
        margin-left: auto;
        border-radius: 4px;
        height: 100%;
        display: block;
    }

    hero .info {
        display: flex;
        flex-direction: column;
    }

    hero .title {
        font-weight: 700;
        font-size: 24px;
    }

    hero .info .buttonbox {
        margin-top: auto;
    }

    hero .info a {
        font-size: 18px;
        color: #fff;
        text-decoration: none;
        padding: 4px 16px;

        display: block;
        
        border: none;
        border-radius: 50px;
        background-color: blue;
    }

    hero .spinner {
        height: 100%;
        display: grid;
        place-items: center;
    }

    hero .flex {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        margin-top: 10px;
    }

    hero .tag {
        border: 1px solid #808080;
        border-radius: 50px;
        background-color: #a8a8a8;
        padding: 4px 8px;
    }
</style>