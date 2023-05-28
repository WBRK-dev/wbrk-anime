<script>
    import Spinner from "../../../components/spinner.svelte";

    /**@type {any}*/export let details;
    /**@type {any}*/export let dubDetails;
</script>

<main>
    {#if details.title === undefined}
        <div class="center"><Spinner white={true}/></div>
    {:else}
        <div class="center"><img src={details.image} alt=""></div>
        <h2>{details.title}</h2>
        <p>{details.description}</p>
        <p>Episodes: {details.totalEpisodes}</p>
        <p>Status: {details.status}</p>
        <p>Released: {details.releaseDate}</p>
        {#if dubDetails.subOrDub === "dub" && details.subOrDub === "sub"}
            <button onclick="javascript:window.open('./{dubDetails.id}','_self')">Dubbed version</button>
        {:else if details.subOrDub === "dub"}
            <button onclick="javascript:window.open('./{details.id.replace(new RegExp("\\b" + "-dub" + "\\b", "g"), "")}','_self')">Subbed version</button>
        {/if}
        <!-- <button>Subscribe</button> -->
    {/if}
</main>

<style>
    main {
        background-color: #000;
        padding: 10px;
        border-radius: 10px;
        color: #fff;
    }
    .center {display: grid; place-items: center;}

    img {
        max-height: 200px;
        max-width: 100%;
    }

    h2 {
        margin-top: 10px;
        text-align: center;
    }

    p {
        margin-top: 5px;
        max-height: 100px;
        overflow: hidden auto;
        color: #f0f0f0;
    }

    button {
        margin-top: 10px;
        width: 100%;
    }
</style>