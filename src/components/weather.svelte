<script>
    import { stateStore } from '../store.js';
    import { weather } from "../config.js";
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { backInOut } from 'svelte/easing';
    import '../css/weather-icons.min.css'

    export let showForecast;

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

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function getDay(key) {
        let day=new Date();
        return weekday[(day.getDay() + key) % 7].substring(0, 3);
    }

    function roundTemp(val) {
        return Math.round(val);
    }
</script>

{#if $stateStore !== null}
{#each Array(2) as _, i}
{#if i ===0 }
<div class="weather" on:click in:fly="{{ y: -200, duration: 500 }}" out:fade="{{ delay: 400 }}">
        <i class={'wi ' + CONDITION_PICTURES[$stateStore[weather.icon].state]}/>
        {$stateStore[weather.temperature_sensor].state}&deg;
</div>
{:else if showForecast}
<div class="weather-extended" on:click in:fly="{{ y: -200, duration: 500 }}" out:fade="{{ delay: 400 }}">
    {#each weather.forecast as day, key}
        <div>{getDay(key)}</div>
        <div><i class={'wi ' + CONDITION_PICTURES[$stateStore[day.icon].state]}/></div>
        <div>{roundTemp($stateStore[day.high].state)}&deg; / {roundTemp($stateStore[day.low].state)}&deg;</div>
    {/each}
</div>
{/if}
{/each}
{/if}

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

    .weather-extended {
        font-size: 20pt;
        margin-left: 10px;
        margin-top: 10px;
        font-weight: 600;
        text-shadow: 2px 2px #020101;
        -webkit-text-stroke: 1px black;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: column;
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        text-align: center;
        background-color: rgba(158, 153, 153, 0.825);
        border-radius: 20px;
        padding: 10px;
    }
</style>