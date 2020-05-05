import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Button from "@vkontakte/vkui/dist/components/Button/Button";

class WelcomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goRoute: props.goRoute,
            id: props.id,
            activePanel: props.activePanel
        }
    }

    render() {
        return (
            <View id={this.state.id} activePanel={this.state.activePanel}>
                <Panel id="0">
                    <Gallery
                        slideWidth="100%"
                        style={{ height: "100%" }}
                        bullets="dark"
                    >
                        <div style={{ backgroundColor: 'var(--destructive)' }}>
                            Welcome!
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </div>
                        <div style={{ backgroundColor: 'var(--button_commerce_background)' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                        </div>
                        <div style={{ backgroundColor: 'var(--accent)' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <Button size="xl" level="2" onClick={() => this.state.goRoute('home/menu')} >
                                Готово
                            </Button>
                        </div>
                    </Gallery>
                </Panel>
            </View>
        )
    }
}

export default WelcomeView;