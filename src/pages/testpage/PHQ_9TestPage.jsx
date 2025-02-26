import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const phq9Questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure?",
  "Trouble concentrating on things, such as reading or watching TV?",
  "Moving or speaking so slowly that other people notice?",
  "Thoughts that you would be better off dead or hurting yourself?",
];

const options = [
  { value: 0, label: "Not at all (0 points)" },
  { value: 1, label: "Several days (1 point)" },
  { value: 2, label: "More than half the days (2 points)" },
  { value: 3, label: "Nearly every day (3 points)" },
];

const getResultText = (score) => {
  if (score <= 4) return { level: "Minimal Depression", description: "Your symptoms are minimal and may not require treatment." };
  if (score <= 9) return { level: "Mild Depression", description: "You may experience some symptoms of depression. Consider monitoring your mood and seeking support if needed." };
  if (score <= 14) return { level: "Moderate Depression", description: "Your symptoms indicate moderate depression. Talking to a healthcare provider may be beneficial." };
  if (score <= 19) return { level: "Moderately Severe Depression", description: "You are experiencing significant depressive symptoms. Seeking professional help is recommended." };
  return { level: "Severe Depression", description: "Your symptoms are severe. It is highly recommended to consult a mental health professional as soon as possible." };
};

const PHQ9TestPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(phq9Questions.length).fill(null));
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-50 p-10">
      <h1 className="text-2xl font-bold mb-6">PHQ-9 Depression Test</h1>
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
            {phq9Questions.map((question, index) => (
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
                      className="form-radio text-green-500"
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

export default PHQ9TestPage;
