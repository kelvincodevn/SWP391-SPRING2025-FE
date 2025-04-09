import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getRecommendedPsychologists } from "../../services/api.booking";


const TestResultPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [recommendedPsychologists, setRecommendedPsychologists] = useState([]);
    const carouselRef = useRef(null);

    const userId = localStorage.getItem("userID");

    useEffect(() => {
        const fetchRecommendedPsychologists = async () => {
            try {
                const psychologists = await getRecommendedPsychologists(userId);
                const uniquePsychologists = Array.from(
                    new Map(psychologists.map((p) => [p.userId, p])).values()
                );
                setRecommendedPsychologists(uniquePsychologists);
            } catch (error) {
                console.error("Error fetching recommended psychologists:", error);
            }
        };

        if (userId) {
            fetchRecommendedPsychologists();
        }
    }, [userId]);

    const formatCurrency = (amount) => {
        if (!amount) return "0 VND";
        return amount.toLocaleString("vi-VN") + " VND";
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

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
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg w-full mt-4 transition-colors"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>

            {recommendedPsychologists.length > 0 && (
                <div className="max-w-6xl mx-auto mt-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-blue-800 text-center lg:text-left">
                            Recommended Psychologists
                        </h2>
                        <div className="flex gap-3 mt-5 lg:mt-0">
                            <button
                                onClick={scrollLeft}
                                className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-300 transition"
                            >
                                <FaArrowLeft size={20} />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-300 transition"
                            >
                                <FaArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="carousel-container">
                        <div className="carousel" ref={carouselRef}>
                            {recommendedPsychologists.map((psychologist) => (
                                <div
                                    key={psychologist.userId}
                                    className="carousel-item"
                                >
                                    <div className="bg-white rounded-lg shadow-md p-6 h-64 flex flex-col justify-between">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-semibold">{psychologist.fullName}</h3>
                                            <p className="text-gray-600">{psychologist.major || "Psychologist"}</p>
                                        </div>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Workplace:</strong> {psychologist.workplace || "N/A"}
                                        </p>
                                        <p className="text-gray-600 mb-4">
                                            <strong>Fee:</strong> {formatCurrency(psychologist.fee)}
                                        </p>
                                        <button
                                            onClick={() => navigate("/appointment", { state: { selectedPsychologist: psychologist } })}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                                        >
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .carousel-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                }
                .carousel {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .carousel::-webkit-scrollbar {
                    display: none;
                }
                .carousel-item {
                    flex: 0 0 calc(33.333% - 1rem);
                    margin-right: 1.5rem;
                    scroll-snap-align: start;
                }
                .carousel-item:last-child {
                    margin-right: 0;
                }
                @media (max-width: 1024px) {
                    .carousel-item {
                        flex: 0 0 calc(50% - 1rem);
                    }
                }
                @media (max-width: 768px) {
                    .carousel-item {
                        flex: 0 0 calc(100% - 1rem);
                    }
                }
            `}</style>
        </div>
    );
};

export default TestResultPage;