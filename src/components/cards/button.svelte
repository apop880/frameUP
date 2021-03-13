<script>
    import { action } from '../../store.js';
    import IconifyIcon from '@iconify/svelte';
    import { fly } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing'

    export let config;
    export let delay;
</script>

<button on:click="{() => action(config.action, config.scene)}"
    transition:fly="{{ y: 80, duration: 700, delay: delay, easing: elasticInOut }}">
        <div class="icon"><IconifyIcon icon="{config.icon}" height="38" /></div>
        <div class="name">{config.name}</div>    
</button>

<style>
    button {
        width: 100%;
        height: 100%;
        background-color: rgba(216, 212, 212, 0.904);
        color:rgb(51, 51, 51);
        border: 1 px grey solid;
        border-radius: 20px;
        padding: 10px;
        margin-top: 10px;
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-areas:
            "icon name";
        align-self: center;
        align-items: center;
    }

    .icon {
        grid-area: icon;
    }

    .name {
        grid-area: name;
    }
</style>