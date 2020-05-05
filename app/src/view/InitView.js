import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';

class InitView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popout: props.popout,
            id: props.id,
            activePanel: '0'
        }
    }

    render() {
        return (
            <View id={this.state.id} activePanel={this.state.activePanel} popout={this.state.popout}>
                <Panel id="0">
                </Panel>
            </View>
        )
    }
}

export default InitView;