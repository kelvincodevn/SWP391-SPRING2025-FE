import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spin, Alert, Button } from "antd";
import { toast } from "react-toastify";
import { getRecommendedPsychologists } from "../../services/api.booking";


const RecommendationPage = () => {
    const [psychologists, setPsychologists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("userID");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const data = await getRecommendedPsychologists(userId);
                setPsychologists(data);
            } catch (err) {
                setError("Failed to fetch recommendations.");
                toast.error("Failed to fetch recommendations.");
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [userId]);

    if (loading) return <Spin tip="Loading recommendations..." />;
    if (error) return <Alert message={error} type="error" />;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Recommended Psychologists</h1>
            {psychologists.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                psychologists.map((psychologist) => (
                    <Card key={psychologist.userId} title={psychologist.fullName} className="mb-4">
                        <p><strong>Email:</strong> {psychologist.email}</p>
                        <p><strong>Major:</strong> {psychologist.major}</p>
                        <Button onClick={() => navigate(`/booking/${psychologist.userId}`)}>
                            Book Now
                        </Button>
                    </Card>
                ))
            )}
            <Button onClick={() => navigate("/testoption")}>Back to Tests</Button>
        </div>
    );
};

export default RecommendationPage;