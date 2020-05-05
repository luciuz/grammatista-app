import React from 'react';
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';

class HomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goRoute: props.goRoute,
            id: props.id,
            activePanel: props.activePanel
        }

        this.api = props.api;

        this.route = (route) => {
            this.state.goRoute(route);
        }
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
                            <Cell expandable before={<Icon28SearchOutline />} onClick={() => this.route('home/search')}>Поиск</Cell>
                            <Cell expandable before={<Icon28FavoriteOutline />} onClick={() => this.route('home/bookmark')}>Закладки</Cell>
                            <Cell expandable before={<Icon28ListCheckOutline />} onClick={() => this.route('home/done')}>Пройдено</Cell>
                            <Cell expandable before={<Icon28ListCheckOutline />} onClick={() => this.route('welcome/0')}>Welcome 0</Cell>
                            <Cell expandable before={<Icon28ListCheckOutline />} onClick={() => this.route('welcome/1')}>Welcome 1</Cell>
                        </List>
                    </Group>
                </Panel>
                <Panel id="search">
                    <PanelHeader separator={false} left={<PanelHeaderBack onClick={() => this.route('home/menu')} />}>
                        <Search />
                    </PanelHeader>
                    Поиск
                </Panel>
                <Panel id="bookmark">
                    <PanelHeader left={<PanelHeaderBack onClick={() => this.route('home/menu')} />}>
                        Закладки
                    </PanelHeader>
                    Закладки
                </Panel>
                <Panel id="done">
                    <PanelHeader left={<PanelHeaderBack onClick={() => this.route('home/menu')} />}>
                        Пройдено
                    </PanelHeader>
                    Пройдено
                </Panel>
            </View>
        )
    }
}

export default HomeView;