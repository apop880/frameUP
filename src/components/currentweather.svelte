<script>
    import { stateStore } from '../apistore.js';
    import { weather } from "../config.js";
    import '../css/weather-icons.min.css';

    export let CONDITION_PICTURES;
</script>

<div class="weather" on:click>
    <i class={'wi ' + CONDITION_PICTURES[$stateStore[weather.icon].state]}/>
    {$stateStore[weather.temperature_sensor].state}&deg;
</div>

<style>
    .weather {
        justify-self: end;
        vertical-align: top;
        font-size: 35pt;
        margin: 10px;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        z-index: 10;
    }
</style>