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

const SearchPanel = ({ id, setActivePanel }) => {

    const [q, setQ] = useState('');
    const [lastQ, setLastQ] = useState('');
    const [rowsLeft, setRowsLeft] = useState(null);
    const [maxId, setMaxId] = useState(null);
    const [result, setResult] = useState(null);

    const doSearch = async () => {
        if (q && q !== lastQ) {
            setLastQ(q);
            const response = await api.lessonSearch(q, null).catch(api.logError);
            let result = null;
            if (response) {
                setRowsLeft(response.rowsLeft);
                setMaxId(response.maxId);
                result = response.list;
            }
            setResult(result);
        }
    };

    const doKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await doSearch();
        }
    };

    useEffect(() => {
        if (q === '' && result !== null) {
            setResult(null);
        }
    }, [q, result]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('menu')} />}>
                Поиск
            </PanelHeader>
            <Search value={q} onChange={(e) => setQ(e.target.value)} onBlur={doSearch} onKeyDown={doKeyDown} />
            {result === null ?
                <Div>
                    <Header mode="secondary">Информация</Header>
                    <Text weight="regular" style={{ marginBottom: 16 }}>
                        Введите название материала, например, <b>урок</b>
                    </Text>
                </Div>
                :
                <Div>
                    {result && result.length ?
                        <Group>
                            <Header mode="secondary">Результаты поиска</Header>
                            {result.map((item) =>
                                <SimpleCell expandable key={item.id}>
                                    {item.title}
                                </SimpleCell>
                            )}
                        </Group>
                        :
                        <Placeholder icon={<Icon56InfoOutline />}>
                            Ничего не найдено
                        </Placeholder>
                    }
                </Div>
            }
        </Panel>
    );
}

SearchPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired
};

export default SearchPanel;