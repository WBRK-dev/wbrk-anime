<script>
    export let id, title, img, subOrDub, releaseDate;
</script>

<a data-id={id} href="watch/{id}">
    <img src="{img}" alt="">
    <div class="info">
        <p class="title">{title}</p>
        <div class="footer">
            {#if subOrDub !== undefined}
                <div class="tag">{subOrDub.toUpperCase()}</div>
            {/if}
            {#if releaseDate !== undefined}
                <p>{releaseDate}</p>
            {/if}
        </div>
    </div>
</a>

<style>
    a {
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 2px #00000041;
        border-radius: 10px;

        margin-left: 10px;
        margin-top: 10px;

        color: #000;
        text-decoration: none;

        transform: scale(1);

        overflow: hidden;
        cursor: pointer;
        transition: box-shadow 250ms, transform 250ms;
    }

    a:hover {
        transform: scale(1.02);
        box-shadow: 0 0 5px #000;
    }

    a img {
        width: 100%;
        aspect-ratio: 100/131;
        object-fit: cover;
    }

    a .info {
        padding: 5px;
        flex-grow: 1;

        display: flex;
        flex-direction: column;
    }

    a .info .title {
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 5px;
    }

    a .info .footer {
        display: flex;
        align-items: center;
        margin-top: auto;
    }

    a .info .footer .tag {
        font-size: 14px;
        color: #fff;

        background-color: #727272;
        border-radius: 4px;
        padding: 2px 4px;
    }

    a .info .footer > *:first-child {
        margin-right: auto;
    }
</style>