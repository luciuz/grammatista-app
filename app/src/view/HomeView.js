import React from 'react';
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';

class HomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            activePanel: props.activePanel
        }

        this.api = props.api;
    }

    render() {
        return (
            <View id={this.state.id} activePanel={this.state.activePanel}>
                <Panel id="menu">
                    <PanelHeader>
                        Грамматиста
                    </PanelHeader>
                    <Group>
                        <List>
                            <Cell expandable before={<Icon28UserOutline />}>Учетная запись</Cell>
                            <Cell expandable before={<Icon28SettingsOutline />}>Основные</Cell>
                            <Cell expandable before={<Icon28PrivacyOutline />}>Приватность</Cell>
                        </List>
                    </Group>
                    {this.api.token}
                </Panel>
            </View>
        )
    }
}

export default HomeView;