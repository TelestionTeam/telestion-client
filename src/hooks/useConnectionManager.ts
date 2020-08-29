import { useEffect } from 'react';
import EventBus from '../lib/vertxEventBus';

import {
	changeConnectionState,
	deleteEventBus,
	newEventBus
} from '../model/Connection';
import { setAuthenticated, setError } from '../model/AuthState';

import useAuthState from './useAuthState';
import useConnection from './useConnection';
import useLogger from './useLogger';

export default function useConnectionManager() {
	const logger = useLogger('Connection Manager');
	const [{ credentials, authenticated }, authDispatch] = useAuthState();
	const [{ eventBus }, connectionDispatch] = useConnection();

	useEffect(() => {
		let errorTimerId: any;
		if (credentials) {
			if (!eventBus) {
				const eb = new EventBus(credentials.serverUrl);

				eb.onOpen = () => {
					logger.success('Event bus opened');
					connectionDispatch(changeConnectionState('connected'));
					// TODO: add authentication
					// user is authenticated
					authDispatch(setAuthenticated());
					// authDispatch(setError('Invalid credentials'));
					eb.enableReconnect(true);
				};

				eb.onClose = () => {
					logger.warn('Event bus closed');
					connectionDispatch(changeConnectionState('disconnected'));
					// set error and clear credentials if not authenticated
					// aka automatic reconnect not enabled
					if (!eb.isReconnectEnabled) {
						authDispatch(
							setError(
								'Cannot connect to backend server. Is the server address correct?'
							)
						);
					}
				};

				eb.onError = err => {
					logger.error('Event bus error: ', err);
					connectionDispatch(changeConnectionState('error'));
					if (errorTimerId) clearTimeout(errorTimerId);
					errorTimerId = setTimeout(() => {
						connectionDispatch(changeConnectionState('connected'));
					}, 2000);
				};

				eb.onReconnect = () => {
					logger.success('Event bus has reconnected');
				};

				// add eventbus to connection status
				connectionDispatch(newEventBus(eb));
			}
		} else {
			if (eventBus) {
				if (errorTimerId) clearTimeout(errorTimerId);
				// user is no longer logged in
				connectionDispatch(deleteEventBus());
			}
		}
	}, [
		authDispatch,
		authenticated,
		connectionDispatch,
		credentials,
		eventBus,
		logger
	]);
}
