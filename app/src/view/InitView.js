import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PropTypes from "prop-types";

const InitView = ({ id, popout }) => (
    <View id={id} activePanel="0" popout={popout}>
        <Panel id="0">
        </Panel>
    </View>
);

InitView.propTypes = {
    id: PropTypes.string.isRequired,
    popout: PropTypes.element
};

export default InitView;