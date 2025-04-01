import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Spin, Alert, Typography, Card, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { getUserTestHistory, getUserTestResults } from '../../services/api.testq';

const { Title, Text } = Typography;

function StudentTestHistory() {
    const [testResults, setTestResults] = useState([]);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [testHistoryDetails, setTestHistoryDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTestResults = async () => {
        setLoading(true);
        setError(null);
        const data = await getUserTestResults();
        setLoading(false);
        if (data) {
            setTestResults(data);
        } else {
            setError("Unable to load test history. Please try again later.");
        }
    };

    useEffect(() => {
        fetchTestResults();
    }, []);

    const columns = [
        {
            title: "Result ID",
            dataIndex: "resultId",
            key: "resultId",
        },
        {
            title: "Test Name",
            dataIndex: ["test", "testsName"],
            key: "testsName",
        },
        {
            title: "Total Score",
            dataIndex: "totalScore",
            key: "totalScore",
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button onClick={() => handleViewDetails(record.resultId)}>
                    View Details
                </Button>
            ),
        },
    ];

    const handleViewDetails = async (resultId) => {
        setLoading(true);
        const data = await getUserTestHistory(resultId);
        setLoading(false);
        if (data) {
            setTestHistoryDetails(data);
            setViewDetailsModalOpen(true);
        } else {
            toast.error("Unable to load test details. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Your Test History
            </Title>
            {error && <Alert message={error} type="error" showIcon className="mb-6 max-w-2xl mx-auto" />}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading data..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={testResults}
                    columns={columns}
                    rowKey="resultId"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "You haven't taken any tests yet." }}
                />
            )}

            <Modal
                title="Test History Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
                width={800}
                centered
            >
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading test details..." />
                    </div>
                ) : testHistoryDetails ? (
                    <div className="space-y-6">
                        {/* Card 1: Test Information */}
                        <Card
                            title="Test Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Result ID:</Text>
                                    <Text className="block">{testHistoryDetails.resultId || "N/A"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Test Name:</Text>
                                    <Text className="block">{testHistoryDetails.test?.testsName || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Total Score:</Text>
                                    <Text className="block">{testHistoryDetails.totalScore || "N/A"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Level:</Text>
                                    <Text className="block">{testHistoryDetails.level || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Test Version:</Text>
                                    <Text className="block">{testHistoryDetails.testVersion || "Not specified"}</Text>
                                </Col>
                            </Row>
                        </Card>

                        {/* Card 2: Answers */}
                        <Card
                            title="Answers"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            {testHistoryDetails.answers && testHistoryDetails.answers.length > 0 ? (
                                <div className="space-y-4">
                                    {testHistoryDetails.answers.map((answer, index) => (
                                        <div key={index} className="border-b pb-2">
                                            <Text strong>Question {index + 1}: </Text>
                                            <Text>{answer.question || "Not specified"}</Text>
                                            <div className="ml-4 mt-2">
                                                <Text strong>Answer: </Text>
                                                <Text>{answer.answer || "Not specified"} (Score: {answer.score || "0"})</Text>
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
                        <Text type="secondary">No test details available.</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default StudentTestHistory;