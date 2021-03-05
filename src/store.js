import { readable } from 'svelte/store';
import { hassUrl, token } from './secrets'
import {
	createConnection,
	createLongLivedTokenAuth,
	subscribeEntities,
	callService
  } from "home-assistant-js-websocket";

let conn = null

export const stateStore = readable(null, function start(set) {
	const auth = createLongLivedTokenAuth(
		hassUrl,
		token
	);
	createConnection({ auth }).then(connection => {
		conn = connection;
		subscribeEntities(
			connection,
			entities => {
				set(entities);
			}
		)
		conn.addEventListener("disconnected", function disconnectHandler(connection, data) {
			console.log("Connection lost")
			set(null)
		})
	})
	return function stop() {
		conn.close()
	}
});


export const action = (data) => 
	callService(conn, data[0], data[1], null, {
		entity_id: data[2]
	});