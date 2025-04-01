import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Spin, Alert, Typography, Card, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { getUserSurveyHistory, getSurveyHistoryDetails } from '../../services/api.survey';

const { Title, Text } = Typography;

function StudentSurveyHistory() {
    const [surveyHistory, setSurveyHistory] = useState([]);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [surveyDetails, setSurveyDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSurveyHistory = async () => {
        setLoading(true);
        setError(null);
        const data = await getUserSurveyHistory();
        setLoading(false);
        if (data) {
            setSurveyHistory(data);
        } else {
            setError("Unable to load survey history. Please try again later.");
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
        const data = await getSurveyHistoryDetails(responseId);
        setLoading(false);
        if (data) {
            setSurveyDetails(data);
            setViewDetailsModalOpen(true);
        } else {
            toast.error("Unable to load survey details. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Your Survey History
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
                    locale={{ emptyText: "You haven't taken any surveys yet." }}
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

export default StudentSurveyHistory;