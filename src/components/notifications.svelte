<script>
    import { stateStore, action } from '../store.js';
    import { notifications } from '../config.js';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { backInOut, quintOut } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    
    let size = spring(1);

    function handleClick(cfg) {
        action(cfg.service, cfg.target)
    }

    const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

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
            in:receive="{{key: noti.entity_id}}"
            out:send="{{key: noti.entity_id}}"
            animate:flip="{{duration: 400, delay: 500, easing: backInOut}}"
            on:touchstart={() => size.set(1.05)}
            on:touchend={() => size.set(1)}
            on:click="{() => {
                if('service' in notifications[noti.entity_id]) {
                    handleClick(notifications[noti.entity_id]);
                }
            }}"
            style="transform: scale3d({$size},{$size},{$size})">
                <div>icon</div>
                <div>{notifications[noti.entity_id].text}</div>
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
        padding: 10px;
        margin-top: 10px;
        width: 340px;
        border: 0;
        font-size: 1em;
        outline-style: none;
        display: grid;
		grid-template-columns: min-content 1fr;
        column-gap: 10px;
        transform-origin: left top;
        -webkit-transform-origin: left top;
        justify-items: start;
    }
</style>