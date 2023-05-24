<script>
    import Spinner from "../../../components/spinner.svelte";

    /** @type {any}*/export let episodeLinks;
</script>

<main>
    <div class="row"><p>Episode 9</p></div>
    <div class="row">
        <div class="button">Previous</div>
        <div class="button">Next</div>
    </div>
    {#if episodeLinks.length === 0}
        <div class="center"><Spinner white={true}/></div>
    {:else}
        <div class="row" id="links">
        {#each episodeLinks.sources as link}
            <div class="link">{link.quality}</div>
        {/each}
        </div>
    {/if}
</main>

<style>
    main {
        background-color: #000;
        color: #fff;
        padding: 10px;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .center {display: grid; place-items: center;}

    .row {
        display: flex;
        gap: 10px;
    }

    .button {
        flex: 1 0 0;
        display: grid;
        place-items: center;
        border-radius: 5px;
        padding: 4px 0;
        cursor: pointer;
        background-color: #1f1f1f;
    }
    .button:hover {background-color: #494949;}

    p {
        flex: 1 0 0;
        text-align: center;
    }
</style>