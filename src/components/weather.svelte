<script>
    import { stateStore } from '../store.js';
    import { weather } from "../config.js";
    import '../css/weather-icons.min.css'

    const CONDITION_PICTURES = {
        "clear-day": "wi-day-sunny",
        "clear-night": "wi-night-clear",
        "rain": "wi-rain",
        "snow": "wi-snow",
        "sleet": "wi-sleet",
        "wind": "wi-cloudy-windy",
        "fog": "wi-fog",
        "cloudy": "wi-cloudy",
        "partly-cloudy-day": "wi-day-cloudy",
        "partly-cloudy-night": "wi-night-alt-cloudy"
    }
</script>

<div class="weather">
    {#if $stateStore !== null}
        <i class={'wi ' + CONDITION_PICTURES[$stateStore[weather.icon].state]}/>
        {$stateStore[weather.temperature_sensor].state}&deg;
    {/if}
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