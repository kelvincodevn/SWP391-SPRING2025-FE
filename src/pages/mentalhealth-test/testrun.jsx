import { useState } from "react";

const TestQuestionAndAnswer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);

  const question = {
    id: 1,
    text: "Tôi thấy khó mà thoải mái được",
    options: [
      "Không đúng với tôi chút nào cả",
      "Đúng với tôi một phần, hoặc thỉnh thoảng mới đúng",
      "Đúng với tôi phần nhiều, hoặc phần lớn thời gian là đúng",
      "Hoàn toàn đúng với tôi, hoặc hầu hết thời gian là đúng",
    ],
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      setProgress(progress + (100 / 21)); // Example progress calculation
      setSelectedOption(null); // Reset selection for next question
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Trạng thái hoàn thành</p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
          <div
            className="bg-gray-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{Math.round(progress)}/21</p>
      </div>

      {/* Question Box */}
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold">{question.text}</h2>
        <div className="mt-3 space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                selectedOption === option ? "border-gray-700 bg-gray-100" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="question"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className="mr-3"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!selectedOption}
        className={`w-full mt-6 py-3 text-white font-semibold rounded-lg transition ${
          selectedOption ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Tiếp theo
      </button>
    </div>
  );
};

export default TestQuestionAndAnswer;