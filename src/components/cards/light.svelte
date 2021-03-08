<script>
    import { stateStore, action } from '../../store.js';
    import IconifyIcon from '@iconify/svelte';
    import { fly } from 'svelte/transition';
    import { elasticInOut } from 'svelte/easing'

    export let config;
    export let delay;

    let entityObj;

    $: {
        entityObj = Object.values($stateStore).filter(value => (value.entity_id === config.entity))[0];
    }
</script>

<button class:on={entityObj.state === "on"} class:off={entityObj.state === "off"} on:click="{() => action('light.toggle', config.entity)}"
    transition:fly="{{ y: 80, duration: 700, delay: delay, easing: elasticInOut }}">
        <div class="icon"><IconifyIcon icon="{config.icon}" height="38" /></div>
        <div class="name">{config.name}</div>    
</button>

<style>
    button {
        width: 220px;
        height: 70px;
        background-color: rgba(46, 45, 45, 0.825);
        color:white;
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

    .on {
        box-shadow: 0px 0px 15px 5px rgb(202 199 18 / 85%);
        transition: 0.5s;
    }

    .off {
        transition: 0.5s;
    }

    .icon {
        grid-area: icon;
    }

    .name {
        grid-area: name;
    }

    .state {
        grid-area: state;
    }
</style>