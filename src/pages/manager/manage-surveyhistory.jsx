import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Spin, Alert, Typography, Card, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/axios';

const { Title, Text } = Typography;

function ManagerSurveyHistory() {
    const [surveyHistory, setSurveyHistory] = useState([]);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [surveyDetails, setSurveyDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSurveyHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/api/manager/survey/history');
            setSurveyHistory(response.data);
        } catch (error) {
            setError("Unable to load survey history. Please try again later.");
            toast.error(error.response?.data || "Failed to fetch survey history");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveyHistory();
    }, []);

    const columns = [
        {
            title: "Response ID",
            dataIndex: "responseId",
            key: "responseId",
        },
        {
            title: "Survey Name",
            dataIndex: "surveyName",
            key: "surveyName",
        },
        {
            title: "Student Name",
            dataIndex: "studentName",
            key: "studentName",
        },
        {
            title: "Student Email",
            dataIndex: "studentEmail",
            key: "studentEmail",
        },
        {
            title: "Submitted At",
            dataIndex: "submittedAt",
            key: "submittedAt",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button onClick={() => handleViewDetails(record.responseId)}>
                    View Details
                </Button>
            ),
        },
    ];

    const handleViewDetails = async (responseId) => {
        setLoading(true);
        try {
            const response = await api.get(`/api/manager/survey/history/${responseId}`);
            setSurveyDetails(response.data);
            setViewDetailsModalOpen(true);
        } catch (error) {
            toast.error(error.response?.data || "Unable to load survey details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Survey History (Manager View)
            </Title>
            {error && <Alert message={error} type="error" showIcon className="mb-6 max-w-2xl mx-auto" />}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading data..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={surveyHistory}
                    columns={columns}
                    rowKey="responseId"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "No survey history available." }}
                />
            )}

            <Modal
                title="Survey Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
                width={800}
                centered
            >
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading survey details..." />
                    </div>
                ) : surveyDetails ? (
                    <div className="space-y-6">
                        {/* Card 1: Survey Information */}
                        <Card
                            title="Survey Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Response ID:</Text>
                                    <Text className="block">{surveyDetails.responseId || "N/A"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Survey Name:</Text>
                                    <Text className="block">{surveyDetails.surveyName || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Student Name:</Text>
                                    <Text className="block">{surveyDetails.studentName || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Student Email:</Text>
                                    <Text className="block">{surveyDetails.studentEmail || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Submitted At:</Text>
                                    <Text className="block">{surveyDetails.submittedAt || "Not specified"}</Text>
                                </Col>
                            </Row>
                        </Card>

                        {/* Card 2: Answers */}
                        <Card
                            title="Answers"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            {surveyDetails.answers && surveyDetails.answers.length > 0 ? (
                                <div className="space-y-4">
                                    {surveyDetails.answers.map((answer, index) => (
                                        <div key={index} className="border-b pb-2">
                                            <Text strong>Question {index + 1}: </Text>
                                            <Text>{answer.questionText || "Not specified"}</Text>
                                            <div className="ml-4 mt-2">
                                                <Text strong>Answer: </Text>
                                                <Text>{answer.answerText || "Not specified"}</Text>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Text type="secondary">No answers available.</Text>
                            )}
                        </Card>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <Text type="secondary">No survey details available.</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ManagerSurveyHistory;