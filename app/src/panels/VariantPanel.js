import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import {api} from "../lib/ApiInstance";
import PropTypes from "prop-types";

const VariantPanel = ({ id, setActivePanel, variantId}) => {
    const [variant, setVariant] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const variant = await api.getVariant(variantId).catch(api.logError);
            if (variant) {
                setVariant(variant);
            }
        }

        if (!variant) {
            fetchData();
        }
    }, [variantId, variant]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('lesson')} />}>
                Тестирование
            </PanelHeader>
                {variant && <Div>
                    Id #{variant.id}
            </Div>}
        </Panel>
    );
}

VariantPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    variantId: PropTypes.number,
};

export default VariantPanel;