<script>
    export let config;
</script>

<div class="view">
    {#each config as item, index}
        <svelte:component this={item.card} config={item.config} delay={index}/>
    {/each}
</div>

<style>
    .view {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 200px;
    }
</style>