<script>
    import { onMount } from "svelte";
    import { configStore } from './configstore.js';
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
<SelectModal />
{:else}
<main>
    <div class="edit" />
    <form>
    <h3>Weather</h3>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Temperature Sensor</label>
        <input type="text" bind:value={$configStore.data.weather.temperature_sensor} />
    </form>
    <div class="nav" />
</main>
{/if}

<style>
    main {
        display: grid;
        grid-template-rows: 1fr 100px;
        gap: 0px 0px;
        height: 100vh;
    }

    .load {
        grid-area: load;
    }

    .edit {
        grid-area: edit;
    }

    .nav {
        grid-area: nav;
    }
</style>
