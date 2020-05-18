import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/index.css';

import InitView from './view/InitView';
import WelcomeView from './view/WelcomeView';
import HomeView from './view/HomeView';
import ErrorView from "./view/ErrorView";

import {api, storage, createTransToken} from './lib/ApiInstance';

const App = () => {
	const [activeView, setActiveView] = useState('init');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [errorCode, setErrorCode] = useState(null);
	const [errorText, setErrorText] = useState(null);

	const showError = (e) => {
		const userError = api.isUserError(e);
		if (userError) {
			const [newErrorCode, newErrorText] = userError;
			if (newErrorCode === api.getClient().STATUS_UNAUTHORIZED) {
				storage.delete(storage.TOKEN);
			}
			setErrorCode(newErrorCode);
			setErrorText(newErrorText);
			setActiveView('error');
		}
	}

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			let view = 'home';

			const savedToken = storage.get(storage.TOKEN);
			if (savedToken) {
				api.setToken(savedToken);
				const response = await api.userCheck().catch(showError);
				if (!response) {
					return;
				}
			}

			if (!api.getToken()) {
				const authTransToken = createTransToken();
				const response = await api.userAuth(authTransToken).catch(showError);
				if (!response) {
					return;
				}
				api.setToken(response.token);
				storage.set(storage.TOKEN, response.token);
				if (response.view) {
					view = response.view;
				}
			}

			setPopout(null);
			setActiveView(view);
		}
		fetchData();
	}, []);

	return (
		<Root activeView={activeView}>
			<InitView id='init' popout={popout} />
			<WelcomeView id='welcome' setActiveView={setActiveView} />
			<HomeView id='home' setActiveView={setActiveView} showError={showError} />
			<ErrorView id='error' errorCode={errorCode} errorText={errorText} />
		</Root>
	);
}

export default App;