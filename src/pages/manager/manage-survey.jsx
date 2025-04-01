import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Upload, Table, Spin, Modal, Alert, Typography, Card, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createSurveyFromExcel, getAllSurveys, getSurveyDetails } from '../../services/api.survey'; // Import getSurveyDetails
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

function ManageSurvey() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái để điều khiển Modal Create Survey
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false); // Trạng thái để điều khiển Modal View Details
    const [surveyDetails, setSurveyDetails] = useState(null); // Chi tiết survey
    const [detailsLoading, setDetailsLoading] = useState(false); // Loading cho modal View Details
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [form] = useForm();

    const fetchSurveys = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllSurveys();
            if (data) {
                setSurveys(data);
            } else {
                setError("Failed to load surveys. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching surveys.");
            console.error("Error fetching surveys:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys]);

    // Cập nhật cột hiển thị trong bảng, thêm cột Action
    const columns = [
        { title: 'Survey ID', dataIndex: 'id', key: 'id' },
        { title: 'Survey Name', dataIndex: 'surveyName', key: 'surveyName' },
        { title: 'Description', dataIndex: 'surveyDescription', key: 'surveyDescription' },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        onClick={() => handleViewDetails(record.id)}
                        disabled={loading}
                    >
                        View Details
                    </Button>
                </div>
            ),
        },
    ];

    // Xử lý submit form tạo survey
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const file = values.file.fileList[0].originFileObj;
            await createSurveyFromExcel(file);
            toast.success("Survey created successfully");
            form.resetFields();
            setIsModalOpen(false); // Đóng Modal sau khi submit thành công
            fetchSurveys(); // Làm mới danh sách survey
        } catch (error) {
            console.error("Error creating survey:", error);
            toast.error("Failed to create survey.");
        } finally {
            setLoading(false);
        }
    };

    // Xử lý xem chi tiết survey, sử dụng getSurveyDetails từ api.survey.js
    const handleViewDetails = async (surveyId) => {
        setDetailsLoading(true);
        setSurveyDetails(null); // Reset dữ liệu trước khi lấy mới
        try {
            const details = await getSurveyDetails(surveyId);
            if (details) {
                setSurveyDetails(details);
                setViewDetailsModalOpen(true);
            } else {
                toast.error("No survey details found.");
            }
        } catch (error) {
            console.error("Error fetching survey details:", error);
            // Thông báo lỗi đã được xử lý trong getSurveyDetails, không cần toast thêm
        } finally {
            setDetailsLoading(false);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Surveys
            </Title>

            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="mb-6 max-w-2xl mx-auto"
                />
            )}

            <div className="mb-4">
                <Button type="primary" onClick={showModal} disabled={loading}>
                    Create Survey
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading surveys..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={surveys}
                    columns={columns}
                    rowKey="id"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "No surveys found." }}
                />
            )}

            {/* Modal for Create Survey */}
            <Modal
                title="Create New Survey"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="file"
                        label="Upload Survey Excel"
                        rules={[{ required: true, message: 'Please upload an Excel file' }]}
                    >
                        <Upload accept=".xlsx, .xls" maxCount={1}>
                            <Button disabled={loading}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 8 }} disabled={loading}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal for View Details */}
            <Modal
                title="Survey Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
                width={800}
                centered
            >
                {detailsLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading survey details..." />
                    </div>
                ) : surveyDetails ? (
                    <div className="space-y-6">
                        <Card
                            title="Survey Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Survey ID:</Text>
                                    <Text className="block">{surveyDetails.surveyId || "N/A"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Survey Name:</Text>
                                    <Text className="block">{surveyDetails.surveyName || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Description:</Text>
                                    <Text className="block">{surveyDetails.surveyDescription || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Total Questions:</Text>
                                    <Text className="block">{surveyDetails.totalQuestions || "N/A"}</Text>
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title="Questions"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            {surveyDetails.questions && surveyDetails.questions.length > 0 ? (
                                <div className="space-y-4">
                                    {surveyDetails.questions.map((question) => (
                                        <div key={question.questionNumber} className="border-b pb-2">
                                            <Text strong>Q{question.questionNumber}: </Text>
                                            <Text>{question.questionText || "Not specified"}</Text>
                                            <div className="ml-4 mt-2">
                                                <Text strong>Answer Options:</Text>
                                                <ul className="list-disc ml-4">
                                                    {question.answers && question.answers.length > 0 ? (
                                                        question.answers.map((answer, index) => (
                                                            <li key={index}>
                                                                {answer.answerText || "Not specified"}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <Text type="secondary">No answer options available.</Text>
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
                        <Text type="secondary">No survey details available.</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ManageSurvey;