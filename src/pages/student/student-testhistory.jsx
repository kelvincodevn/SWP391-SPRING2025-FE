// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Table, Form, Input } from 'antd';
// import { toast } from 'react-toastify';
// import api from '../../config/axios'; // Adjust the import path
// import { getUserTestHistory, getUserTestResults } from '../../services/api.testq';


// function UserTestHistory() {
//     const [testResults, setTestResults] = useState([]);
//     const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
//     const [testHistoryDetails, setTestHistoryDetails] = useState(null);

//     const fetchTestResults = async () => {
//         const data = await getUserTestResults();
//         if (data) {
//             setTestResults(data);
//         }
//     };

//     useEffect(() => {
//         fetchTestResults();
//     }, []);

//     const columns = [
//         {
//             title: "Result ID",
//             dataIndex: "resultId",
//             key: "resultId",
//         },
//         {
//             title: "Test Name",
//             dataIndex: ["test", "testsName"],
//             key: "testsName",
//         },
//         {
//             title: "Total Score",
//             dataIndex: "totalScore",
//             key: "totalScore",
//         },
//         {
//             title: "Level",
//             dataIndex: "level",
//             key: "level",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <Button onClick={() => handleViewDetails(record.resultId)}>
//                     View Details
//                 </Button>
//             ),
//         },
//     ];

    
//     const handleViewDetails = async (resultId) => {
//         const data = await getUserTestHistory(resultId);
//         if (data) {
//             setTestHistoryDetails(data);
//             setViewDetailsModalOpen(true);
//         }
//     };

//     return (
//         <div>
//             <Table dataSource={testResults} columns={columns} />

//             <Modal
//                 title={"Test History Details"}
//                 open={viewDetailsModalOpen}
//                 onCancel={() => setViewDetailsModalOpen(false)}
//                 footer={null}
//             >
//                 {testHistoryDetails && (
//                     <Form layout="vertical">
//                         <Form.Item label="Total Score">
//                             <Input value={testHistoryDetails.totalScore} disabled />
//                         </Form.Item>
//                         <Form.Item label="Test Version">
//                             <Input value={testHistoryDetails.testVersion} disabled />
//                         </Form.Item>
//                         <Form.Item label="Answers">
//                             <ul>
//                                 {testHistoryDetails.answers.map((answer, index) => (
//                                     <li key={index}>
//                                         <strong>Q: {answer.question}</strong>
//                                         <p>Answer: {answer.answer} (Score: {answer.score})</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </Form.Item>
//                     </Form>
//                 )}
//             </Modal>
//         </div>
//     );
// }

// export default UserTestHistory;

import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, Spin, Alert } from 'antd';
import { toast } from 'react-toastify';
import { getUserTestHistory, getUserTestResults } from '../../services/api.testq';

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Your Test History</h1>
            {error && <Alert message={error} type="error" showIcon className="mb-4" />}
            {loading ? (
                <div className="flex justify-center">
                    <Spin tip="Loading data..." />
                </div>
            ) : (
                <Table
                    dataSource={testResults}
                    columns={columns}
                    rowKey="resultId"
                    locale={{ emptyText: "You haven't taken any tests yet." }}
                />
            )}

            <Modal
                title="Test History Details"
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
            >
                {loading ? (
                    <div className="flex justify-center">
                        <Spin tip="Loading details..." />
                    </div>
                ) : testHistoryDetails ? (
                    <Form layout="vertical">
                        <Form.Item label="Total Score">
                            <Input value={testHistoryDetails.totalScore} disabled />
                        </Form.Item>
                        <Form.Item label="Test Version">
                            <Input value={testHistoryDetails.testVersion} disabled />
                        </Form.Item>
                        <Form.Item label="Answers">
                            <ul className="list-disc pl-5">
                                {testHistoryDetails.answers.map((answer, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>Question: {answer.question}</strong>
                                        <p>Answer: {answer.answer} (Score: {answer.score})</p>
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

export default StudentTestHistory;