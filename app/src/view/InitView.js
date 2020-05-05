import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PropTypes from "prop-types";

const InitView = ({ id, activePanel, popout }) => (
    <View id={id} activePanel={activePanel} popout={popout}>
        <Panel id="0">
        </Panel>
    </View>
);

InitView.propTypes = {
    id: PropTypes.string.isRequired,
    activePanel: PropTypes.string.isRequired,
    popout: PropTypes.element
};

export default InitView;