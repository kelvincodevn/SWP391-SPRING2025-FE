import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const gad7Questions = [
  "Do you feel nervous, anxious, or on edge?",
  "Do you have trouble stopping or controlling your worry?",
  "Do you worry too much about different things?",
  "Do you have trouble relaxing?",
  "Do you feel restless or unable to sit still?",
  "Do you get easily annoyed or irritable?",
  "Do you feel afraid that something awful might happen?",
];

const options = [
  { value: 0, label: "Not at all (0 points)" },
  { value: 1, label: "Several days (1 point)" },
  { value: 2, label: "More than half the days (2 points)" },
  { value: 3, label: "Nearly every day (3 points)" },
];

const getResultText = (score) => {
  if (score <= 4) return { level: "Minimal Anxiety", description: "Your anxiety level is low. No significant symptoms of anxiety were detected." };
  if (score <= 9) return { level: "Mild Anxiety", description: "You may experience some anxiety symptoms, but they are not severe. Consider monitoring your stress levels and practicing relaxation techniques." };
  if (score <= 14) return { level: "Moderate Anxiety", description: "Your anxiety level is moderate. It may affect your daily activities. You might benefit from speaking with a mental health professional." };
  return { level: "Severe Anxiety", description: "Your anxiety level is high. You may experience significant distress and impairment. It is recommended to seek support from a mental health professional." };
};

const GAD7TestPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(gad7Questions.length).fill(null));
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-10">
      <h1 className="text-2xl font-bold mb-6">GAD-7 Anxiety Test</h1>
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
            {gad7Questions.map((question, index) => (
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

export default GAD7TestPage;
