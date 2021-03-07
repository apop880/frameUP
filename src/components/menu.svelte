<script>
    import { createEventDispatcher } from "svelte";
    import { spring } from 'svelte/motion';
    import { fly } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing'
    import { views } from '../config.js';
    import IconifyIcon from '@iconify/svelte';

    export let curView;

    let size = spring(1);

    const dispatch = createEventDispatcher();

    function menuClick(view) {
        dispatch("message", {
            newView: view,
        });
    }
</script>

<div class="menu">
    {#each views as item, index}
        <button
            class:active={curView === index}
            transition:fly="{{ y: 80, duration: 700, delay: 150*index, easing: elasticInOut }}"
            on:click={() => menuClick(index)}
            on:touchstart="{() => size.set(1.1)}"
            on:touchend="{() => size.set(1)}"
            style="transform: scale({$size})">
            <IconifyIcon icon="{item.icon}" height="38" />
        </button>
    {/each}
</div>

<style>
    .menu {
        color: white;
        height: 60px;
        position: absolute;
        bottom: 10px;
        width: 400px;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        text-align: center;
    }

    button {
        background-color: rgba(158, 153, 153, 0.825);
        border-radius: 50%;
        padding: 10px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border: 1px solid #414040;
        font-size: 1em;
        outline-style: none;
    }

    .active {
        background-color: rgba(22, 88, 149, 0.825);
    }
</style>
