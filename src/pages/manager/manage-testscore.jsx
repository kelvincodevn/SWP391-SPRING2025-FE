// import React, { useEffect, useState, useCallback } from 'react';
// import { Button, Modal, Table, Form, Input, InputNumber, Select, Space, Spin, Alert, Typography } from 'antd';
// import { toast } from 'react-toastify';
// import { createTestScoring, deleteTestScoring, getTest, getTestScoring, updateTestScoring } from '../../services/api.testq';

// const { Title, Text } = Typography;
// const { Option } = Select;

// function ManageTestScore() {
//     const [testScores, setTestScores] = useState([]);
//     const [tests, setTests] = useState([]);
//     const [open, setOpen] = useState(false); // Modal cho Create/Edit Test Score
//     const [form] = Form.useForm();
//     const [editingTestScore, setEditingTestScore] = useState(null);
//     const [selectedTestId, setSelectedTestId] = useState(null);
//     const [loadingTests, setLoadingTests] = useState(false); // Loading cho danh sách tests
//     const [loadingScores, setLoadingScores] = useState(false); // Loading cho danh sách test scores
//     const [actionLoading, setActionLoading] = useState(false); // Loading cho các hành động (create, update, delete)
//     const [error, setError] = useState(null); // Lưu lỗi nếu có

//     // Hàm lấy danh sách tests
//     const fetchTests = useCallback(async () => {
//         setLoadingTests(true);
//         setError(null);
//         try {
//             const data = await getTest();
//             if (data) {
//                 setTests(data);
//             } else {
//                 setError("Failed to load tests. Please try again later.");
//             }
//         } catch (error) {
//             setError("An error occurred while fetching tests.");
//             console.error("Error fetching tests:", error);
//         } finally {
//             setLoadingTests(false);
//         }
//     }, []);

//     // Hàm lấy danh sách test scores
//     const fetchTestScores = useCallback(async (testId) => {
//         setLoadingScores(true);
//         setError(null);
//         try {
//             const data = await getTestScoring(testId);
//             if (data) {
//                 setTestScores(data);
//             } else {
//                 setError("Failed to load test scores. Please try again later.");
//             }
//         } catch (error) {
//             setError("An error occurred while fetching test scores.");
//             console.error("Error fetching test scores:", error);
//         } finally {
//             setLoadingScores(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchTests();
//     }, [fetchTests]);

//     useEffect(() => {
//         if (selectedTestId) {
//             fetchTestScores(selectedTestId);
//         } else {
//             setTestScores([]); // Reset test scores nếu chưa chọn test
//         }
//     }, [selectedTestId, fetchTestScores]);

//     const columns = [
//         { title: "ID", dataIndex: "id", key: "id" },
//         { title: "Min Score", dataIndex: "minScore", key: "minScore" },
//         { title: "Max Score", dataIndex: "maxScore", key: "maxScore" },
//         { title: "Level", dataIndex: "level", key: "level" },
//         { title: "Description", dataIndex: "description", key: "description" },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleEdit(record)}
//                         disabled={actionLoading}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         danger
//                         onClick={() => handleDelete(record.id)}
//                         disabled={actionLoading}
//                         loading={actionLoading}
//                     >
//                         Delete
//                     </Button>
//                 </Space>
//             ),
//         },
//     ];

//     const handleEdit = (testScore) => {
//         setEditingTestScore(testScore);
//         form.setFieldsValue(testScore);
//         setOpen(true);
//     };

//     const handleDelete = useCallback((scoringId) => {
//         Modal.confirm({
//             title: 'Are you sure you want to delete this test score?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, delete',
//             okType: 'danger',
//             cancelText: 'No, cancel',
//             onOk: async () => {
//                 setActionLoading(true);
//                 try {
//                     await deleteTestScoring(scoringId);
//                     toast.success("Test score deleted successfully");
//                     fetchTestScores(selectedTestId);
//                 } catch (error) {
//                     toast.error("Failed to delete test score");
//                     console.error("Error deleting test score:", error);
//                 } finally {
//                     setActionLoading(false);
//                 }
//             },
//         });
//     }, [selectedTestId, fetchTestScores]);

//     const handleSubmit = useCallback(async (values) => {
//         if (!selectedTestId) {
//             toast.error("Please select a test before creating a test score.");
//             return;
//         }

//         setActionLoading(true);
//         try {
//             if (editingTestScore) {
//                 await updateTestScoring(editingTestScore.id, values);
//                 toast.success("Test score updated successfully");
//             } else {
//                 await createTestScoring(selectedTestId, values);
//                 toast.success("Test score created successfully");
//             }
//             fetchTestScores(selectedTestId);
//             setOpen(false);
//             form.resetFields();
//             setEditingTestScore(null);
//         } catch (error) {
//             toast.error("Failed to create/update test score");
//             console.error("Error creating/updating test score:", error);
//         } finally {
//             setActionLoading(false);
//         }
//     }, [selectedTestId, editingTestScore, fetchTestScores, form]);

//     return (
//         <div className="p-8 bg-gray-50 min-h-screen">
//             <Title level={2} className="mb-8 text-center">
//                 Manage Test Scores
//             </Title>

//             {error && (
//                 <Alert
//                     message={error}
//                     type="error"
//                     showIcon
//                     className="mb-6 max-w-2xl mx-auto"
//                 />
//             )}

//             <div className="mb-4 flex items-center gap-4">
//                 <Select
//                     style={{ width: 200 }}
//                     onChange={(value) => setSelectedTestId(value)}
//                     placeholder="Select a test"
//                     loading={loadingTests}
//                     value={selectedTestId}
//                 >
//                     {tests.map(test => (
//                         <Option key={test.id} value={test.id}>
//                             {test.testsName}
//                         </Option>
//                     ))}
//                 </Select>
//                 <Button
//                     type="primary"
//                     onClick={() => { setOpen(true); setEditingTestScore(null); form.resetFields(); }}
//                     disabled={actionLoading || !selectedTestId}
//                 >
//                     Create Test Score
//                 </Button>
//             </div>

//             {loadingScores ? (
//                 <div className="flex justify-center items-center h-64">
//                     <Spin tip="Loading test scores..." size="large" />
//                 </div>
//             ) : (
//                 <Table
//                     dataSource={testScores}
//                     columns={columns}
//                     rowKey="id"
//                     className="shadow-md rounded-lg"
//                     pagination={{ pageSize: 5 }}
//                     locale={{ emptyText: selectedTestId ? "No test scores found for this test." : "Please select a test to view scores." }}
//                 />
//             )}

//             {/* Modal for Create/Edit Test Score */}
//             <Modal
//                 title={editingTestScore ? "Edit Test Score" : "Create Test Score"}
//                 open={open}
//                 onCancel={() => { setOpen(false); form.resetFields(); setEditingTestScore(null); }}
//                 onOk={() => form.submit()}
//                 okButtonProps={{ loading: actionLoading }}
//                 cancelButtonProps={{ disabled: actionLoading }}
//                 centered
//             >
//                 <Form form={form} layout="vertical" onFinish={handleSubmit}>
//                     <Form.Item
//                         label="Min Score"
//                         name="minScore"
//                         rules={[{ required: true, message: "Please enter min score" }]}
//                     >
//                         <InputNumber style={{ width: '100%' }} min={0} />
//                     </Form.Item>
//                     <Form.Item
//                         label="Max Score"
//                         name="maxScore"
//                         rules={[{ required: true, message: "Please enter max score" }]}
//                     >
//                         <InputNumber style={{ width: '100%' }} min={0} />
//                     </Form.Item>
//                     <Form.Item
//                         label="Level"
//                         name="level"
//                         rules={[{ required: true, message: "Please enter level" }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         label="Description"
//                         name="description"
//                         rules={[{ required: true, message: "Please enter description" }]}
//                     >
//                         <Input.TextArea rows={4} />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default ManageTestScore;

import React, { useEffect, useState, useCallback } from 'react';
import { Button, Modal, Table, Form, Input, InputNumber, Select, Space, Spin, Alert, Typography } from 'antd';
import { toast } from 'react-toastify';
import { createTestScoring, deleteTestScoring, getTest, getTestScoring, updateTestScoring } from '../../services/api.testq';

const { Title, Text } = Typography;
const { Option } = Select;

function ManageTestScore() {
    const [testScores, setTestScores] = useState([]);
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingTestScore, setEditingTestScore] = useState(null);
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [loadingTests, setLoadingTests] = useState(false);
    const [loadingScores, setLoadingScores] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTests = useCallback(async () => {
        setLoadingTests(true);
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
            setLoadingTests(false);
        }
    }, []);

    const fetchTestScores = useCallback(async (testId) => {
        setLoadingScores(true);
        setError(null);
        try {
            const data = await getTestScoring(testId);
            if (data) {
                setTestScores(data);
            } else {
                setError("Failed to load test scores. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching test scores.");
            console.error("Error fetching test scores:", error);
        } finally {
            setLoadingScores(false);
        }
    }, []);

    useEffect(() => {
        fetchTests();
    }, [fetchTests]);

    useEffect(() => {
        if (selectedTestId) {
            fetchTestScores(selectedTestId);
        } else {
            setTestScores([]);
        }
    }, [selectedTestId, fetchTestScores]);

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Min Score", dataIndex: "minScore", key: "minScore" },
        { title: "Max Score", dataIndex: "maxScore", key: "maxScore" },
        { title: "Level", dataIndex: "level", key: "level" },
        { title: "Description", dataIndex: "description", key: "description" },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record)}
                        disabled={actionLoading}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDelete(record.id)}
                        disabled={actionLoading}
                        loading={actionLoading}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (testScore) => {
        setEditingTestScore(testScore);
        form.setFieldsValue(testScore);
        setOpen(true);
    };

    const handleDelete = useCallback((scoringId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this test score?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                setActionLoading(true);
                try {
                    await deleteTestScoring(scoringId);
                    toast.success("Test score deleted successfully");
                    fetchTestScores(selectedTestId);
                } catch (error) {
                    toast.error("Failed to delete test score");
                    console.error("Error deleting test score:", error);
                } finally {
                    setActionLoading(false);
                }
            },
        });
    }, [selectedTestId, fetchTestScores]);

    const handleSubmit = useCallback(async (values) => {
        if (!selectedTestId) {
            toast.error("Please select a test before creating a test score.");
            return;
        }

        setActionLoading(true);
        try {
            if (editingTestScore) {
                await updateTestScoring(editingTestScore.id, values);
                toast.success("Test score updated successfully");
            } else {
                await createTestScoring(selectedTestId, values);
                toast.success("Test score created successfully");
            }
            fetchTestScores(selectedTestId);
            setOpen(false);
            form.resetFields();
            setEditingTestScore(null);
        } catch (error) {
            toast.error(error.response?.data || "Failed to create/update test score");
            console.error("Error creating/updating test score:", error);
        } finally {
            setActionLoading(false);
        }
    }, [selectedTestId, editingTestScore, fetchTestScores, form]);

    // Custom validator để kiểm tra minScore < maxScore
    const validateScoreRange = ({ getFieldValue }) => ({
        validator(_, value) {
            const minScore = getFieldValue('minScore');
            const maxScore = getFieldValue('maxScore');
            if (minScore !== undefined && maxScore !== undefined && minScore >= maxScore) {
                return Promise.reject(new Error('Min Score must be less than Max Score'));
            }
            return Promise.resolve();
        },
    });

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Test Scores
            </Title>

            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="mb-6 max-w-2xl mx-auto"
                />
            )}

            <div className="mb-4 flex items-center gap-4">
                <Select
                    style={{ width: 200 }}
                    onChange={(value) => setSelectedTestId(value)}
                    placeholder="Select a test"
                    loading={loadingTests}
                    value={selectedTestId}
                >
                    {tests.map(test => (
                        <Option key={test.id} value={test.id}>
                            {test.testsName}
                        </Option>
                    ))}
                </Select>
                <Button
                    type="primary"
                    onClick={() => { setOpen(true); setEditingTestScore(null); form.resetFields(); }}
                    disabled={actionLoading || !selectedTestId}
                >
                    Create Test Score
                </Button>
            </div>

            {loadingScores ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading test scores..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={testScores}
                    columns={columns}
                    rowKey="id"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: selectedTestId ? "No test scores found for this test." : "Please select a test to view scores." }}
                />
            )}

            {/* Modal for Create/Edit Test Score */}
            <Modal
                title={editingTestScore ? "Edit Test Score" : "Create Test Score"}
                open={open}
                onCancel={() => { setOpen(false); form.resetFields(); setEditingTestScore(null); }}
                onOk={() => form.submit()}
                okButtonProps={{ loading: actionLoading }}
                cancelButtonProps={{ disabled: actionLoading }}
                centered
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Min Score"
                        name="minScore"
                        rules={[
                            { required: true, message: "Please enter min score" },
                            { type: 'number', min: 0, message: "Min score must be at least 0" },
                            validateScoreRange,
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Max Score"
                        name="maxScore"
                        rules={[
                            { required: true, message: "Please enter max score" },
                            { type: 'number', min: 0, message: "Max score must be at least 0" },
                            validateScoreRange,
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Level"
                        name="level"
                        rules={[
                            { required: true, message: "Please enter level" },
                            { max: 50, message: "Level must not exceed 50 characters" },
                            { pattern: /^[A-Za-z0-9\s-]+$/, message: "Level should only contain letters, numbers, spaces, or hyphens" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            { required: true, message: "Please enter description" },
                            { max: 500, message: "Description must not exceed 500 characters" },
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManageTestScore;