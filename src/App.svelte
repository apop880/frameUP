<script>
	import Edit from './Edit.svelte';
	import Run from './Run.svelte';
	import { onMount } from 'svelte';

	let config;
	let editor = true;

	onMount(async () => {
		//has this device gotten a named config yet?
		const configName = localStorage.getItem('configName');
		if (configName) {
			//load in config
			const res = await fetch('/get_config', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: {"name": configName}
			})
			config = await res.json();
		}
		else {
			editor = true;
		}
	});
</script>

<svelte:head>
	<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
</svelte:head>

{#if editor}
<Edit />
{:else}
<Run />
{/if}