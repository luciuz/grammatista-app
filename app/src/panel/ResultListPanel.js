import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {api} from "../lib/ApiInstance";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';
import Icon28ChevronRightOutline from '@vkontakte/icons/dist/28/chevron_right_outline';
import { platform, IOS } from '@vkontakte/vkui';

const osName = platform();

const ResultListPanel = ({ id, setActivePanel, setVariantId, resultListState, setResultListState, setResultBack}) => {
    const [resultListResult, setResultListResult] = useState(null);

    const back = () => {
        setResultBack('variant');
        setResultListState(null);
        setActivePanel('menu');
    }

    const doResult = (id) => {
        setResultBack('result-list');
        setResultListState({
            resultListResult: resultListResult,
            scrollY: window.pageYOffset
        });
        setVariantId(id);
        setActivePanel('result');
    }

    const doResultList = async () => {
        const response = await api.variantList(null).catch(api.logError);
        if (response) {
            setResultListResult(response);
        }
    }

    useEffect(() => {
        if (resultListResult === null) {
            if (resultListState) {
                setResultListResult(resultListState.resultListResult);
                window.scrollTo(0, resultListState.scrollY);
            } else {
                doResultList();
            }
        }
    }, [resultListResult, resultListState]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Результаты
            </PanelHeader>
            {resultListResult === null ?
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Spinner size="small" style={{ marginTop: 20 }} />
                </div>
                :
                (resultListResult && resultListResult.list.length ? <Div>
                        <Group>
                            {resultListResult.list.map((item) =>
                                <RichCell
                                    key={item.id}
                                    onClick={doResult.bind(this, item.id)}
                                    multiline
                                    before={item.isComplete ?
                                        <Icon28DoneOutline style={{color: 'var(--dynamic_green)', marginRight: 10 }} />
                                        :
                                        <Icon28CancelOutline style={{color: 'var(--dynamic_red)', marginRight: 10 }} />
                                    }
                                    after={osName === IOS && <Icon28ChevronRightOutline />}
                                    caption={'#' + item.id}
                                >
                                    {item.title}
                                </RichCell>
                            )}
                        </Group>
                    </Div>
                    :
                    <Placeholder icon={<Icon56InfoOutline />}>
                        У вас еще нет никаких результатов
                    </Placeholder>
                )
            }
        </Panel>
    );
}

ResultListPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    setVariantId: PropTypes.func.isRequired,
    resultListState: PropTypes.object,
    setResultListState: PropTypes.func.isRequired,
    setResultBack: PropTypes.func.isRequired,
};

export default ResultListPanel;