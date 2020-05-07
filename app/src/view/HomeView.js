import React, {useState} from 'react';
import View from "@vkontakte/vkui/dist/components/View/View";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List';
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28ListCheckOutline from '@vkontakte/icons/dist/28/list_check_outline';
import PropTypes from "prop-types";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';
import SearchPanel from "../panels/SearchPanel";

const HomeView = ({ id, setActiveView }) => {

    const [activePanel, setActivePanel] = useState('menu');

    return (
        <View id={id} activePanel={activePanel}>
            <Panel id="menu">
                <PanelHeader>
                    Грамматиста
                </PanelHeader>
                <Group>
                    <List>
                        <Cell expandable before={<Icon28SearchOutline />} onClick={() => setActivePanel('search')}>Поиск</Cell>
                        <Cell expandable before={<Icon28FavoriteOutline />} onClick={() => setActivePanel('bookmark')}>Закладки</Cell>
                        <Cell expandable before={<Icon28ListCheckOutline />} onClick={() => setActivePanel('done')}>Пройдено</Cell>
                    </List>
                </Group>
            </Panel>
            <SearchPanel id="search" setActivePanel={setActivePanel} />
            <Panel id="bookmark">
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('menu')} />}>
                    Закладки
                </PanelHeader>
                <Placeholder
                    icon={<Icon56InfoOutline />}
                >
                    У вас еще нет ни одной закладки
                </Placeholder>
            </Panel>
            <Panel id="done">
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('menu')} />}>
                    Пройдено
                </PanelHeader>
                <Placeholder
                    icon={<Icon56InfoOutline />}
                >
                    У вас еще нет ни одного пройденного материала
                </Placeholder>
            </Panel>
        </View>
    );
}

HomeView.propTypes = {
    id: PropTypes.string.isRequired,
    setActiveView: PropTypes.func.isRequired
};

export default HomeView;