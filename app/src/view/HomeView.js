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
import SearchPanel from "../panel/SearchPanel";
import LessonPanel from "../panel/LessonPanel";
import VariantPanel from "../panel/VariantPanel";
import BookmarkPanel from "../panel/BookmarkPanel";

const HomeView = ({ id, setActiveView }) => {

    const [activePanel, setActivePanel] = useState('menu');
    const [searchState, setSearchState] = useState(null);
    const [lessonId, setLessonId] = useState(null);
    const [lessonState, setLessonState] = useState(null);
    const [variantId, setVariantId] = useState(null);
    const [variantState, setVariantState] = useState(null);
    const [bookmarkState, setBookmarkState] = useState(null);
    const [lessonBack, setLessonBack] = useState('search');

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
            <SearchPanel
                id="search"
                setActivePanel={setActivePanel}
                setLessonId={setLessonId}
                searchState={searchState}
                setSearchState={setSearchState}
                setLessonBack={setLessonBack}
            />
            <LessonPanel
                id="lesson"
                setActivePanel={setActivePanel}
                lessonId={lessonId}
                lessonState={lessonState}
                setLessonState={setLessonState}
                setVariantId={setVariantId}
                lessonBack={lessonBack}
                setBookmarkState={setBookmarkState}
            />
            <VariantPanel
                id="variant"
                setActivePanel={setActivePanel}
                variantId={variantId}
                variantState={variantState}
                setVariantState={setVariantState}
                lessonState={lessonState}
                setLessonState={setLessonState}
            />
            <BookmarkPanel
                id="bookmark"
                setActivePanel={setActivePanel}
                setLessonId={setLessonId}
                bookmarkState={bookmarkState}
                setBookmarkState={setBookmarkState}
                setLessonBack={setLessonBack}
            />
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