import { writable } from 'svelte/store';

export const loadConfig = async (name) => {
	const res = await fetch('/get_config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({"name": name})
	})
	config = await res.json();
	configStore.setName(name);
	configStore.setData(config);
}

//createConfig

const { subscribe, set, update } = writable({
	"name": '',
	"data": {},
	"mode": "edit"
});

export const configStore = {
	subscribe,
	set,
	update,

	setName: value => update(self => {
		self.name = value;
		return self;
	}),

	setData: value => update(self => {
		self.data = value;
		return self;
	}),

	setMode: value => update(self => {
		self.mode = value;
		return self;
	})
}

const configName = localStorage.getItem('configName');

if(configName) {
	loadConfig(configName);
}