

<svelte:head>
    <link rel="stylesheet" href="http://wbrk.netlify.app/wbrk.css/wbrk.css">
    <title>WBR_K Anime</title>
</svelte:head>

<body>
    <header>
        <a class="title" href="/">WBR_K Anime</a>
        <div class="right">
            <a href="/watch">Featured</a>
        </div>
    </header>
    <slot></slot>
</body>

<style>
    header .title {
        color: #000;
        text-decoration: none;
    }

    header a {
        color: #000;
        text-decoration: none;
        display: block;

        padding: 4px 10px;
        border-radius: 50px;
    }

    header a:hover {
        background-color: #0000001e;
    }
</style>