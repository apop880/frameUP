<script>
    import { stateStore } from '../store.js';
    import { weather } from "../config.js";
    import '../css/weather-icons.min.css';
    import { fly, fade } from 'svelte/transition';
    export let CONDITION_PICTURES;

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function getDay(key) {
        let day=new Date();
        return weekday[(day.getDay() + key) % 7].substring(0, 3);
    }

    function roundTemp(val) {
        return Math.round(val);
    }
</script>

<div class="weather-extended" on:click in:fly="{{ y: -200, duration: 500, delay: 750 }}" out:fly="{{ y: -200, duration: 500 }}">
    {#each weather.forecast as day, key}
        <div>{getDay(key)}</div>
        <div><i class={'wi ' + CONDITION_PICTURES[$stateStore[day.icon].state]}/></div>
        <div>{roundTemp($stateStore[day.high].state)}&deg; / {roundTemp($stateStore[day.low].state)}&deg;</div>
    {/each}
</div>

<style>
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