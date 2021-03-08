<script>
    import { stateStore } from '../store.js';
    import { flip } from 'svelte/animate';
    import { backIn } from 'svelte/easing';
    import CurrentWeather from './currentweather.svelte';
    import Forecast from './forecast.svelte';
    import '../css/weather-icons.min.css';

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

    const components = [
        {component: CurrentWeather, show: true},
        {component: Forecast, show: false}
    ];

    function toggleForecast() {
        components[1].show = !components[1].show;
    }
</script>

{#if $stateStore !== null}
{#each components as component, key(component)}
<div animate:flip="{{duration: 400, easing: backIn}}" style="justify-self:end;">
{#if component.show}
<svelte:component this={component.component} on:click="{() => toggleForecast()}" {CONDITION_PICTURES} />
{/if}
</div>
{/each}
{/if}