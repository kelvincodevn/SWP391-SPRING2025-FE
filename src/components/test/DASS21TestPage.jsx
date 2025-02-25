import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dass21Questions = [
  "I found it hard to wind down.",
  "I was aware of dryness in my mouth.",
  "I couldn’t seem to experience any positive feeling at all.",
  "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness without physical exertion).",
  "I found it difficult to work up the initiative to do things.",
  "I tended to over-react to situations.",
  "I experienced trembling (e.g., in the hands).",
  "I felt that I was using a lot of nervous energy.",
  "I was worried about situations in which I might panic and make a fool of myself.",
  "I felt that I had nothing to look forward to.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I felt down-hearted and blue.",
  "I was intolerant of anything that kept me from getting on with what I was doing.",
  "I felt I was close to panic.",
  "I was unable to become enthusiastic about anything.",
  "I felt I wasn’t worth much as a person.",
  "I felt that I was rather touchy.",
  "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).",
  "I felt scared without any good reason.",
  "I felt that life was meaningless.",
];

const options = [
  { value: 0, label: "Did not apply to me at all (0 points)" },
  { value: 1, label: "Applied to me to some degree, or some of the time (1 point)" },
  { value: 2, label: "Applied to me to a considerable degree, or a good part of time (2 points)" },
  { value: 3, label: "Applied to me very much, or most of the time (3 points)" },
];

const getResultText = (score) => {
  if (score <= 20) return { level: "Normal", description: "Your stress, anxiety, and depression levels are within a normal range." };
  if (score <= 40) return { level: "Mild", description: "You may be experiencing mild stress, anxiety, or depression. Consider relaxation techniques and self-care." };
  if (score <= 60) return { level: "Moderate", description: "Your symptoms indicate moderate stress, anxiety, or depression. Seeking support from a professional may be helpful." };
  if (score <= 80) return { level: "Severe", description: "You are experiencing significant distress. Consulting a mental health professional is recommended." };
  return { level: "Extremely Severe", description: "Your symptoms are very high. Immediate professional support is strongly recommended." };
};

const DASS21TestPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(Array(dass21Questions.length).fill(null));
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-50 p-10">
      <h1 className="text-2xl font-bold mb-6">DASS-21 Stress, Anxiety & Depression Test</h1>
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
            {dass21Questions.map((question, index) => (
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
                      className="form-radio text-purple-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-purple-400 hover:bg-purple-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
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

export default DASS21TestPage;
