import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TestLayout = () => {
  const { testId } = useParams(); // Get test ID from URL
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Fetch test data dynamically
    axios
      .get(`https://api.example.com/tests/${testId}`) // Replace with actual API
      .then((response) => setTest(response.data))
      .catch((error) => console.error("Error fetching test:", error));
  }, [testId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    // You can send answers to the backend for scoring
    axios.post(`https://api.example.com/tests/${testId}/submit`, { answers })
      .then((response) => alert("Test submitted successfully!"))
      .catch((error) => console.error("Error submitting test:", error));
  };

  if (!test) return <p>Loading...</p>;

  return (
    <div>
      <h1>{test.title}</h1>
      <p>{test.description}</p>
      
      {test.questions.map((q) => (
        <div key={q.id}>
          <h3>{q.question}</h3>
          {q.type === "multiple_choice" ? (
            <div>
              {q.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    onChange={() => handleAnswerChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <textarea
              placeholder="Your answer..."
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
};

export default TestLayout;