import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserTestById, submitAnswers } from "../../services/api.testq";
import { toast } from "react-toastify";
 // Import getTestById

const GeneralTestPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get testId from URL
    const [testData, setTestData] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchTestData = async () => {
            const data = await getUserTestById(id);
            if (data) {
                setTestData(data);
                setAnswers(Array(data.questions.length).fill(null)); // Initialize answers array
            }
        };
        fetchTestData();
    }, [id]);

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = value;
        setAnswers(newAnswers);
    };

    // const handleSubmit = () => {
    //     if (answers.includes(null)) {
    //         alert("Please answer all questions before submitting.");
    //         return;
    //     }

    //     let totalScore = 0;
    //     testData.questions.forEach((question, questionIndex) => {
    //         const selectedAnswer = question.answers.find(answer => answer.score === answers[questionIndex]);
    //         if (selectedAnswer) {
    //             totalScore += selectedAnswer.score;
    //         }
    //     });
    //     setScore(totalScore);
    // };

    const handleSubmit = async () => {
        if (answers.includes(null)) {
            toast.error("Please answer all questions before submitting.");
            return;
        }
    
        const answersToSubmit = testData.questions.map((question, questionIndex) => {
            const selectedAnswer = question.answers.find(answer => answer.score === answers[questionIndex]);
            return {
                questionId: question.questionNumber, // Hoặc question.id, tùy thuộc vào API của bạn
                answerText: selectedAnswer ? selectedAnswer.answerText : "",
                score: answers[questionIndex]
            };
        });
    
        const data = {
            testId: testData.testId,
            answers: answersToSubmit
        };
    
        try {
            console.log(data);
            await submitAnswers(data);
            // Có thể thêm logic sau khi submit thành công (ví dụ: chuyển hướng, hiển thị kết quả)
        } catch (error) {
            console.error("Error submitting test:", error);
            // Error toast sẽ được xử lý trong submitAnswers
        }
    };

    const getResultText = (score) => {
        // Implement your logic to determine result text based on score
        // This will depend on the specific test and its scoring criteria
        if (testData.testName === "GAD-7") {
            if (score <= 4) return { level: "Minimal Anxiety", description: "Your anxiety level is low. No significant symptoms of anxiety were detected." };
            if (score <= 9) return { level: "Mild Anxiety", description: "You may experience some anxiety symptoms, but they are not severe. Consider monitoring your stress levels and practicing relaxation techniques." };
            if (score <= 14) return { level: "Moderate Anxiety", description: "Your anxiety level is moderate. It may affect your daily activities. You might benefit from speaking with a mental health professional." };
            return { level: "Severe Anxiety", description: "Your anxiety level is high. You may experience significant distress and impairment. It is recommended to seek support from a mental health professional." };
        } else if (testData.testName === "PHQ-9") {
            if (score <= 4) return { level: "Minimal Depression", description: "Your symptoms are minimal and may not require treatment." };
            if (score <= 9) return { level: "Mild Depression", description: "You may experience some symptoms of depression. Consider monitoring your mood and seeking support if needed." };
            if (score <= 14) return { level: "Moderate Depression", description: "Your symptoms indicate moderate depression. Talking to a healthcare provider may be beneficial." };
            if (score <= 19) return { level: "Moderately Severe Depression", description: "You are experiencing significant depressive symptoms. Seeking professional help is recommended." };
            return { level: "Severe Depression", description: "Your symptoms are severe. It is highly recommended to consult a mental health professional as soon as possible." };
        }
        return { level: "Unknown", description: "Results are not available." };
    };

    if (!testData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-10">
            <h1 className="text-2xl font-bold mb-6">{testData.testName}</h1>
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
                <table className="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Question</th>
                            {testData.questions[0].answers.map((answer, answerIndex) => (
                                <th key={answerIndex} className="border border-gray-300 p-2">{answer.answerText}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {testData.questions.map((question, questionIndex) => (
                            <tr key={questionIndex} className="text-center">
                                <td className="border border-gray-300 p-2 text-left">{question.questionText}</td>
                                {question.answers.map((answer, answerIndex) => (
                                    <td key={answerIndex} className="border border-gray-300 p-2">
                                        <input
                                            type="radio"
                                            name={`question-${questionIndex}`}
                                            value={answer.score}
                                            checked={answers[questionIndex] === answer.score}
                                            onChange={() => handleAnswerChange(questionIndex, answerIndex, answer.score)}
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
                    Submit Test
                </button>
                {score !== null && (
                    <div className="mt-6 p-6 bg-yellow-100 text-center text-xl font-bold rounded-lg">
                        Your Total Score: {score} - {getResultText(score).level}
                        <p className="text-lg mt-2">{getResultText(score).description}</p>
                    </div>
                )}
                <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                    onClick={() => navigate("/testoption")}
                >
                    Back to Test Selection
                </button>
            </div>
        </div>
    );
};

export default GeneralTestPage;