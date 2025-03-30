import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Rate, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { getActiveSurveys, submitSurveyResponse } from '../../services/api.survey';

function SurveyPage() {
    const [surveys, setSurveys] = useState([]);
    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchActiveSurveys = async () => {
            setLoading(true);
            try {
                const data = await getActiveSurveys();
                setSurveys(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchActiveSurveys();
    }, []);

    const handleSubmit = async (surveyId) => {
        setLoading(true);
        try {
            const values = form.getFieldsValue();
            const answers = Object.entries(values).map(([questionId, answerText]) => ({
                questionId: parseInt(questionId.split('_')[1]),
                answerText: answerText.toString(),
            }));

            const responseData = { surveyId, answers };
            await submitSurveyResponse(surveyId, responseData);
            form.resetFields();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderQuestion = (question) => {
        switch (question.questionType) {
            case 'TEXT':
                return <Input />;
            case 'MULTIPLE_CHOICE':
                const options = JSON.parse(question.options || '[]');
                return (
                    <Radio.Group>
                        {options.map((opt, idx) => (
                            <Radio key={idx} value={opt}>{opt}</Radio>
                        ))}
                    </Radio.Group>
                );
            case 'RATING':
                return <Rate />;
            default:
                return null;
        }
    };

    return (
        <div className="p-8">
            <h1>Active Surveys</h1>
            {loading ? <Spin /> : (
                surveys.map(survey => (
                    <div key={survey.id} className="mb-4 p-4 border">
                        <h2>{survey.title}</h2>
                        <p>{survey.description}</p>
                        <Form form={form} onFinish={() => handleSubmit(survey.id)}>
                            {survey.questions.map(question => (
                                <Form.Item
                                    key={question.id}
                                    name={`question_${question.id}`}
                                    label={question.questionText}
                                    rules={[{ required: true, message: 'This field is required' }]}
                                >
                                    {renderQuestion(question)}
                                </Form.Item>
                            ))}
                            <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                        </Form>
                    </div>
                ))
            )}
        </div>
    );
}

export default SurveyPage;