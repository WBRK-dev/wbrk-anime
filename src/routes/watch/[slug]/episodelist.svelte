<script>
    import Spinner from "../../../components/spinner.svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    

    /**
     * @type {any}
    */
    export let episodes, episodeButtons;


    /**@param {Number} i*/
    function changeEpisode(i) {
        dispatch('episode', {
			number: i
		});
    }
</script>

<main>
    {#if !episodes}
        <div class="center"><Spinner white={true}/></div>
    {:else}
        {#each episodes as episode, i}
            <div class="episode" bind:this={episodeButtons[i]} on:click={() => changeEpisode(i)}>{episode.number}</div>
        {/each}
    {/if}
</main>

<style>
    main {
        background-color: #000;
        color: #fff;
        padding: 10px;
        border-radius: 10px;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
        gap: 5px;

        max-height: 400px; min-height: 20px;
        overflow: hidden auto;
        position: relative;
    }
    .center {display: grid; place-items: center;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }
    .episode {
        background-color: #353535;
        padding: 4px 0;
        display: grid; place-items: center;
        border-radius: 5px;
        cursor: pointer;
    }
</style>