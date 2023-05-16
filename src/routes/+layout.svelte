<script>
    import Searchbar from "../components/searchbar.svelte";
</script>

<svelte:head>
    <link rel="stylesheet" href="/wbrk.css/wbrk.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <title>WBR_K Anime</title>
</svelte:head>

<body>
    <header>
        <a class="title" href="/">WBR_K Anime</a>
        <!-- <Searchbar/> -->
        <div class="right">
            <a href="/watch">Featured</a>
        </div>
    </header>
    <slot></slot>
</body>

<style>
    header {
        position: relative;
    }

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