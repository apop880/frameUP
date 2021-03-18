<script>
	import Edit from './Edit.svelte';
	import Run from './Run.svelte';
	import { configStore } from './configstore.js';
</script>

<svelte:head>
	<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
</svelte:head>

{#if $configStore.mode === "edit"}
<Edit />
{:else}
<Run />
{/if}

