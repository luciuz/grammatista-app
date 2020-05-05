import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import InitView from './view/InitView';
import WelcomeView from './view/WelcomeView';
import HomeView from './view/HomeView';

import ApiClass from './lib/Api';
import StorageClass from './lib/Storage';
import ApiManagerClass from './lib/ApiManager';

const api = new ApiClass();
const apiManager = new ApiManagerClass(api, new StorageClass());

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
			if (!api.token) {
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
			<InitView id='init' popout={popout} />
			<WelcomeView id='welcome' activePanel={activePanel} goRoute={goRoute} />
			<HomeView id='home' api={api} activePanel={activePanel} activeParams={activeParams} />
		</Root>
	);
}

export default App;

