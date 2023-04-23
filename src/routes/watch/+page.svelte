<script>
    import { onMount } from "svelte";
    /**@type {any}*/
    let anime = [{},{},{}];

    onMount(() => {
        fetch("https://api.consumet.org/meta/anilist/trending")
        .then(r => r.json())
        .then(json => {
            let count = 0;
            while(anime[2].title === undefined) {
                let random = Math.floor((json.results.length - 1) * (Math.floor(Math.random()*10)/10));
                if (anime[(count - 1)] === undefined || anime[count - 1].id !== json.results[random].id) {
                    anime[count].title = json.results[random].title.userPreferred;
                    anime[count].id = json.results[random].id;
                    anime[count].image = json.results[random].image;
                    count++;
                }
            }
            
        })
    })
</script>


<main>
    {#each anime as animeObj}
        {#if animeObj.title !== undefined}
        <a href="watch/{animeObj.id}" class="card">
            <img src="{animeObj.image}" alt="">
            <div class="info">
                <div>
                    <p class="title">{animeObj.title}</p>
                </div>
            </div>
        </a>
        {/if}
    {/each}
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr; grid-auto-rows: 0;
        height: calc(100vh - 71px);
        height: calc(100dvh - 71px);
        padding: 10px;
    }

    main .card {
        position: relative;
        overflow: hidden;
        border-radius: 10px;

        cursor: pointer;

        transition: transform 250ms, box-shadow 250ms;
    }

    main .card:not(:first-of-type) {
        margin-left: 10px;
    }

    main .card:hover {
        box-shadow: 0 0 10px #000;
        transform: scale(1.01);
    }

    main .card img {
        display: block;
        width: 100%; 
        height: calc(100vh - 71px); height: calc(100dvh - 71px);
        object-fit: cover;
    }

    main .card .info {
        position: absolute;
        bottom: 0; left: 0;
        padding: 10px;
        width: 100%; height: 100px;
        box-sizing: border-box;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.658) 0%, rgba(0,0,0,0) 100%);
    }

    main .card .info > div {height: 100%; display: flex; gap: 10px; flex-wrap: wrap; align-items: end;}

    main .info .title {
        font-weight: 700;
        color: #fff;
        font-size: 28px;
    }




    @media only screen and (max-width: 1400px) {
        main {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media only screen and (max-width: 700px) {
        main {
            grid-template-columns: 1fr;
        }
    }
</style>