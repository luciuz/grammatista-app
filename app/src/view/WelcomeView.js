import React, {useState} from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56ServicesOutline from '@vkontakte/icons/dist/56/services_outline';
import Icon56DocumentOutline from '@vkontakte/icons/dist/56/document_outline';
import Icon56CheckCircleDeviceOutline from '@vkontakte/icons/dist/56/check_circle_device_outline';
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
                            icon={<Icon56ServicesOutline />}
                            header="Добро пожаловать в Грамматиста!"
                            action={<Button size="l" onClick={nextSlide}>Далее</Button>}
                        >
                            Школа Грамматиста — мини-приложение для обучения!
                        </Placeholder>
                    </div>
                    <div style={{ backgroundColor: 'var(--button_commerce_background)' }}>
                        <Placeholder
                            icon={<Icon56DocumentOutline />}
                            header="1. Изучайте материалы"
                            action={<Button size="l" onClick={nextSlide}>Далее</Button>}
                        >
                            Находите интересные материалы, уроки, курсы. Изучайте. Добавляйте их в закладки!
                        </Placeholder>
                    </div>
                    <div style={{ backgroundColor: 'var(--accent)' }}>
                        <Placeholder
                            icon={<Icon56CheckCircleDeviceOutline />}
                            header="2. Проходите тесты"
                            action={<Button size="l" onClick={() => setActiveView('home')} >
                                Понятно
                            </Button>}
                        >
                            Проходите экспресс-тесты в конце каждого материала для закрепления изученного!
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