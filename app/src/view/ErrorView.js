import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PropTypes from "prop-types";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import FetchError from "../lib/FetchError";

const ErrorView = ({ id, error }) => (
    <View id={id} activePanel="0">
        <Panel id="0">
            <PanelHeader>
                Грамматиста
            </PanelHeader>
            <Placeholder
                icon={<Icon56DoNotDisturbOutline />}
                header={'Ошибка ' + error.code}
            >
                Попробуйте очистить кеш и перезапустить приложение
            </Placeholder>
        </Panel>
    </View>
);

ErrorView.propTypes = {
    id: PropTypes.string.isRequired,
    error: PropTypes.instanceOf(FetchError),
};

export default ErrorView;