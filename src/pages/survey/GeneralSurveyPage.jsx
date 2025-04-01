import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurveyById, submitSurveyResponse } from "../../services/api.survey";
import { toast } from "react-toastify";

const GeneralSurveyPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [surveyData, setSurveyData] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [errorQuestions, setErrorQuestions] = useState([]); // Lưu các câu hỏi chưa trả lời

    useEffect(() => {
        const fetchSurveyData = async () => {
            const data = await getSurveyById(id);
            if (data) {
                setSurveyData(data);
                setAnswers(Array(data.questions.length).fill(null));
            }
        };
        fetchSurveyData();
    }, [id]);

    const handleAnswerChange = (questionIndex, answerText) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerText;
        setAnswers(newAnswers);

        // Xóa lỗi của câu hỏi khi người dùng chọn đáp án
        if (errorQuestions.includes(questionIndex)) {
            setErrorQuestions(errorQuestions.filter((index) => index !== questionIndex));
        }

        // // Thông báo toast khi chọn đáp án (tùy chọn)
        // toast.info(`Selected "${answerText}" for question ${questionIndex + 1}`, {
        //     autoClose: 1500,
        // });
    };

    const handleClearSelection = (questionIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = null;
        setAnswers(newAnswers);
        // toast.info(`Cleared selection for question ${questionIndex + 1}`, {
        //     autoClose: 1500,
        // });
    };

    const handleSubmit = async () => {
        // Kiểm tra các câu hỏi chưa trả lời
        const unanswered = answers
            .map((answer, index) => (answer === null ? index : -1))
            .filter((index) => index !== -1);

        if (unanswered.length > 0) {
            setErrorQuestions(unanswered);
            toast.error("Please answer all questions before submitting.");
            return;
        }

        const answersToSubmit = surveyData.questions.map((question, questionIndex) => ({
            questionId: question.questionNumber,
            answerText: answers[questionIndex],
        }));

        const data = {
            surveyId: surveyData.surveyId,
            answers: answersToSubmit,
        };

        try {
            await submitSurveyResponse(surveyData.surveyId, data);
            setSubmitted(true);
            // toast.success("Survey submitted successfully!");
        } catch (error) {
            console.error("Error submitting survey:", error);
            toast.error("Failed to submit survey.");
        }
    };

    // Tính tiến độ: số câu đã trả lời / tổng số câu hỏi
    const answeredCount = answers.filter((answer) => answer !== null).length;
    const totalQuestions = surveyData?.questions?.length || 0;
    const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

    if (!surveyData) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{surveyData.surveyName}</h1>
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">Thank You for Completing the Survey!</h2>
                        <p className="text-md mb-6 text-gray-600">We appreciate your responses.</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200"
                            onClick={() => navigate("/survey-selection")}
                        >
                            Take Another Survey
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200"
                            onClick={() => navigate("/")}
                        >
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-2">
                                Progress: {answeredCount}/{totalQuestions} questions answered
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Danh sách câu hỏi */}
                        <div className="space-y-6 mb-6">
                            {surveyData.questions.map((question, questionIndex) => (
                                <div
                                    key={questionIndex}
                                    className={`border-b border-gray-300 pb-4 ${
                                        errorQuestions.includes(questionIndex) ? "border-l-4 border-red-500 pl-4" : ""
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-lg font-medium text-gray-800">
                                            {question.questionNumber}. {question.questionText}
                                        </p>
                                        <button
                                            className="text-sm text-blue-500 hover:text-blue-700"
                                            onClick={() => handleClearSelection(questionIndex)}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {question.answers.map((answer, answerIndex) => (
                                            <label
                                                key={answerIndex}
                                                className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${questionIndex}`}
                                                    value={answer.answerText}
                                                    checked={answers[questionIndex] === answer.answerText}
                                                    onChange={() => handleAnswerChange(questionIndex, answer.answerText)}
                                                    className="form-radio text-blue-500 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-700">{answer.answerText}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errorQuestions.includes(questionIndex) && (
                                        <p className="text-red-500 text-sm mt-2">Please select an answer for this question.</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Nút Submit và Back */}
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200"
                            onClick={handleSubmit}
                        >
                            Submit Survey
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200"
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