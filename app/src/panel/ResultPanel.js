import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PropTypes from "prop-types";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {api} from "../lib/ApiInstance";

const ResultPanel = ({ id, setActivePanel, variantId, resultBack}) => {
    const [variant, setVariant] = useState(null);

    const back = () => {
        setActivePanel(resultBack);
    };

    useEffect(() => {
        async function fetchData() {
            const variant = await api.getVariant(variantId).catch(api.logError);
            if (variant) {
                setVariant(variant);
            }
        }
        fetchData();
    }, [variantId]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Результат
            </PanelHeader>
            {variant && <Div>
                {variant.isComplete ? 'true' : 'false'}
            </Div>}
        </Panel>
    );
}

ResultPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    variantId: PropTypes.number,
    resultBack: PropTypes.string.isRequired,
};

export default ResultPanel;