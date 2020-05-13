import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import {api} from "../lib/ApiInstance";
import PropTypes from "prop-types";

const LessonPanel = ({ id, setActivePanel, lessonId, lessonState, setLessonState, setVariantId }) => {
    const [lesson, setLesson] = useState(null);
    const [isBookmark, setIsBookmark] = useState(null);

    const back = () => {
        setLessonState(null);
        setActivePanel('search');
    };

    const startVariant = async () => {
        let activeVariantId = lesson.activeVariantId;
        if (activeVariantId === null) {
            const response = await api.createVariant(lessonId).catch(api.logError);
            if (response) {
                activeVariantId = response.id;
                lesson.activeVariantId = activeVariantId;
                setLesson(lesson);
            }
        }

        setLessonState({
            lesson: lesson,
            scrollY: window.pageYOffset
        });
        setVariantId(activeVariantId);
        setActivePanel('variant');
    }

    useEffect(() => {
        async function fetchData() {
            const lesson = await api.getLesson(lessonId).catch(api.logError);
            if (lesson) {
                setIsBookmark(lesson.isBookmark);
                setLesson(lesson);
            }
        }

        if (!lesson) {
            if (lessonState) {
                const lessonLS = lessonState.lesson;
                window.scrollTo(0, lessonState.scrollY);
                setIsBookmark(lessonLS.isBookmark);
                setLesson(lessonLS);
            } else {
                fetchData();
            }
        }
    }, [lessonId, lessonState, setLessonState, setVariantId, lesson]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Материал
            </PanelHeader>
                {lesson && <Div>
                    <div style={{ marginBottom: 16 }}>
                    {lesson.body.list.map((item, i) =>
                        [
                            item.h1 &&
                            <Title key={i} level="1" weight="semibold" style={{ marginBottom: 16 }}>{item.h1}</Title>,
                            item.h2 &&
                            <Title key={i} level="2" weight="semibold" style={{ marginBottom: 16 }}>{item.h2}</Title>,
                            item.h3 &&
                            <Title key={i} level="3" weight="semibold" style={{ marginBottom: 16 }}>{item.h3}</Title>,
                            item.p &&
                            <Text key={i} weight="regular" style={{ marginBottom: 16 }}>{item.p}</Text>,
                            item.i &&
                            <img key={i} src={item.i.src} alt={item.i.alt} style={{ marginBottom: 16 }} />,
                            item.l &&
                            <ul key={i}>{item.l.map((li, j) => <li key={j}>{li}</li>)}</ul>,
                            item.ln &&
                            <ol key={i}>{item.ln.map((li, j) => <li key={j}>{li}</li>)}</ol>,
                            item.a &&
                            <a key={i} href={item.a.link} target="_blank" rel="noopener noreferrer">{item.a.text}</a>,
                        ]
                    )}
                </div>
                <FormLayout>
                    <FormLayoutGroup>
                        <Button size="xl" mode="primary" onClick={startVariant}>
                            {lesson.activeVariantId ? 'Продолжить тест' : 'Начать тест'}
                        </Button>

                        {isBookmark ?
                            <Button size="xl" mode="secondary">
                                Убрать из закладок
                            </Button>
                            :
                            <Button size="xl" mode="secondary">
                                Добавить в закладки
                            </Button>
                        }
                    </FormLayoutGroup>
                </FormLayout>
            </Div>}
        </Panel>
    );
}

LessonPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    lessonId: PropTypes.number,
    lessonState: PropTypes.object,
    setLessonState: PropTypes.func.isRequired,
    setVariantId: PropTypes.func.isRequired,
};

export default LessonPanel;