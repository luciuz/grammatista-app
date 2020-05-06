import React, {useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';
import PropTypes from "prop-types";

const WelcomeView = ({ id, setActiveView }) => {

    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => (
        setSlideIndex(slideIndex+1)
    );

    return (
        <View id={id} activePanel="0">
            <Panel id="0">
                <Gallery
                    slideWidth="100%"
                    style={{ height: "100%" }}
                    bullets="dark"
                    slideIndex={slideIndex}
                    onChange={s => setSlideIndex(s)}
                >
                    <div style={{ backgroundColor: 'var(--destructive)' }}>
                        <Placeholder
                            icon={<Icon56UsersOutline />}
                            header="Добро пожаловать в Грамматиста!"
                            action={<Button size="l" onClick={nextSlide}>Далее</Button>}
                        >
                            Школа Грамматиста — мини-приложение для обучения!
                        </Placeholder>
                    </div>
                    <div style={{ backgroundColor: 'var(--button_commerce_background)' }}>
                        <Placeholder
                            icon={<Icon56UsersOutline />}
                            header="1. Изучайте материалы"
                            action={<Button size="l" onClick={nextSlide}>Далее</Button>}
                        >
                            Находите интересные материалы, уроки, курсы. Изучайте. Добавляйте их в закладки!
                        </Placeholder>
                    </div>
                    <div style={{ backgroundColor: 'var(--accent)' }}>
                        <Placeholder
                            icon={<Icon56UsersOutline />}
                            header="2. Проходите тесты"
                            action={<Button size="l" onClick={() => setActiveView('home')} >
                                Понятно
                            </Button>}
                        >
                            Проходите легкое тестирование в конце материала для закрепления изученного!
                        </Placeholder>
                    </div>
                </Gallery>
            </Panel>
        </View>
    );
}

WelcomeView.propTypes = {
    id: PropTypes.string.isRequired,
    setActiveView: PropTypes.func.isRequired
};

export default WelcomeView;