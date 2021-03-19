<script>
    import { configStore, saveConfig } from './configstore.js';
    import { stateStore } from './apistore.js';
    import SelectModal from './components/selectmodal.svelte';
    import { onMount } from 'svelte';
    import { weather } from "./config.js";
    import { notifications } from './config.js';

    let entities = null;

    let unsubscribe;

    onMount(() => {
        unsubscribe = stateStore.subscribe(value => {
            if(entities === null) {
                entities = value;
                entities = entities;
            }
        })
    })

    $: if(entities !== null) {
        unsubscribe();
        console.log(entities['light.bar_bulb']);
    }

    let configList = [];

    let loadNew = false;

    function handleMessage(event) {
        if(event.detail.text === 'close') {
            loadNew = false;
        }
    }
</script>

{#if ($configStore.name === '' || loadNew)}
<SelectModal on:message={handleMessage} />
{:else}
<main>
    <div class="controls"><button on:click={saveConfig}>Save Changes</button> <button on:click={() => loadNew = true}>Load New</button> <button on:click={() => location.reload()}>Close Editor</button></div>
    <div class="edit">
    {#if entities !== null}
        <form>
        <h3>Weather Entity</h3>
            <select bind:value={$configStore.data.weather_entity}>
                {#each Object.keys(entities) as key}
                    {#if key.startsWith('weather')}
                        <option value={key}>{key}</option>
                    {/if}
                {/each}
            </select>
        <h3>Sensors to Monitor</h3>
        <!-- {#each Object.keys($configStore.data.sensors) as key }
            <select></select>
        {/each} -->
        </form>
    {/if}
    </div>
    <div class="nav" />
</main>
{/if}

<style>
    main {
        justify-content: center;
        display: grid;
        grid-template-rows: 80px 1fr 100px;
        grid-template-columns: 1fr;
        gap: 0px 0px;
        height: 100vh;
    }

    button {
        border-radius: 20px;
        color: white;
        background-color: rgb(0, 106, 255);
        border: none;
    }

    .controls {
        justify-self: center;
    }

    .edit {
        background-color: rgb(184, 184, 184);
        padding: 10px;
    }
</style>
