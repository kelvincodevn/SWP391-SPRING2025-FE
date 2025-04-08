import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TestResultPage = () => {
    const { state } = useLocation(); // Get the result data passed from GeneralTestPage
    const navigate = useNavigate();

    // Check if state exists, otherwise redirect or show an error
    if (!state) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-10">
                <h1 className="text-2xl font-bold mb-6">Error</h1>
                <p className="text-lg mb-4">No result data available. Please complete a test first.</p>
                <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={() => navigate("/testoption")}
                >
                    Back to Test Selection
                </button>
            </div>
        );
    }

    const { totalScore, level, description, testName } = state;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-10">
            <h1 className="text-2xl font-bold mb-6">{testName} Test Result</h1>
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl text-center">
                <h2 className="text-xl font-semibold mb-4">Your Total Score: {totalScore}</h2>
                <h3 className="text-lg font-medium mb-2">Level: {level}</h3>
                <p className="text-md mb-6">{description}</p>
                <button
                    className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                    onClick={() => navigate("/testoption")}
                >
                    Take Another Test
                </button>
                <button
                    className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                    onClick={() => navigate("/recommendation")}
                >
                    See Recommended Psychologists
                </button>
                <button
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default TestResultPage;