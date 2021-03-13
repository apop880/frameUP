<script>
	import { stateStore, action } from './store.js'
	import BackgroundSlideshow from './components/slideshow.svelte'
	import Topbar from './components/topbar.svelte';
	import Notifications from './components/notifications.svelte';
	import Tasks from './components/tasks.svelte';
	import LoadingModal from './components/loadingmodal.svelte';
	import Menu from './components/menu.svelte';
	import View from './components/view.svelte';
	import { views } from './config.js';

	let curView = null;
	let showMenu = false;
	let timer;

	function mainClick() {
		clearTimeout(timer);
		showMenu = true;
		timer = setTimeout(() => {
			showMenu = false;
			curView = null;
		}, 30000)
	}

	function handleMessage(e) {
		clearTimeout(timer);
		if(curView === e.detail.newView) {
			curView = null;
			timer = setTimeout(() => showMenu = false, 3000)
		}
		else {
			timer = setTimeout(() => {
				showMenu = false;
				curView = null;
			}, 30000)
			curView = e.detail.newView;
		}
	}
</script>

<main on:click="{() => mainClick()}">
	<Topbar />
	{#if curView !== null}
		<View />
	{/if}
</main>
{#if $stateStore !== null}
	<Notifications />
	<Tasks />
	{#if showMenu}
		<Menu on:message={handleMessage} curView={curView} />
	{/if}
{:else}
	<LoadingModal />
{/if}
<BackgroundSlideshow />

<style>
	:global(body) {
		background-color: rgb(51, 51, 51);
		overflow-y: hidden;
	}

	main {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 80px 1fr 100px;
		gap: 0px 0px;
		grid-template-areas:
			"."
			"."
			".";
		height: 100vh;
	}
</style>