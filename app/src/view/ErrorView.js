import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PropTypes from "prop-types";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";

const ErrorView = ({ id, errorCode, errorText }) => (
    <View id={id} activePanel="0">
        <Panel id="0">
            <PanelHeader>
                Грамматиста
            </PanelHeader>
            {errorCode && errorText &&
            <div>
                <Placeholder
                    icon={<Icon56DoNotDisturbOutline />}
                    header={'Ошибка ' + errorCode}
                >
                    {errorText}
                </Placeholder>
                <div style={{ textAlign: 'center' }}>
                    Попробуйте очистить кеш и перезапустить приложение
                </div>
            </div>
            }
        </Panel>
    </View>
);

ErrorView.propTypes = {
    id: PropTypes.string.isRequired,
    errorCode: PropTypes.number,
    errorText: PropTypes.string,
};

export default ErrorView;