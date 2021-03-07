<script>
    import { stateStore, action } from '../store.js';
    import { tasks } from '../config.js';
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { backInOut } from 'svelte/easing';
    import { spring } from 'svelte/motion';
    
    let size = spring(1);

    function render_template(template) {
        let res = template.template_text.replace('%%', $stateStore[template.template_entity].state);
        return res;
    }

    let taskObj;

    $: {    
        taskObj = Object.values($stateStore).filter(value => (value.entity_id in tasks && value.state === 'off')).sort((a, b) => {
            return (b.last_changed > a.last_changed) ? 1 : ((b.last_changed < a.last_changed) ?-1:0);
        })
    }
</script>

<div class="tasks">
    {#each taskObj as task, index(task)}
        <button class="taskButton"
            in:fly="{{ y: -200, duration: 500 }}"
            out:fade="{{ delay: 400 }}"
            animate:flip="{{duration: 400, delay: 1000, easing: backInOut}}"
            on:click="{() => { action('input_boolean.turn_on', task.entity_id) }}"
            on:touchstart="{() => size.set(1.1)}"
            on:touchend="{() => size.set(1)}"
            style="transform: scale({$size})">
                <div>icon</div>
                {#if 'text' in tasks[task.entity_id]}
                <div>{tasks[task.entity_id].text}</div>
                {:else if 'template_text' in tasks[task.entity_id]}
                <div>{render_template(tasks[task.entity_id])}</div>
                {/if}
        </button>
    {/each}
</div>

<style>
    .tasks {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 350px;
        z-index: 10;
    }

    .taskButton {
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
        justify-items: start;
    }
</style>