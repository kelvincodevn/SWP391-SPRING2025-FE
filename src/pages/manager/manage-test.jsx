import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal, Table, Upload, Form, Input, Spin, Alert, Typography, Card, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { createTest, deleteTest, getTest, getTestById } from '../../services/api.testq';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function ManageTest() {
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false); // Modal cho Create Test
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false); // Modal cho View Details
    const [fileList, setFileList] = useState([]); // Danh sách file để upload
    const [testDetails, setTestDetails] = useState(null); // Chi tiết test
    const [loading, setLoading] = useState(false); // Loading cho danh sách tests
    const [actionLoading, setActionLoading] = useState(false); // Loading cho các hành động (delete, create)
    const [detailsLoading, setDetailsLoading] = useState(false); // Loading cho modal View Details
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const navigate = useNavigate();

    // Hàm lấy danh sách tests
    const fetchTests = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTest();
            if (data) {
                setTests(data);
            } else {
                setError("Failed to load tests. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching tests.");
            console.error("Error fetching tests:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTests();
    }, [fetchTests]);

    const columns = [
        {
            title: "Test ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Test Name",
            dataIndex: "testsName",
            key: "testsName",
        },
        {
            title: "Test Description",
            dataIndex: "testsDescription",
            key: "testsDescription",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        danger
                        onClick={() => handleDelete(record.id)}
                        disabled={actionLoading}
                        loading={actionLoading}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => handleViewDetails(record.id)}
                        disabled={actionLoading}
                    >
                        View Details
                    </Button>
                </div>
            ),
        },
    ];

    const handleDelete = useCallback((id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this test?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                setActionLoading(true);
                try {
                    await deleteTest(id);
                    toast.success("Test deleted successfully");
                    fetchTests();
                } catch (error) {
                    console.error("Error deleting test:", error);
                    toast.error("Failed to delete test.");
                } finally {
                    setActionLoading(false);
                }
            },
        });
    }, [fetchTests]);

    const handleViewDetails = useCallback(async (id) => {
        setDetailsLoading(true);
        setTestDetails(null); // Reset dữ liệu trước khi lấy mới
        try {
            const details = await getTestById(id);
            if (details) {
                setTestDetails(details);
                setViewDetailsModalOpen(true);
            } else {
                toast.error("No test details found.");
            }
        } catch (error) {
            console.error("Error fetching test details:", error);
            toast.error("Failed to fetch test details.");
        } finally {
            setDetailsLoading(false);
        }
    }, []);

    const handleFileUpload = useCallback(async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            setActionLoading(true);
            try {
                await createTest(newFileList[0].originFileObj);
                // toast.success("Test created successfully");
                setFileList([]);
                setOpen(false);
                fetchTests();
            } catch (error) {
                console.error("Upload failed", error);
                toast.error("Failed to create test.");
            } finally {
                setActionLoading(false);
            }
        }
    }, [fetchTests]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Tests
            </Title>

            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="mb-6 max-w-2xl mx-auto"
                />
            )}

            <Button
                type="primary"
                onClick={() => setOpen(true)}
                className="mb-4"
                disabled={actionLoading}
            >
                Create Test
            </Button>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading tests..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={tests}
                    columns={columns}
                    rowKey="id"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "No tests found." }}
                />
            )}

            {/* Modal for Create Test */}
            <Modal
                title="Create Test"
                open={open}
                onCancel={() => { setOpen(false); setFileList([]); }}
                footer={null}
                centered
            >
                <Upload
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleFileUpload}
                    maxCount={1}
                    disabled={actionLoading}
                >
                    <Button disabled={actionLoading}>Select Excel File</Button>
                </Upload>
                {actionLoading && (
                    <div className="mt-4 flex justify-center">
                        <Spin tip="Uploading test..." />
                    </div>
                )}
            </Modal>

            {/* Modal for View Details */}
            <Modal
                title="Test Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
                width={800}
                centered
            >
                {detailsLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading test details..." />
                    </div>
                ) : testDetails ? (
                    <div className="space-y-6">
                        <Card
                            title="Test Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Test ID:</Text>
                                    <Text className="block">{testDetails.testId || "N/A"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Test Name:</Text>
                                    <Text className="block">{testDetails.testName || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Total Questions:</Text>
                                    <Text className="block">{testDetails.totalQuestions || "N/A"}</Text>
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title="Questions"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            {testDetails.questions && testDetails.questions.length > 0 ? (
                                <div className="space-y-4">
                                    {testDetails.questions.map((question) => (
                                        <div key={question.questionNumber} className="border-b pb-2">
                                            <Text strong>Q{question.questionNumber}: </Text>
                                            <Text>{question.questionText || "Not specified"}</Text>
                                            <div className="ml-4 mt-2">
                                                <Text strong>Answers:</Text>
                                                <ul className="list-disc ml-4">
                                                    {question.answers && question.answers.length > 0 ? (
                                                        question.answers.map((answer, index) => (
                                                            <li key={index}>
                                                                {answer.answerText || "Not specified"} (Score: {answer.score || "0"})
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">No answers available.</Text>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Text type="secondary">No questions available.</Text>
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

export default ManageTest;