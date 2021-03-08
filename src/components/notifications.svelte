<script>
    import { stateStore, action } from '../store.js';
    import { notifications } from '../config.js';
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { backInOut } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    import IconifyIcon from '@iconify/svelte';
    
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
        notiObj = Object.values($stateStore).filter(value => (value.entity_id in notifications && value.state === notifications[value.entity_id].state)).sort((a, b) => {
            return (b.last_changed > a.last_changed) ? 1 : ((b.last_changed < a.last_changed) ?-1:0);
        })
    }
</script>

<div class="notifications">
    {#each notiObj as noti, index(noti)}
        <button class="notiButton"
            in:fly="{{ y: -200, duration: 500 }}"
            out:fade="{{ delay: 400 }}"
            animate:flip="{{duration: 400, delay: 1000, easing: backInOut}}"
            on:click="{() => {
                if('service' in notifications[noti.entity_id]) {
                    handleClick(notifications[noti.entity_id]);
                }
            }}"
            on:touchstart="{() => size.set(1.1)}"
            on:touchend="{() => size.set(1)}"
            style="transform: scale({$size})">
                <div><IconifyIcon icon="{notifications[noti.entity_id].icon}" height="38" /></div>
                {#if 'text' in notifications[noti.entity_id]}
                <div>{notifications[noti.entity_id].text}</div>
                {:else if 'template_text' in notifications[noti.entity_id]}
                <div>{render_template(notifications[noti.entity_id])}</div>
                {/if}
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
		grid-template-columns: min-content 1fr;
        column-gap: 10px;
        justify-items: start;
        align-items: center;
    }
</style>