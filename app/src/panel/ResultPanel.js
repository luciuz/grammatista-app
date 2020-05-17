import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {api} from "../lib/ApiInstance";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";

const ResultPanel = ({ id, setActivePanel, showError, variantId, resultBack}) => {
    const [variant, setVariant] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const back = () => {
        setActivePanel(resultBack);
    };

    useEffect(() => {
        async function fetchData() {
            const variant = await api.getVariant(variantId).catch(showError);
            if (variant) {
                setVariant(variant);
                if (!variant.isComplete) {
                    setShowMore(true);
                }
            }
        }
        fetchData();
    }, [showError, variantId]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Результат
            </PanelHeader>
            {variant && <Div>
                {variant.isComplete ?
                    <Placeholder
                        icon={<Icon56CheckCircleOutline style={{ color: 'var(--dynamic_green)' }} />}
                        header="Тест пройден!"
                        action={<Button size="l" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Скрыть вопросы' : 'Показать вопросы'}
                        </Button>}
                    >
                        {variant.title}
                    </Placeholder>
                    :
                    <Placeholder
                        icon={<Icon56DoNotDisturbOutline style={{ color: 'var(--dynamic_red)' }} />}
                        header="Не пройдено!"
                    >
                        {variant.title}
                    </Placeholder>
                }
                {showMore && variant.question.list.map((item, i) =>
                    <SimpleCell key={i} disabled style={{
                        background: variant.result.list[i] ?
                            'var(--im_bubble_expiring)'
                            :
                            'var(--field_error_background)'
                    }}>
                        {i+1}. {item.title}
                    </SimpleCell>
                )}
            </Div>}
        </Panel>
    );
}

ResultPanel.propTypes = {
    id: PropTypes.string.isRequired,
    showError: PropTypes.func.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    variantId: PropTypes.number,
    resultBack: PropTypes.string.isRequired,
};

export default ResultPanel;