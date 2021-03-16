import { writable } from 'svelte/store';

const configStore = writable('');
const configName = localStorage.getItem('configName');

if(configName) {
	loadConfig(configName);
}

const loadConfig = async (configName) => {
	const res = await fetch('/get_config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: {"name": configName}
	})
	config = await res.json();
	store.updateConfig(configName, config);
}

const updateConfig = (configName, configData) => {
	configStore.set(
		{
			"name": configName,
			"data": configData
		}
	);
}

export default {
	subscribe: configStore.subscribe,
	updateConfig
};