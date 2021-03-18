<script>
    import { fade } from 'svelte/transition'
    import { onMount, onDestroy } from 'svelte';

    let x = 2;
    let images = [];
    let imgA = ''
    let imgB = ''
    let showA = true;

    let rotator;
    let delay;

    onMount(() => {
        fetch('slideshow.json')
            .then(Response => Response.json())
            .then(data => {
                images = data;
                imgA = images[0];
                imgB = images[1];
            })

        rotator = setInterval(() => {
            if(showA) {
                showA = !showA;
                delay = setTimeout(() => { imgA = images[x]; }, 5000)
            }
            else {
                showA = !showA;
                delay = setTimeout(() => { imgB = images[x]; }, 5000)
            }
            x++;
            if(x > images.length-1) {
                x = 0;
            }
        }, 30000);
    })

    onDestroy(() => {
        clearInterval(rotator);
        clearTimeout(delay);
    })
</script>

<style>
    #backgroundSlider {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        color: transparent;
        z-index: -1;
    }
    .image {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>

<div id="backgroundSlider">
    {#if showA && imgA !== ''}
    <div transition:fade="{{delay: 2000, duration: 1000}}"  class="image" style="background-image: url({imgA})"></div>
    {:else if imgB !== ''}
    <div transition:fade="{{delay: 2000, duration: 1000}}" class="image" style="background-image: url({imgB})"></div>
    {/if}
</div>