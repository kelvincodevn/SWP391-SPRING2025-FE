import React, { useState } from "react";

const Survey = () => {
  const questions = [
    {
      question: "Do you feel stressed at work or school??",
      options: ["Never", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you have trouble sleeping?",
      options: ["Never", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you feel a loss of interest in daily activities?",
      options: ["Never", "Sometimes", "Often", "Always"],
    },
    {
      question: "Do you feel overly anxious?",
      options: ["Never", "Sometimes", "Often", "Always"],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Vui lòng trả lời tất cả các câu hỏi trước khi gửi!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
      Mental Health Survey
      </h1>
      {!submitted ? (
        <div>
          {questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
              <p className="font-semibold text-lg mb-3">{index + 1}. {q.question}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswer(index, option)}
                    className={`py-2 px-4 rounded-lg text-white font-medium transition-all ${answers[index] === option ? "bg-blue-500" : "bg-gray-400 hover:bg-blue-400"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-bold mt-4 hover:bg-green-600 transition-all"
          >
            Send Survey
          </button>
        </div>
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-600">Thank you for completing the survey!</h2>
          <p className="mt-4 text-gray-700">Based on your answers, we recommend that you monitor your mental health regularly. Keep your mind healthy!</p>
          <p className="mt-4 text-pink-900">Learn more about health!!!</p> <button>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default Survey;
