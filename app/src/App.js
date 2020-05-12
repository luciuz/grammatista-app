import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/index.css';

import InitView from './view/InitView';
import WelcomeView from './view/WelcomeView';
import HomeView from './view/HomeView';

import { api } from './lib/ApiInstance';

const App = () => {
	const [activeView, setActiveView] = useState('init');
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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
			if (!api.getClient().getToken()) {
				const response = await api.auth().catch(api.logError);
				if (response && response.view) {
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