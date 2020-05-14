import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import {api} from "../lib/ApiInstance";
import PropTypes from "prop-types";

const VariantPanel = ({ id, setActivePanel, variantId, variantState, setVariantState}) => {
    const [variant, setVariant] = useState(null);
    const [qn, setQn] = useState(null); // current question number
    const [userAnswer, setUserAnswer] = useState(null);
    const [checked, setChecked] = useState(Array(100).fill(false));

    const back = () => {
        setVariantState({
            variant: variant,
            qn: qn,
            userAnswer: userAnswer
        });
        setActivePanel('lesson');
    }

    const changeOption = (i) => {
        if (userAnswer.list[qn][i]) {
            userAnswer.list[qn][i] = false;
        } else {
            userAnswer.list[qn][i] = i + 1;
        }
        const newChecked = [...userAnswer.list[qn]];
        setChecked(newChecked);
        setUserAnswer(userAnswer);
    }

    const canNext = () => (qn < variant.question.list.length - 1);

    const next = () => {
        if (canNext()) {
            setQn(qn+1);
        }
    }

    const prev = () => {
        if (qn > 0) {
            setQn(qn-1);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const variant = await api.getVariant(variantId).catch(api.logError);
            if (variant) {
                setUserAnswer({list: variant.question.list.map(e => Array(e.options.length).fill(false))});
                setQn(0);
                setVariant(variant);
            }
        }

        if (!variant) {
            if (variantState) {
                setUserAnswer(variantState.userAnswer);
                setQn(variantState.qn);
                setVariant(variantState.variant);
            } else {
                fetchData();
            }
        }
    }, [variantId, variantState, variant]);

    useEffect(() => {
        if (qn !== null && userAnswer && userAnswer.list) {
            setChecked(userAnswer.list[qn]);
        }
    }, [qn, userAnswer]);

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={back} />}>
                Тестирование
            </PanelHeader>
                {variant && <Div>
                    {variant.question.list[qn] && <div>
                        <Title level="1" weight="semibold" style={{ marginBottom: 16 }}>
                            {variant.question.list[qn].title}
                        </Title>
                        <FormLayout>
                            <FormLayoutGroup>
                                {variant.question.list[qn].options.map((item, i) =>
                                    <Checkbox
                                        key={qn + '-' + i}
                                        name={qn + '-' + i}
                                        onChange={changeOption.bind(this, i)}
                                        checked={checked[i]}
                                    >
                                        {item}
                                    </Checkbox>
                                )}
                            </FormLayoutGroup>
                            <FormLayoutGroup>
                            <Button size="xl" mode="primary" onClick={next}>
                            {canNext() ? 'Далее' : 'Завершить'}
                            </Button>
                            {qn > 0 && <Button size="xl" mode="outline" onClick={prev}>
                                ← Назад
                            </Button>}
                            </FormLayoutGroup>
                        </FormLayout>
                    </div>}
            </Div>}
        </Panel>
    );
}

VariantPanel.propTypes = {
    id: PropTypes.string.isRequired,
    setActivePanel: PropTypes.func.isRequired,
    variantId: PropTypes.number,
    variantState: PropTypes.object,
    setVariantState: PropTypes.func.isRequired,
};

export default VariantPanel;