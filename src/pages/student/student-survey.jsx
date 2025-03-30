import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, Spin, Alert } from 'antd';
import { toast } from 'react-toastify';
import { getUserSurveyHistory } from '../../services/api.survey';

function StudentSurveyHistory() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [surveyDetails, setSurveyDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSurveyHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserSurveyHistory();
            setSurveyResponses(data);
        } catch (error) {
            setError("Unable to load survey history. Please try again later.");
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
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Survey Title",
            dataIndex: ["survey", "title"],
            key: "surveyTitle",
        },
        {
            title: "Submitted At",
            dataIndex: "submittedAt",
            key: "submittedAt",
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button onClick={() => handleViewDetails(record)}>
                    View Details
                </Button>
            ),
        },
    ];

    const handleViewDetails = (response) => {
        setSurveyDetails(response);
        setViewDetailsModalOpen(true);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Your Survey History</h1>
            {error && <Alert message={error} type="error" showIcon className="mb-4" />}
            {loading ? (
                <div className="flex justify-center">
                    <Spin tip="Loading data..." />
                </div>
            ) : (
                <Table
                    dataSource={surveyResponses}
                    columns={columns}
                    rowKey="id"
                    locale={{ emptyText: "You haven't completed any surveys yet." }}
                />
            )}

            <Modal
                title="Survey Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
            >
                {surveyDetails ? (
                    <Form layout="vertical">
                        <Form.Item label="Survey Title">
                            <Input value={surveyDetails.survey.title} disabled />
                        </Form.Item>
                        <Form.Item label="Submitted At">
                            <Input value={new Date(surveyDetails.submittedAt).toLocaleString()} disabled />
                        </Form.Item>
                        <Form.Item label="Answers">
                            <ul className="list-disc pl-5">
                                {surveyDetails.answers.map((answer, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>Question: {answer.question.questionText}</strong>
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

export default StudentSurveyHistory;