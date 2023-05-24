<script>
    /**@type {string}*/
    export let url;
</script>

<!-- <iframe title="" src="{url}" frameborder="0"></iframe> -->
<video src="{url}" type="application/x-mpegURL" controls></video>

<style>
    video {
        display: block;
        background-color: #000;
        aspect-ratio: 16/9;
        border-radius: 10px;
        width: 100%;
    }
</style>