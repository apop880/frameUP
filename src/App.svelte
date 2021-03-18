<script>
	import Edit from './Edit.svelte';
	import Run from './Run.svelte';
	import { configStore } from './configstore.js';

	let curView = null;

	function handleDblClick() {
		if(curView === null) {
			$configStore.mode = "edit";
		}
	}
</script>

<svelte:head>
	<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
</svelte:head>

<div class:hidden="{$configStore.mode === 'view'}">
<Edit />
</div>
<div class:hidden="{$configStore.mode === 'edit'}" on:dblclick="{() => handleDblClick()}">
<Run {curView} />
</div>

<style>
	.hidden {
		display: none;
	}
</style>