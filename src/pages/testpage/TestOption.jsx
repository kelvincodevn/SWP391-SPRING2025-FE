import React, { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserTest } from "../../services/api.testq";


const TestSelectionPage = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            const data = await getUserTest();
            if (data) {
                setTests(data);
            }
        };
        fetchTests();
    }, []);

    const handleSelectTest = (id) => {
        navigate(`/test/${id}`); // Navigate to /test/:id
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-100 p-10">
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <FaClipboardList /> Select a Test
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className="bg-blue-700 text-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold mb-2">{test.testsName}</h2>
                        <p className="text-blue-200 mb-4">{test.testsDescription}</p>
                        <button
                            className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg transition-colors"
                            onClick={() => handleSelectTest(test.id)}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestSelectionPage;
