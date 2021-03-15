<script>
	import Edit from './Edit.svelte';
	import Run from './Run.svelte';
	import configstore from './configstore.js';

	let editor = true;

	$: if(configstore.name) {
		editor = false;
	}
</script>

<svelte:head>
	<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
</svelte:head>

{#if editor}
<Edit />
{:else}
<Run />
{/if}

<style>
	:global(.iconify) {
        width: 80%;
        height: 80%;
    }
</style>