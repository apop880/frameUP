import lightbulbLine from '@iconify-icons/ri/lightbulb-line';
import Light from './components/cards/light.svelte';
import Scene from './components/cards/scene.svelte';

export const weather = {
    temperature_sensor: "sensor.rounded_temp",
    icon: 'sensor.dark_sky_icon'
};

export const notifications = {
    'binary_sensor.downstairs_back_door': {state: 'on', text: 'Downstairs Back Door is open'},
    'binary_sensor.front_door': {state: 'on', text: 'Front Door is open'},
    'binary_sensor.garage_entry_door': {state: 'on', text: 'Garage Entry Door is open'},
    'binary_sensor.upstairs_back_door': {state: 'on', text: 'Upstairs Back Door is open'},
    'cover.garage_door': {state: 'open', text: 'Garage Door is open - tap to close', service: 'cover.close', target: 'cover.garage_door'}
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
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'Upstairs Lights On', icon: lightbulbLine, row: 1, col: 1}},
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'Upstairs Lights Off', icon: lightbulbLine, row: 1, col: 2}},
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'All Lights Off', icon: lightbulbLine, row: 1, col: 3}},
                {card: Scene, config: {scene: 'light.kitchen_table', name: 'Movie Lighting', icon: lightbulbLine, row: 1, col: 4}},
                {card: Light, config: {entity: 'light.kitchen_table', name: 'Kitchen Table', icon: lightbulbLine, row: 2, col: 1}},
                {card: Light, config: {entity: 'light.kitchen_can_light_switch', name: 'Kitchen Can Lights', icon: lightbulbLine, row: 2, col: 2}},
                {card: Light, config: {entity: 'light.kitchen_can_light_switch', name: 'Kitchen Can Lights', icon: lightbulbLine, row: 2, col: 3}}
            ]},
            {width: '2fr', justify: 'end', config: [
                {card: Light, config: {entity: 'light.kitchen_table', name: 'Kitchen Table', icon: lightbulbLine, row: 1, col: 1}},
                {card: Light, config: {entity: 'light.kitchen_can_light_switch', name: 'Kitchen Can Lights', icon: lightbulbLine, row: 1, col: 2}}
            ]}
        ]
    }
]