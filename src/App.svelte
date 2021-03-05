<script>
	import { stateStore, action } from './store.js'
	import BackgroundSlideshow from './components/slideshow.svelte'
</script>

<main>
	{#if $stateStore !== null}
	<h1>Hello world {$stateStore['light.theater'].state}!</h1>
	{:else}
	Loading...
	{/if}
	<!--
	<button on:click="{e => action(['light', 'toggle', 'light.theater'])}">Call Service</button>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	-->
	<BackgroundSlideshow />
</main>

<style>
	:global(body) {
		background-color: rgb(51, 51, 51);
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>