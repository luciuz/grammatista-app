import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import {api} from "../lib/ApiInstance";
import PropTypes from "prop-types";

const LessonPanel = ({ id, setActivePanel, lessonId }) => {
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await api.getLesson(lessonId).catch(api.logError);
            if (response) {
                setLesson(response);
            }
        }
        fetchData();
    }, []);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('search')} />}>
                Материал
            </PanelHeader>
            {lesson === null ?
                <Div>
                    Error
                </Div>
                :
                <Div>
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
                            <ul key={i}>{item.l.map((li) => <li>{li}</li>)}</ul>,
                            item.ln &&
                            <ol key={i}>{item.ln.map((li) => <li>{li}</li>)}</ol>,
                            item.a &&
                            <a key={i} href={item.a.link} target="_blank" rel="noopener noreferrer">{item.a.text}</a>,
                        ]
                    )}
                </Div>
            }
        </Panel>
    );
}

LessonPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    lessonId: PropTypes.number
};

export default LessonPanel;