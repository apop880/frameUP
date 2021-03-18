<script>
    import { stateStore } from '../apistore.js';
    import { configStore } from '../configstore.js';
    import { fly } from 'svelte/transition';
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
    {#each Array(3) as _, row}
        <div>{getDay(row)}</div>
        <div><span class="iconify" data-icon={CONDITION_PICTURES[$stateStore[$configStore.data.weather_entity].attributes.forecast[row].condition]}></span></div>
        <div>{roundTemp($stateStore[$configStore.data.weather_entity].attributes.forecast[row].temperature)}&deg; / {roundTemp($stateStore[$configStore.data.weather_entity].attributes.forecast[row].templow)}&deg;</div>
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