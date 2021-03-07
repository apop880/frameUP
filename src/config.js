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