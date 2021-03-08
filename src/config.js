import lightbulbLine from '@iconify-icons/ri/lightbulb-line';
import sceneryIcon from '@iconify-icons/uim/scenery';
import bxCameraMovie from '@iconify-icons/bx/bx-camera-movie';
import bxsDoorOpen from '@iconify-icons/bx/bxs-door-open';
import garageOpenVariant from '@iconify-icons/mdi/garage-open-variant';

import Light from './components/cards/light.svelte';
import Scene from './components/cards/scene.svelte';
import Break from './components/cards/break.svelte';

export const weather = {
    temperature_sensor: "sensor.rounded_temp",
    icon: 'sensor.dark_sky_icon',
    forecast: [{icon: 'sensor.dark_sky_icon_0d', high: 'sensor.dark_sky_daytime_high_temperature_0d', low: 'sensor.dark_sky_overnight_low_temperature_0d'},
        {icon: 'sensor.dark_sky_icon_1d', high: 'sensor.dark_sky_daytime_high_temperature_1d', low: 'sensor.dark_sky_overnight_low_temperature_1d'},
        {icon: 'sensor.dark_sky_icon_2d', high: 'sensor.dark_sky_daytime_high_temperature_2d', low: 'sensor.dark_sky_overnight_low_temperature_2d'}
    ]
};

export const notifications = {
    'binary_sensor.downstairs_back_door': {state: 'on', text: 'Downstairs Back Door is open', icon: bxsDoorOpen},
    'binary_sensor.front_door': {state: 'on', text: 'Front Door is open', icon: bxsDoorOpen},
    'binary_sensor.garage_entry_door': {state: 'on', text: 'Garage Entry Door is open', icon: bxsDoorOpen},
    'binary_sensor.upstairs_back_door': {state: 'on', text: 'Upstairs Back Door is open', icon: bxsDoorOpen},
    'cover.garage_door': {state: 'open', text: 'Garage Door is open - tap to close', service: 'cover.close', target: 'cover.garage_door', icon: garageOpenVariant}
}

export const tasks = {
    'input_boolean.nina_meds': {text: 'Nina needs her pill'},
    'input_boolean.trash': {text: 'Put out trash and recyling'}
}

export const views = [
    {
        name: 'lights',
        icon: lightbulbLine,
        sections: [
            {width: '3fr', justify: 'start', config: [
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'Upstairs Lights On', icon: sceneryIcon}},
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'Upstairs Lights Off', icon: sceneryIcon}},
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'All Lights Off', icon: sceneryIcon}},
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'Movie Lighting', icon: bxCameraMovie}},
                {card: Break},
                {card: Light, config: {entity: 'light.kitchen_table', name: 'Kitchen Table', icon: lightbulbLine}},
                {card: Light, config: {entity: 'light.kitchen_can_light_switch', name: 'Kitchen Can Lights', icon: lightbulbLine}},
                {card: Break},
                {card: Light, config: {entity: 'light.living_can_lights', name: 'Living Room Can Lights', icon: lightbulbLine}},
                {card: Light, config: {entity: 'light.living_room_fan_light', name: 'Living Room Fan Light', icon: lightbulbLine}},
                {card: Break},
                {card: Light, config: {entity: 'light.chandelier', name: 'Chandelier', icon: lightbulbLine}},
                {card: Light, config: {entity: 'light.dining_lamp', name: 'Dining Room Lamp', icon: lightbulbLine}},
            ]},
            {width: '2fr', justify: 'end', config: [/*
                {card: Blank},
                {card: Light, config: {entity: 'light.kitchen_table', name: 'Kitchen Table', icon: lightbulbLine}},
                {card: Light, config: {entity: 'light.kitchen_can_light_switch', name: 'Kitchen Can Lights', icon: lightbulbLine}}
            */]}
        ]
    }
]