<script>
    import { onMount } from "svelte";

    let configList = [];

    onMount(async () => {
        //load in configs
        const res = await fetch("/list_configs");
        configList = await res.json();
    });
</script>

<main>
    <div class="load">
        <select>
            {#each configList as config}
                <option>{config}</option>
            {/each}
        </select>
    </div>
    <div class="edit" />
    <div class="nav" />
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr 100px;
        gap: 0px 0px;
        grid-template-areas:
            "load edit"
            "nav nav";
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
