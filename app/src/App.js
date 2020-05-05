import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/index.css';

import InitView from './view/InitView';
import WelcomeView from './view/WelcomeView';
import HomeView from './view/HomeView';

import { api, apiManager } from './lib/ApiInstance';

const App = () => {
	const [activeView, setActiveView] = useState('init');
	const [activePanel, setActivePanel] = useState('0');
	const [activeParams, setActiveParams] = useState(null);
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
			let route = null;
			if (!api.getToken()) {
				const response = await apiManager.apiAuth().catch(api.logError);
				if (response && response.route) {
					route = response.route;
				}
			}

			setPopout(null);
			goRoute(route);
		}
		fetchData();
	}, []);

	const goRoute = route => {
		const pr = route ? apiManager.parseRoute(route) : apiManager.homeRoute();
		setActiveParams(pr.params);
		setActivePanel(pr.activePanel);
		setActiveView(pr.activeView);
	};

	return (
		<Root activeView={activeView}>
			<InitView id='init' activePanel={activePanel} popout={popout} />
			<WelcomeView id='welcome' activePanel={activePanel} goRoute={goRoute} />
			<HomeView id='home' activePanel={activePanel} activeParams={activeParams} goRoute={goRoute} />
		</Root>
	);
}

export default App;