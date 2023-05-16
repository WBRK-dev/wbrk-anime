<div class="root">
    <div class="skeleton" id="img"></div>
    <div class="skeleton" id="text"></div>
    <div class="skeleton" id="sub"></div>
</div>

<style>
    .root {
        border-radius: 10px;
        box-shadow: 0 0 2px #00000041;
        margin: 10px 0 0 10px;

        overflow: hidden;
    }

    .skeleton {
        overflow: hidden;
        position: relative;
    }

    .skeleton::before {
        content: "";

        background: rgb(124,124,124);
        background: linear-gradient(121deg, rgba(185,185,185,1) 0%, rgba(185,185,185,1) 35%, rgba(124,124,124,1) 50%, rgba(185,185,185,1) 65%, rgba(185,185,185,1) 100%);
        width: 500%;
        height: 100%;

        position: absolute;
        right: 0; top: 0;

        animation: skeleton 2s infinite ease-in;
    }

    @keyframes skeleton {
        0% {right: 0%;}
        30% {right: 0%;}
        100% {right: -400%;}
    }

    .skeleton#img {
        height: 195px;
    }

    .skeleton#text,
    .skeleton#sub {
        height: 20px;
        margin: 10px 10px 0 10px;
        border-radius: 10px;
    }
    .skeleton#sub {margin-bottom: 10px;}
    .skeleton#text::before {animation: skeleton 2s 100ms infinite ease-in;}
    .skeleton#sub::before {animation: skeleton 2s 200ms infinite ease-in;}
</style>