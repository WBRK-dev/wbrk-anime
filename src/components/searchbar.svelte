

<searchcontainer>
    <input type="text" placeholder="Search Anime">
    <!-- <searchresults>
        <searchitem>
            <img src="" alt="">
            <p class="title">Anime Title</p>
        </searchitem>
    </searchresults> -->
</searchcontainer>

<style>
    searchcontainer {
        display: block;

        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);

        width: min(400px, calc(100% - 20px));
    }

    searchcontainer input {
        display: block; box-sizing: border-box;
        border: none;
        border-radius: 50px;
        box-shadow: 0 0 5px #000;

        font-size: 16px;

        padding: 4px 10px;
        width: 100%;
    }

    searchcontainer searchresults {
        display: block;

        position: absolute;
        top: 40px; left: 0;
        width: 100%; box-sizing: border-box;
        
        border: 1px solid #0000006c;
        border-radius: 10px;
        background-color: #ffffff5d;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        box-shadow: 0 0 5px #585858;

        /* TODO - Animate opacity */
        /* animation: ; */
    }

    /* searchcontainer:focus-within searchresults {} */

    searchcontainer searchresults searchitem {
        display: flex;
        height: 50px;
    }

    searchcontainer searchresults searchitem:not(:last-of-type) {border-bottom: 1px solid #0000006c;}
</style>