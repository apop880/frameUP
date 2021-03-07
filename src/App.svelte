<script>
	import { stateStore, action } from './store.js'
	import BackgroundSlideshow from './components/slideshow.svelte'
	import Topbar from './components/topbar.svelte';
	import Notifications from './components/notifications.svelte';
	import Tasks from './components/tasks.svelte';
	import LoadingModal from './components/loadingmodal.svelte';
</script>

<main>
	<Topbar />
	
</main>
{#if $stateStore !== null}
<Notifications />
<Tasks />
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