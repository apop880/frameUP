<script>
    import { configStore, saveConfig } from "./configstore.js";
    import { stateStore } from "./apistore.js";
    import SelectModal from "./components/selectmodal.svelte";
    import { onMount } from "svelte";
    import Select from "svelte-select";

    let entities = null;

    let unsubscribe;

    onMount(() => {
        unsubscribe = stateStore.subscribe((value) => {
            if (entities === null && value !== null) {
                entities = Object.keys(value).sort().reduce((res, key) => (res[key] = value[key], res), {});
                entities = entities;
            }
        });
    });

    $: if (entities !== null) {
        unsubscribe();
    }

    let configList = [];

    let loadNew = false;

    function handleMessage(event) {
        if (event.detail.text === "close") {
            loadNew = false;
        }
    }

    function addSensor() {
        $configStore.data.sensors = [
            ...$configStore.data.sensors,
            { entity: "" },
        ];
    }

    function handleSensorSelect(event, k) {
        $configStore.data.sensors[k].entity = event.detail.value;
    }

    function handleSensorDelete(k) {
        console.log("clicked")
        $configStore.data.sensors = [...$configStore.data.sensors.slice(0, k), ...$configStore.data.sensors.slice(k + 1)];
    }
</script>

{#if $configStore.name === "" || loadNew}
    <SelectModal on:message={handleMessage} />
{:else}
    <main>
        <div class="controls">
            <button on:click={saveConfig}>Save Changes</button>
            <button on:click={() => (loadNew = true)}>Load New</button>
            <button on:click={() => ($configStore.mode = "view")}
                >Close Editor</button
            >
        </div>
        <div class="edit">
            {#if entities !== null}
                <h3>Weather Entity</h3>
                <select bind:value={$configStore.data.weather_entity}>
                    <option value="" />
                    {#each Object.keys(entities) as key}
                        {#if key.startsWith("weather")}
                            <option value={key}>{key}</option>
                        {/if}
                    {/each}
                </select>
                <h3>Entities to Monitor</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Entity</th>
                            <th>State</th>
                            <th>Icon</th>
                            <th>Text</th>
                            <th>Service Call</th>
                            <th>Service Target</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $configStore.data.sensors as sensor, key}
                            <tr>
                                <td><Select
                                        items={Object.keys(entities)}
                                        selectedValue={sensor.entity}
                                        on:select={(e) =>
                                            handleSensorSelect(e, key)}
                                        isClearable={false}
                                    /></td>
                                    <td><input bind:value="{$configStore.data.sensors[key].state}" /></td>
                                    <td><input bind:value="{$configStore.data.sensors[key].icon}" /></td>
                                    <td><input bind:value="{$configStore.data.sensors[key].text}" /></td>
                                    <td><input bind:value="{$configStore.data.sensors[key].service}" /></td>
                                    <td><input bind:value="{$configStore.data.sensors[key].target}" /></td>
                                     <td style="align-self:center;" on:click={() => handleSensorDelete(key)}>   <span class="iconify" data-icon="bi:trash-fill"></span></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                <button on:click={addSensor}>Add New</button>
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
        overflow-y: scroll;
    }

    table {
        display: grid;
        border-collapse: collapse;
        min-width: 100%;
        grid-template-columns:
            minmax(150px, 3fr)
            minmax(150px, 1fr)
            minmax(150px, 1fr)
            minmax(150px, 3fr)
            minmax(150px, 2fr)
            minmax(150px, 2fr)
            minmax(30px, 0.5fr);
    }

    thead,
    tbody,
    tr {
        display: contents;
    }

    th,
    td {
        padding: 15px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    th {
        position: sticky;
        top: 0;
        background: #6c7ae0;
        text-align: left;
        font-weight: normal;
        font-size: 1.1rem;
        color: white;
    }

    th:last-child {
        border: 0;
    }

    td {
        padding-top: 10px;
        padding-bottom: 10px;
        color: #000000 !important;
        font-size: 14px;
    }

    input {
        width: -webkit-fill-available;
        height: 44px;
    }

    .iconify {
        font-size: 25px;
        color: rgb(196, 28, 28);
    }
</style>
