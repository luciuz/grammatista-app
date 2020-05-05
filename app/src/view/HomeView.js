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
import PropTypes from "prop-types";

const HomeView = ({ id, activePanel, goRoute }) => (
    <View id={id} activePanel={activePanel}>
        <Panel id="menu">
            <PanelHeader>
                Грамматиста
            </PanelHeader>
            <Group>
                <List>
                    <Cell expandable before={<Icon28SearchOutline />} onClick={() => goRoute('home/search')}>Поиск</Cell>
                    <Cell expandable before={<Icon28FavoriteOutline />} onClick={() => goRoute('home/bookmark')}>Закладки</Cell>
                    <Cell expandable before={<Icon28ListCheckOutline />} onClick={() => goRoute('home/done')}>Пройдено</Cell>
                </List>
            </Group>
        </Panel>
        <Panel id="search">
            <PanelHeader separator={false} left={<PanelHeaderBack onClick={() => goRoute('home/menu')} />}>
                <Search />
            </PanelHeader>
            Поиск
        </Panel>
        <Panel id="bookmark">
            <PanelHeader left={<PanelHeaderBack onClick={() => goRoute('home/menu')} />}>
                Закладки
            </PanelHeader>
            Закладки
        </Panel>
        <Panel id="done">
            <PanelHeader left={<PanelHeaderBack onClick={() => goRoute('home/menu')} />}>
                Пройдено
            </PanelHeader>
            Пройдено
        </Panel>
    </View>
);

HomeView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    goRoute: PropTypes.func
};

export default HomeView;