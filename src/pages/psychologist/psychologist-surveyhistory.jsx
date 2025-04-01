import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, Spin, Alert } from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/axios';

function PsychologistSurveyHistory() {
    const [surveyHistory, setSurveyHistory] = useState([]);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [surveyDetails, setSurveyDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSurveyHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/api/psychologist/survey/history');
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
            const response = await api.get(`/api/psychologist/survey/history/${responseId}`);
            setSurveyDetails(response.data);
            setViewDetailsModalOpen(true);
        } catch (error) {
            toast.error(error.response?.data || "Unable to load survey details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Survey History (Psychologist View)</h1>
            {error && <Alert message={error} type="error" showIcon className="mb-4" />}
            {loading ? (
                <div className="flex justify-center">
                    <Spin tip="Loading data..." />
                </div>
            ) : (
                <Table
                    dataSource={surveyHistory}
                    columns={columns}
                    rowKey="responseId"
                    locale={{ emptyText: "No survey history available." }}
                />
            )}

            <Modal
                title="Survey Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
            >
                {loading ? (
                    <div className="flex justify-center">
                        <Spin tip="Loading details..." />
                    </div>
                ) : surveyDetails ? (
                    <Form layout="vertical">
                        <Form.Item label="Survey Name">
                            <Input value={surveyDetails.surveyName} disabled />
                        </Form.Item>
                        <Form.Item label="Student Name">
                            <Input value={surveyDetails.studentName} disabled />
                        </Form.Item>
                        <Form.Item label="Student Email">
                            <Input value={surveyDetails.studentEmail} disabled />
                        </Form.Item>
                        <Form.Item label="Submitted At">
                            <Input value={surveyDetails.submittedAt} disabled />
                        </Form.Item>
                        <Form.Item label="Answers">
                            <ul className="list-disc pl-5">
                                {surveyDetails.answers.map((answer, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>Question: {answer.questionText}</strong>
                                        <p>Answer: {answer.answerText}</p>
                                    </li>
                                ))}
                            </ul>
                        </Form.Item>
                    </Form>
                ) : (
                    <p>No details available to display.</p>
                )}
            </Modal>
        </div>
    );
}

export default PsychologistSurveyHistory;