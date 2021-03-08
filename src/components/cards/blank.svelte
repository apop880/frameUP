<script>
    export let config;
</script>

{#if config !== undefined}
{#each Array(config.span) as _, i}
    <br />
{/each}
{:else}
    <br />
{/if}

<style>
    br {
        width: 100%;
        content: "";
    }
</style>
