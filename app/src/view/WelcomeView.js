import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';

class WelcomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            goRoute: props.goRoute,
            id: props.id,
            activePanel: props.activePanel
        }

        this.nextSlide = () => {
            this.setState({slideIndex: this.state.slideIndex + 1 });
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
                        slideIndex={this.state.slideIndex}
                        onChange={slideIndex => this.setState({slideIndex})}
                    >
                        <div style={{ backgroundColor: 'var(--destructive)' }}>
                            <Placeholder
                                icon={<Icon56UsersOutline />}
                                header="Добро пожаловать в Грамматиста!"
                                action={<Button size="l" onClick={this.nextSlide}>Далее</Button>}
                            >
                                Школа Грамматиста — мини-приложение для обучения!
                            </Placeholder>
                        </div>
                        <div style={{ backgroundColor: 'var(--button_commerce_background)' }}>
                            <Placeholder
                                icon={<Icon56UsersOutline />}
                                header="1. Изучайте материалы"
                                action={<Button size="l" onClick={this.nextSlide}>Далее</Button>}
                            >
                                Находите интересные материалы, уроки, курсы. Изучайте. Добавляйте их в закладки.
                            </Placeholder>
                        </div>
                        <div style={{ backgroundColor: 'var(--accent)' }}>
                            <Placeholder
                                icon={<Icon56UsersOutline />}
                                header="2. Проходите тесты"
                                action={<Button size="l" onClick={() => this.state.goRoute('home/menu')} >
                                    Понятно
                                </Button>}
                            >
                                Проходите легкое тестирование в конце материала для закрепления изученного!
                            </Placeholder>
                        </div>
                    </Gallery>
                </Panel>
            </View>
        )
    }
}

export default WelcomeView;