<script>
    import { configStore, saveConfig } from './configstore.js';
    import SelectModal from './components/selectmodal.svelte';
    import { weather } from "./config.js";

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
    <div class="controls"><button on:click={saveConfig}>Save Changes</button> <button on:click={() => loadNew = true}>Load New</button> <button on:click={() => $configStore.mode = "view"}>Close Editor</button></div>
    <div class="edit">
    <form>
    <h3>Weather</h3>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Temperature Sensor</label>
        <input type="text" bind:value={$configStore.data.weather_entity} />
    </form>
    </div>
    <div class="nav" />
</main>
{/if}

<style>
    main {
        justify-content: center;
        display: grid;
        grid-template-rows: 80px 1fr 100px;
        gap: 0px 0px;
        height: 100vh;
    }

    button {
        border-radius: 20px;
        color: white;
        background-color: rgb(0, 106, 255);
        border: none;
    }

    .edit {
        background-color: rgb(184, 184, 184);
    }
</style>
