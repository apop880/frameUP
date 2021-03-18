<script>
    import { stateStore } from '../apistore.js';
    import { configStore } from '../configstore.js';
    import { onDestroy } from 'svelte';
    import { flip } from 'svelte/animate';
    import { backIn } from 'svelte/easing';
    import CurrentWeather from './currentweather.svelte';
    import Forecast from './forecast.svelte';
    import '../css/weather-icons.min.css';

    const CONDITION_PICTURES = {
        "clear-night": "mdi:weather-night",
        "cloudy": "mdi:weather-cloudy",
        "fog": "mdi:weather-fog",
        "hail": "mdi:weather-hail",
        "lightning": "mdi:weather-lightning",
        "lightning-rainy": "mdi:weather-lightning-rainy",
        "partlycloudy": "mdi:weather-partly-cloudy",
        "pouring": "mdi:weather-pouring",
        "rainy": "mdi:weather-rainy",
        "snowy": "mdi:weather-snowy",
        "snowy-rainy": "mdi:weather-snowy-rainy",
        "sunny": "mdi:weather-sunny",
        "windy": "mdi:weather-windy",
        "windy-variant": "mdi:weather-windy-variant",
        "exceptional": "mdi:weather-sunny"
    }

    let componentArray = [
        CurrentWeather
    ]

    let timer;

    onDestroy(() => {
        clearTimeout(timer);
    })

    function toggleForecast() {
        clearTimeout(timer);
        if (componentArray.length === 2) {
            componentArray = componentArray.filter(c => c === CurrentWeather);
        }
        else {
            componentArray = [...componentArray, Forecast];
            timer = setTimeout(() => {
                toggleForecast();
            }, 30000)
        }
    }
</script>

{#if $stateStore !== null && $configStore.data.weather_entity !== ''}
{#each componentArray as component, key(component)}
<div animate:flip="{{duration: 400, easing: backIn}}" style="justify-self:end;">
<svelte:component this={component} on:click="{() => toggleForecast()}" {CONDITION_PICTURES} />
</div>
{/each}
{/if}