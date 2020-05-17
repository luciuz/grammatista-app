import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Search from '@vkontakte/vkui/dist/components/Search/Search';
import PropTypes from "prop-types";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import {api} from "../lib/ApiInstance";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";

const SearchPanel = ({ id, setActivePanel, showError, setLessonId, searchState, setSearchState, setLessonBack }) => {
    const [q, setQ] = useState('');
    const [lastQ, setLastQ] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const back = () => {
        setSearchState(null);
        setActivePanel('menu');
    }

    const doLesson = (id) => {
        setLessonBack('search');
        setSearchState({
            q: q,
            lastQ: lastQ,
            searchResult: searchResult,
            scrollY: window.pageYOffset
        });
        setLessonId(id);
        setActivePanel('lesson');
    }

    const doSearch = async () => {
        if (q && q !== lastQ) {
            setLastQ(q);
            setLoading(true);
            const response = await api.lessonSearch(q, null).catch(showError);
            if (response) {
                setLoading(false);
                setSearchResult(response);
            }
        }
    }

    const doKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await doSearch();
        }
    }

    useEffect(() => {
        if (q === '' && searchResult) {
            setSearchState(null);
            setSearchResult(null);
        }
    }, [q, searchResult, setSearchState]);

    useEffect(() => {
        if (searchResult === null) {
            if (searchState) {
                setQ(searchState.q);
                setLastQ(searchState.lastQ);
                setSearchResult(searchState.searchResult);
                window.scrollTo(0, searchState.scrollY);
            }
        }
    }, [searchResult, searchState]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Поиск
            </PanelHeader>
            <Search value={q} onChange={(e) => setQ(e.target.value)} onBlur={doSearch} onKeyDown={doKeyDown} />
            {loading ? <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Spinner size="small" style={{ marginTop: 20 }} />
                </div>
                :
                <div>
                    {searchResult === null ?
                        <div>
                            <Header mode="secondary">Информация</Header>
                            <Div>
                                <Text weight="regular" style={{ marginBottom: 16 }}>
                                    Введите название материала, например, <b>дроби</b>
                                </Text>
                            </Div>
                        </div>
                        :
                        <div>
                            {searchResult && searchResult.list.length ?
                                <Group>
                                    <Header mode="secondary">Результаты поиска</Header>
                                    {searchResult.list.map((item) =>
                                        <SimpleCell expandable key={item.id} onClick={doLesson.bind(this, item.id)}>
                                            {item.title}
                                        </SimpleCell>
                                    )}
                                </Group>
                                :
                                <Placeholder icon={<Icon56InfoOutline />}>
                                    Ничего не найдено
                                </Placeholder>
                            }
                        </div>
                    }
                </div>
            }
        </Panel>
    );
}

SearchPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    setLessonId: PropTypes.func.isRequired,
    searchState: PropTypes.object,
    setSearchState: PropTypes.func.isRequired,
    setLessonBack: PropTypes.func.isRequired,
};

export default SearchPanel;