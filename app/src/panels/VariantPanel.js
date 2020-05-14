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
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';

const VariantPanel = ({ id, setActivePanel, variantId, variantState, setVariantState}) => {
    const [variant, setVariant] = useState(null);
    const [qn, setQn] = useState(null); // current question number
    const [userAnswer, setUserAnswer] = useState(null);
    const [checked, setChecked] = useState(Array(100).fill(false));
    const [isComplete, setIsComplete] = useState(null);

    const back = () => {
        setVariantState({
            variant: variant,
            qn: qn,
            userAnswer: userAnswer
        });
        setActivePanel('lesson');
    }

    const finish = async () => {
        const userAnswerFormatted = {list: []};
        userAnswer.list.forEach((e) => {
            userAnswerFormatted.list.push(e.filter(el => el !== false));
        })
        const response = await api.finishVariant(variantId, userAnswerFormatted).catch(api.logError);
        if (response) {
            setIsComplete(response.isComplete);
        }
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
        } else {
            finish();
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
                {isComplete === null && variant && <Div>
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
            {isComplete !== null &&
                <Div>
                    {isComplete ?
                        <Placeholder
                            icon={<Icon56CheckCircleOutline style={{ color: 'var(--dynamic_green)' }}/>}
                            header="Пройдено!"
                        >
                            Вы великолепны
                        </Placeholder>
                        :
                        <Placeholder
                            icon={<Icon56DoNotDisturbOutline style={{ color: 'var(--dynamic_red)' }}/>}
                            header="Не пройдено!"
                            action={<Button size="l">Подробнее</Button>}
                        >
                            Выше нос
                        </Placeholder>
                    }
                </Div>
            }
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