import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, Spin, Alert } from 'antd';
import { toast } from 'react-toastify';
import { getUserSurveyHistory, getSurveyHistoryDetails } from '../../services/api.survey';

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Your Survey History</h1>
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
                    locale={{ emptyText: "You haven't taken any surveys yet." }}
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

export default StudentSurveyHistory;