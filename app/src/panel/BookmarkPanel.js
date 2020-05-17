import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import {api} from "../lib/ApiInstance";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';

const BookmarkPanel = ({ id, setActivePanel, showError, setLessonId, bookmarkState, setBookmarkState, setLessonBack }) => {
    const [bookmarkResult, setBookmarkResult] = useState(null);

    const back = () => {
        setLessonBack('search');
        setBookmarkState(null);
        setActivePanel('menu');
    }

    const doLesson = (id) => {
        setLessonBack('bookmark');
        setBookmarkState({
            bookmarkResult: bookmarkResult,
            scrollY: window.pageYOffset
        });
        setLessonId(id);
        setActivePanel('lesson');
    }

    useEffect(() => {
        async function fetchData() {
            const response = await api.bookmarkList(null).catch(showError);
            if (response) {
                setBookmarkResult(response);
            }
        }

        if (bookmarkResult === null) {
            if (bookmarkState) {
                setBookmarkResult(bookmarkState.bookmarkResult);
                window.scrollTo(0, bookmarkState.scrollY);
            } else {
                fetchData();
            }
        }
    }, [showError, bookmarkResult, bookmarkState]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Закладки
            </PanelHeader>
            {bookmarkResult === null ?
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Spinner size="small" style={{ marginTop: 20 }} />
                </div>
                :
                (bookmarkResult && bookmarkResult.list.length ?
                        <Group>
                            {bookmarkResult.list.map((item) =>
                                <SimpleCell expandable key={item.id} onClick={doLesson.bind(this, item.lessonId)}>
                                    {item.title}
                                </SimpleCell>
                            )}
                        </Group>
                    :
                    <Placeholder icon={<Icon56InfoOutline />}>
                        У вас еще нет ни одной закладки
                    </Placeholder>
                )
            }
        </Panel>
    );
}

BookmarkPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    setLessonId: PropTypes.func.isRequired,
    bookmarkState: PropTypes.object,
    setBookmarkState: PropTypes.func.isRequired,
    setLessonBack: PropTypes.func.isRequired,
};

export default BookmarkPanel;