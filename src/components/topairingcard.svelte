<script>
    export let title, id, img;
</script>

<hero>
    <div class="content">
        <div class="info">
            <p class="title">{title}</p>
            <p class="id">ID: {id}</p>
            <div class="buttonbox">
                <a href="watch/{id}">Watch</a>
            </div>
        </div>
        <img src="{img}" alt="">
    </div>
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
</style>