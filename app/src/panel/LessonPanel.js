import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import {api, createTransToken} from "../lib/ApiInstance";
import PropTypes from "prop-types";

const LessonPanel = ({ id, setActivePanel, showError, lessonId, lessonState, setLessonState, setVariantId, lessonBack, setBookmarkState }) => {
    const [lesson, setLesson] = useState(null);
    const [isBookmark, setIsBookmark] = useState(null);
    const [createVarTransToken, setCreateVarTransToken] = useState(createTransToken());
    const [delBMTransToken, setDelBMTransToken] = useState(createTransToken());
    const [setBMTransToken, setSetBMTransToken] = useState(createTransToken());

    const back = () => {
        if (!isBookmark && lessonBack === 'bookmark') {
            setBookmarkState(null);
        }
        setLessonState(null);
        setActivePanel(lessonBack);
    };

    const showResult = () => {
        setVariantId(lesson.completeVariantId);
        setActivePanel('result');
    }

    const doBookmark = async () => {
        if (isBookmark) {
            const response = await api.deleteBookmark(lessonId, delBMTransToken).catch(showError);
            if (response) {
                setIsBookmark(false);
                setDelBMTransToken(createTransToken());
            }
        } else {
            const response = await api.setBookmark(lessonId, setBMTransToken).catch(showError);
            if (response) {
                setIsBookmark(true);
                setSetBMTransToken(createTransToken());
            }
        }
    }

    const startVariant = async () => {
        let activeVariantId = lesson.activeVariantId;
        if (activeVariantId === null) {
            const response = await api.createVariant(lessonId, createVarTransToken).catch(showError);
            if (response) {
                activeVariantId = response.id;
                lesson.activeVariantId = activeVariantId;
                setLesson(lesson);
                setCreateVarTransToken(createTransToken());
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
            const lesson = await api.getLesson(lessonId).catch(showError);
            if (lesson) {
                setIsBookmark(lesson.isBookmark);
                setLesson(lesson);
            }
        }

        if (!lesson) {
            if (lessonState) {
                const lessonLS = lessonState.lesson;
                setIsBookmark(lessonLS.isBookmark);
                setLesson(lessonLS);
                window.scrollTo(0, lessonState.scrollY);
            } else {
                fetchData();
            }
        }
    }, [showError, lessonId, lessonState, setLessonState, setVariantId, lesson]);

    return (
        <Panel id={id}>
            <PanelHeader left={[
                <PanelHeaderBack key="back" onClick={back} />,
                <PanelHeaderButton key="fav" onClick={doBookmark}>
                    {isBookmark ? <Icon28Favorite/> : <Icon28FavoriteOutline />}
                </PanelHeaderButton>
            ]}>
                Материал
            </PanelHeader>
                {lesson && <div>
                    <Div style={{ marginBottom: 16 }}>
                    {lesson.body.list.map((item, i) =>
                        [
                            item.h1 &&
                            <Title key={i} level="1" weight="semibold" style={{ marginBottom: 16 }}>{item.h1}</Title>,
                            item.h2 &&
                            <Title key={i} level="2" weight="semibold" style={{ marginBottom: 16 }}>{item.h2}</Title>,
                            item.h3 &&
                            <Title key={i} level="3" weight="semibold" style={{ marginBottom: 16 }}>{item.h3}</Title>,
                            item.p &&
                            <Text key={i} weight="regular" style={{ marginBottom: 16 }}>{item.p.join(' ')}</Text>,
                            item.i &&
                            <img key={i} src={item.i.src} alt={item.i.alt} style={{ marginBottom: 16 }} />,
                            item.l &&
                            <ul key={i}>{item.l.map((li, j) => <li key={j}>{li}</li>)}</ul>,
                            item.ln &&
                            <ol key={i}>{item.ln.map((li, j) => <li key={j}>{li}</li>)}</ol>,
                            item.a &&
                            <a key={i} href={item.a.link} target="_blank" rel="noopener noreferrer">{item.a.text}</a>,
                            item.t &&
                            <table key={i}>
                                <thead>
                                    <tr key='0'>
                                        {item.t[0].map((td, k2) => <td key={k2}>{td}</td>)}
                                    </tr>
                                </thead>
                                <tbody>
                                {item.t.map((line, k) => [
                                    k > 0 &&
                                        <tr key={k}>
                                            {line.map((td, k2) => <td key={k2}>{td}</td>)}
                                        </tr>
                                ])}
                                </tbody>
                            </table>
                        ]
                    )}
                </Div>
                <FormLayout>
                    <FormLayoutGroup>
                        {lesson && lesson.isComplete === false ?
                            <Button size="xl" mode="primary" onClick={startVariant}>
                                {lesson.activeVariantId ? 'Продолжить тест' : 'Начать тест'}
                            </Button>
                        :
                            <Button size="xl" mode="commerce" onClick={showResult}>
                                Тест пройден
                            </Button>
                        }
                    </FormLayoutGroup>
                </FormLayout>
            </div>}
        </Panel>
    );
}

LessonPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    lessonId: PropTypes.number,
    lessonState: PropTypes.object,
    setLessonState: PropTypes.func.isRequired,
    setVariantId: PropTypes.func.isRequired,
    lessonBack: PropTypes.string.isRequired,
    setBookmarkState: PropTypes.func.isRequired,
};

export default LessonPanel;