import { readable } from 'svelte/store';
import { hassUrl, token } from './secrets'
import {
	createConnection,
	createLongLivedTokenAuth,
	subscribeEntities,
	callService
  } from "home-assistant-js-websocket";

let conn = null;

export const stateStore = readable(null, async function start(set) {
	const auth = createLongLivedTokenAuth(
		hassUrl,
		token
	);
	conn = await createConnection({ auth });
	subscribeEntities(
		conn,
		entities => {
			set(entities);
		}
	)
	conn.addEventListener(
		"disconnected",
		function disconnectHandler(connection, data) {
			console.log("Connection lost")
			set(null)
		}
	)
	return function stop() {
		conn.close()
	}
});


export const action = (serviceType, target) => {
	let [domain, service] = serviceType.split('.');
	callService(conn, domain, service, null, {
		entity_id: target
	});
}