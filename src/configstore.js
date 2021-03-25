import { get, writable } from 'svelte/store';

export const loadConfig = async (name) => {
	const res = await fetch('/get_config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({"name": name})
	})
	const config = await res.json();
	configStore.setName(name);
	configStore.setData(config);
}

export const saveConfig = async () => {
	const res = await fetch('/update_config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({"name": get(configStore).name, "config": get(configStore).data})
	})
}

const { subscribe, set, update } = writable({
	"name": '',
	"data": {
		"weather_entity": '',
		"sensors": []
	},
	"mode": "edit"
});

export const configStore = {
	subscribe,
	set,
	update,

	setName: (value) => update(n => {
		n.name = value
		return n
	}),

	setData: (value) => update(n => {
		n.data = value;
		return n;
	}),

	setMode: (value) => update(n => {
		n.mode = value;
		return n;
	})
}

const configName = localStorage.getItem('configName');

if(configName) {
	loadConfig(configName);
	configStore.setMode("view")
}