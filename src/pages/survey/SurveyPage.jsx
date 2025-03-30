// import React, { useEffect, useState } from 'react';
// import { Button, Form, Radio, Spin } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { getActiveSurveys, submitSurveyResponse } from '../../services/api.survey';

// function SurveyPage() {
//     const [surveys, setSurveys] = useState([]);
//     const [form] = useForm();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchActiveSurveys = async () => {
//             setLoading(true);
//             try {
//                 const data = await getActiveSurveys();
//                 setSurveys(data);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchActiveSurveys();
//     }, []);

//     const handleSubmit = async (surveyId) => {
//         setLoading(true);
//         try {
//             const values = form.getFieldsValue();
//             const answers = Object.entries(values).map(([questionId, answerText]) => ({
//                 questionId: parseInt(questionId.split('_')[1]),
//                 answerText,
//             }));

//             const responseData = { surveyId, answers };
//             await submitSurveyResponse(surveyId, responseData);
//             form.resetFields();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const renderQuestion = (question) => {
//         const options = question.options ? question.options.split(',') : [];
//         return (
//             <Radio.Group>
//                 {options.length > 0 ? (
//                     options.map((opt, idx) => (
//                         <Radio key={idx} value={opt}>{opt}</Radio>
//                     ))
//                 ) : (
//                     <p>No options available for this question.</p>
//                 )}
//             </Radio.Group>
//         );
//     };

//     return (
//         <div className="p-8">
//             <h1>Active Surveys</h1>
//             {loading ? <Spin /> : (
//                 surveys.length > 0 ? (
//                     surveys.map(survey => (
//                         <div key={survey.id} className="mb-4 p-4 border">
//                             <h2>{survey.title || 'Untitled Survey'}</h2>
//                             <p>{survey.description || 'No description'}</p>
//                             <Form form={form} onFinish={() => handleSubmit(survey.id)}>
//                                 {survey.questions && survey.questions.length > 0 ? (
//                                     survey.questions.map(question => (
//                                         <Form.Item
//                                             key={question.id}
//                                             name={`question_${question.id}`}
//                                             label={question.questionText || 'Untitled Question'}
//                                             rules={[{ required: true, message: 'This field is required' }]}
//                                         >
//                                             {renderQuestion(question)}
//                                         </Form.Item>
//                                     ))
//                                 ) : (
//                                     <p>No questions available for this survey.</p>
//                                 )}
//                                 <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
//                             </Form>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No active surveys available.</p>
//                 )
//             )}
//         </div>
//     );
// }

// export default SurveyPage;