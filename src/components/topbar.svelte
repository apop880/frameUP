<script>
    import Clock from './clock.svelte';
    import Weather from './weather.svelte';
</script>

<div class="container">
    <Clock />
    <Weather />
    <div></div>
</div>


<style>
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas:
            ". . .";
        color: white;
    }
</style>