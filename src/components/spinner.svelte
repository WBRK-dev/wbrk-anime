<div class="spinner"></div>

<style>
    .spinner {
        width: 20px;
        aspect-ratio: 1/1;
        border: 2px solid transparent;
        border-top: 2px solid #000;
        border-radius: 50%;

        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {transform: rotateZ(0deg);}
        100% {transform: rotateZ(360deg);}
    }
</style>