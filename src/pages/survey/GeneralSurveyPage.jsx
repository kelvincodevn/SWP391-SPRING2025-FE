import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurveyById, submitSurveyResponse } from "../../services/api.survey";
import { toast } from "react-toastify";

const GeneralSurveyPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get surveyId from URL
    const [surveyData, setSurveyData] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchSurveyData = async () => {
            const data = await getSurveyById(id);
            if (data) {
                setSurveyData(data);
                setAnswers(Array(data.questions.length).fill(null)); // Initialize answers array
            }
        };
        fetchSurveyData();
    }, [id]);

    const handleAnswerChange = (questionIndex, answerText) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerText;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        if (answers.includes(null)) {
            toast.error("Please answer all questions before submitting.");
            return;
        }

        const answersToSubmit = surveyData.questions.map((question, questionIndex) => ({
            questionId: question.questionNumber, // Adjust based on your API
            answerText: answers[questionIndex]
        }));

        const data = {
            surveyId: surveyData.surveyId,
            answers: answersToSubmit
        };

        try {
            await submitSurveyResponse(surveyData.surveyId, data);
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting survey:", error);
            toast.error("Failed to submit survey.");
        }
    };

    if (!surveyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-10">
            <h1 className="text-2xl font-bold mb-6">{surveyData.surveyName}</h1>
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-4">Thank You for Completing the Survey!</h2>
                        <p className="text-md mb-6">We appreciate your responses.</p>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                            onClick={() => navigate("/survey-selection")}
                        >
                            Take Another Survey
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <>
                        <table className="w-full border-collapse border border-gray-300 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">Question</th>
                                    {surveyData.questions[0].answers.map((answer, answerIndex) => (
                                        <th key={answerIndex} className="border border-gray-300 p-2">{answer.answerText}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {surveyData.questions.map((question, questionIndex) => (
                                    <tr key={questionIndex} className="text-center">
                                        <td className="border border-gray-300 p-2 text-left">{question.questionText}</td>
                                        {question.answers.map((answer, answerIndex) => (
                                            <td key={answerIndex} className="border border-gray-300 p-2">
                                                <input
                                                    type="radio"
                                                    name={`question-${questionIndex}`}
                                                    value={answer.answerText}
                                                    checked={answers[questionIndex] === answer.answerText}
                                                    onChange={() => handleAnswerChange(questionIndex, answer.answerText)}
                                                    className="form-radio text-blue-500"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                            onClick={handleSubmit}
                        >
                            Submit Survey
                        </button>
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                            onClick={() => navigate("/survey-selection")}
                        >
                            Back to Survey Selection
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default GeneralSurveyPage;