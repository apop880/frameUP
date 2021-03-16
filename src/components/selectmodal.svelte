<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { configStore, loadConfig } from '../configstore.js'

    let configList = [];
    let selectedConfig;
    let newConfig = "New Config Name";

    onMount(async () => {
        //load in configs
        const res = await fetch("/list_configs");
        configList = await res.json();
        if (configList.length > 0) {
            selectedConfig = configList[0];
        }
    });

    const dispatch = createEventDispatcher();

    function handleLoad() {
        localStorage.setItem('configName', selectedConfig);
        loadConfig(selectedConfig);
        dispatch('message', {
			text: 'close'
		});
    }

    function handleCreate() {
        localStorage.setItem('configName', newConfig);
        configStore.setName(newConfig);
    }
</script>

<div class="modal">
    <div class="modal-content">
        Choose an existing configuration to load:
        <select bind:value={selectedConfig}>
        {#each configList as config}
            <option value={config}>{config}</option>
        {/each}
        </select> <button on:click={handleLoad}>Load</button>
        <br />or
        <input bind:value={newConfig} placeholder="New Config Name" />
        <button on:click={handleCreate}>Create New</button>
    </div>
</div>

<style>
    .modal {
        position: fixed; /* Stay in place */
        z-index: 15; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
        text-align: center;
        font-size: 20pt;
    }

    .modal-content {
        background-color: rgb(175, 175, 175);
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        line-height: 30px;
        border-radius: 20px;
    }

    button {
        border-radius: 20px;
        color: white;
        background-color: rgb(0, 106, 255);
        border: none;
    }
</style>
