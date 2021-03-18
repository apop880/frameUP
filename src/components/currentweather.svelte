<script>
    import { stateStore } from '../apistore.js';
    import { configStore } from '../configstore.js';
</script>

<div class="weather" on:click>
    <span class="iconify" data-icon={$stateStore[$configStore.data.weather_entity].attributes.icon}></span>
    {$stateStore[$configStore.data.weather_entity].attributes.temperature}&deg;
</div>

<style>
    .weather {
        justify-self: end;
        align-items: center;
        vertical-align: top;
        font-size: 35pt;
        margin: 10px;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        z-index: 10;
        display: grid;
        grid-template-columns: auto auto;
    }
</style>