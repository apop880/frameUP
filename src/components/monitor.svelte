<script>
    import { stateStore, action } from '../apistore.js';
    import { configStore } from "../configstore.js";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { backInOut } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    
    let size = spring(1);

    function handleClick(cfg) {
        action(cfg.service, cfg.target)
    }

    function render_template(template) {
        let res = template.template_text.replace('%%', $stateStore[template.template_entity].state);
        return res;
    }

    let notiObj;

    $: {    
        notiObj = Object.values($stateStore).filter(value => ($configStore.data.sensors.some(sensor => (sensor.entity === value.entity_id && sensor.state === value.state)))).sort((a, b) => {
            return (b.last_changed > a.last_changed) ? 1 : ((b.last_changed < a.last_changed) ?-1:0);
        })
    }
</script>

<div class="notifications">
    {#each notiObj.map((obj) => Object.assign(obj, {config: $configStore.data.sensors.find(row => row.entity === obj.entity_id)})) as noti, index(noti)}
        <button class="notiButton"
            in:fly="{{ y: -200, duration: 500 }}"
            out:fade="{{ delay: 400 }}"
            animate:flip="{{duration: 400, delay: 1000, easing: backInOut}}"
            on:click="{() => {
                if('service' in noti.config && noti.config.service !== '') {
                    handleClick(noti.config);
                }
            }}"
            on:touchstart="{() => size.set(1.1)}"
            on:touchend="{() => size.set(1)}"
            style="transform: scale({$size})">
                <div><span class="iconify" data-icon={noti.config.icon}></span></div>
                <div>{noti.config.text}</div>
        </button>
    {/each}
</div>

<style>
    .notifications {
        position: absolute;
        bottom: 10px;
        left: 10px;
        width: 350px;
        z-index: 10;
    }

    .notiButton {
        background-color: rgba(158, 153, 153, 0.825);
        border-radius: 20px;
        padding: 8px;
        margin-top: 10px;
        width: 340px;
        border: 0;
        font-size: 1em;
        outline-style: none;
        display: grid;
		grid-template-columns: 50px 1fr;
        column-gap: 10px;
        justify-items: start;
        align-items: center;
    }

    .iconify {
        font-size: 25px;
    }
</style>