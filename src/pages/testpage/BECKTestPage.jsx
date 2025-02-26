import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const beckQuestions = [
  "I do not feel sad.",
  "I feel sad much of the time.",
  "I am sad all the time.",
  "I am so sad or unhappy that I can't stand it.",
  "I am not particularly discouraged about the future.",
  "I feel discouraged about the future.",
  "I feel I have nothing to look forward to.",
  "I feel the future is hopeless and that things cannot improve.",
  "I do not feel like a failure.",
  "I feel I have failed more than the average person.",
  "When I look back, I see a lot of failures.",
  "I feel I am a complete failure as a person.",
];

const options = [
  { value: 0, label: "Not at all (0 points)" },
  { value: 1, label: "Mild (1 point)" },
  { value: 2, label: "Moderate (2 points)" },
  { value: 3, label: "Severe (3 points)" },
];

const getResultText = (score) => {
  if (score <= 10) return { level: "Minimal Depression", description: "Your symptoms are minimal and may not require treatment." };
  if (score <= 18) return { level: "Mild Depression", description: "You may be experiencing mild depressive symptoms. Consider self-care strategies and monitoring your mood." };
  if (score <= 29) return { level: "Moderate Depression", description: "Your symptoms indicate moderate depression. It may be beneficial to speak with a healthcare provider." };
  return { level: "Severe Depression", description: "Your symptoms are severe. Seeking professional help is strongly recommended." };
};

const BeckTestPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(beckQuestions.length).fill(null));
  const [score, setScore] = useState(null);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    setScore(totalScore);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-pink-50 p-10">
      <h1 className="text-2xl font-bold mb-6">Beck Depression Inventory (BDI)</h1>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Question</th>
              {options.map((option) => (
                <th key={option.value} className="border border-gray-300 p-2">{option.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {beckQuestions.map((question, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2 text-left">{question}</td>
                {options.map((option) => (
                  <td key={option.value} className="border border-gray-300 p-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={answers[index] === option.value}
                      onChange={() => handleAnswerChange(index, option.value)}
                      className="form-radio text-pink-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
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
          onClick={() => navigate("/")}
        >
          Back to Test Selection
        </button>
      </div>
    </div>
  );
};

export default BeckTestPage;
