import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/index.css';

import InitView from './view/InitView';
import WelcomeView from './view/WelcomeView';
import HomeView from './view/HomeView';

import {api, storage, createTransToken} from './lib/ApiInstance';

const App = () => {
	const [activeView, setActiveView] = useState('init');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const getAuthTransToken = () => {
		const key = storage.AUTH_TRANSACTION_TOKEN;
		const token = storage.get(key);
		if (token) {
			return token;
		}

		const newToken = createTransToken();
		storage.set(key, newToken);
		return newToken;
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
			}
			if (!api.getToken()) {
				const authTransToken = getAuthTransToken();
				const response = await api.auth(authTransToken).catch(api.logError);
				if (response) {
					api.setToken(response.token);
					storage.set(storage.TOKEN, response.token);
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
			<HomeView id='home' setActiveView={setActiveView} />
		</Root>
	);
}

export default App;