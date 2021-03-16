<script>
    import { onMount } from "svelte";
    import configstore from './configstore.js';
    import SelectModal from './components/selectmodal.svelte';

    let configList = [];

    let loadNew = false;

    function handleMessage(event) {
        if(event.detail.text === 'close') {
            loadNew = false;
        }
    }
</script>

{#if (!($configstore.name) || loadNew)}
<SelectModal />
{:else}
<main>
    <div class="edit" />
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
