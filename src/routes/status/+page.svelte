<script>
    import { onMount } from "svelte";


    let consumetIndi = "";
    let consumetLabel = "Checking";
    let wbrkAnimeIndi = "";
    let wbrkAnimeLabel = "Checking";
    let malIndi = "error";
    let malLabel = "Offline";

    onMount(() => {
        let consumetTest = new XMLHttpRequest();
        consumetTest.onreadystatechange = function() {
            if (this.status === 200) {
                consumetIndi = "success";
                consumetLabel = "Working";
            } else {
                consumetIndi = "error";
                consumetLabel = "Offline";
            }
        };
        consumetTest.open("GET", "https://api.consumet.org/anime/gogoanime/spyxfamily");
        consumetTest.send();

        let wbrkAnimeTest = new XMLHttpRequest();
        wbrkAnimeTest.onreadystatechange = function() {
            if (this.status === 200) {
                wbrkAnimeIndi = "success";
                wbrkAnimeLabel = "Working";
            } else {
                wbrkAnimeIndi = "error";
                wbrkAnimeLabel = "Offline";
            }
        };
        wbrkAnimeTest.open("GET", "https://wbrk-anime-api.vercel.app/api/test");
        wbrkAnimeTest.send();
    })


</script>


<div class="main">
    <h2>WBRK Anime status</h2>
    <div class="servers">
        <div class="server">
            <div>
                <div id="indicator" class="{consumetIndi}"></div>
                <p class="title">Consumet API</p>
            </div>
            <p>Status: {consumetLabel}</p>
        </div>
        <div class="server">
            <div>
                <div id="indicator" class="{wbrkAnimeIndi}"></div>
                <p class="title">WBRK Anime API</p>
            </div>
            <p>Status: {wbrkAnimeLabel}</p>
        </div>
        <div class="server">
            <div>
                <div id="indicator" class="{malIndi}"></div>
                <p class="title">My Anime List</p>
            </div>
            <p>Status: {malLabel}</p>
        </div>
    </div>
</div>




<style>
    div.main {
        padding: 50px 0;

        display: flex;
        flex-direction: column;
    }

    div.main h2 {
        text-align: center;
    }

    div.servers {
        display: grid;
        margin: 20px auto 0 auto;
        overflow: hidden;
        width: min(calc(100% - 20px), 610px);

        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    div.server {
        /* width: 100%; */
        padding: 10px;
        border: 1px solid #b8b8b8;
        border-radius: 10px;
        background-color: #eeeeee;
    }

    div.server > div {
        display: flex;
        align-items: center;
    }

    div.server .title {
        font-weight: 700;
    }


    #indicator {
        border: 1px solid transparent; border-top: 1px solid blue;
        border-radius: 50%;
        width: 12px; aspect-ratio: 1;
        margin-right: 5px;

        transition: background-color 250ms, border 250ms;

        animation: spinner 1s infinite linear;
    }
    @keyframes spinner {
        0% {transform: rotateZ(0deg);}
        100% {transform: rotateZ(360deg);}
    }
    #indicator.error {
        background-color: red;
        border: 1px solid red;
        animation: unset;
    }
    #indicator.success {
        background-color: green;
        border: 1px solid green;
        animation: unset;
    }



    @media only screen and (max-width: 500px) {
        .servers {
            grid-template-columns: 1fr !important;
        }
    }
</style>