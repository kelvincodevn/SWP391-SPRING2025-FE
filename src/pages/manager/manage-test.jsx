// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Modal, Table } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { createTest, deleteTest, getTest } from '../../services/api.testq';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function ManageTest() {
//     const [tests, setTests] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingTest, setEditingTest] = useState(null);
//     const navigate = useNavigate(); // Initialize useNavigate

//     const fetchTests = async () => {
//         const data = await getTest();
//         setTests(data);
//     };

//     useEffect(() => {
//         fetchTests();
//     }, []);

//     const columns = [
//         {
//             title: "Test ID",
//             dataIndex: "id",
//             key: "id",
//         },
//         {
//             title: "Test Name",
//             dataIndex: "testsName",
//             key: "testsName",
//         },
//         {
//             title: "Test Description",
//             dataIndex: "testsDescription",
//             key: "testsDescription",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <>
//                     <Button type="primary" onClick={() => handleEdit(record)}>
//                         Edit
//                     </Button>
//                     <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.id)}>
//                         Delete
//                     </Button>
//                     <Button style={{ marginLeft: '8px' }} onClick={() => handleViewDetails(record.id)}>
//                         View Details
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleEdit = (test) => {
//         setEditingTest(test);
//         form.setFieldsValue(test);
//         setOpen(true);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteTest(id);
//             toast.success("Test deleted successfully");
//             fetchTests();
//         } catch (error) {
//             console.error("Error deleting test:", error);
//             toast.error("Failed to delete test.");
//         }
//     };

//     const handleSubmit = async (formValues) => {
//         try {
//             if (editingTest) {
//                 await createTest(formValues, editingTest.id);
//                 toast.success("Test updated successfully");
//                 setEditingTest(null);
//             } else {
//                 await createTest(formValues);
//                 toast.success("Test created successfully");
//             }

//             setOpen(false);
//             form.resetFields();
//             fetchTests();
//         } catch (error) {
//             console.error("Error creating/updating test:", error);
//             toast.error("Failed to create/update test. Please check the form and try again.");
//         }
//     };

//     const handleViewDetails = (id) => {
//         navigate(`/dashboard/test/${id}`); // Navigate to test details page
//     };

//     return (
//         <div>
//             <Button type="primary" onClick={() => { setOpen(true); setEditingTest(null); form.resetFields(); }}>
//                 Create new test
//             </Button>
//             <Table dataSource={tests} columns={columns} />

//             <Modal
//                 title={editingTest ? "Edit Test" : "Create Test"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingTest(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//             >
//                 <Form
//                     labelCol={{ span: 24 }}
//                     form={form}
//                     onFinish={handleSubmit}
//                 >
//                     <Form.Item label="Test Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
//                         <Input />
//                     </Form.Item>

//                     <Form.Item label="Test Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
//                         <Input.TextArea />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default ManageTest;

import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Upload, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { createTest, deleteTest, getTest, getTestById } from '../../services/api.testq';
import { useNavigate } from 'react-router-dom';

function ManageTest() {
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [testDetails, setTestDetails] = useState(null);

    const fetchTests = async () => {
        const data = await getTest();
        setTests(data);
    };

    useEffect(() => {
        fetchTests();
    }, []);

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
                <>
                    {/* <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button> */}
                    <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                    <Button style={{ marginLeft: '8px' }} onClick={() => handleViewDetails(record.id)}>
                        View Details
                    </Button>
                </>
            ),
        },
    ];

    const handleEdit = (test) => {
        // Implement edit logic as needed
    };

    const handleDelete = async (id) => {
        try {
            await deleteTest(id);
            fetchTests(); // Refresh the table after deletion
        } catch (error) {
            console.error("Error deleting test:", error);
            toast.error("Failed to delete test.");
        }
    };

    const handleViewDetails = async (id) => {
        try {
            const details = await getTestById(id);
            setTestDetails(details);
            setViewDetailsModalOpen(true);
        } catch (error) {
            console.error("Error fetching test details:", error);
            toast.error("Failed to fetch test details.");
        }
    };

    const handleFileUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            try {
                await createTest(newFileList[0].originFileObj);
                setFileList([]);
                setOpen(false);
                fetchTests();
            } catch (error) {
                console.error("Upload failed", error);
            }
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => setOpen(true)}>
                Create Test
            </Button>
            <Table dataSource={tests} columns={columns} />

            <Modal
                title={"Create Test"}
                open={open}
                onCancel={() => { setOpen(false); setFileList([]); }}
                footer={null}
            >
                <Upload
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleFileUpload}
                    maxCount={1}
                >
                    <Button>Select Excel File</Button>
                </Upload>
            </Modal>

            <Modal
                title={"Test Details"}
                open={viewDetailsModalOpen}
                onCancel={() => setViewDetailsModalOpen(false)}
                footer={null}
            >
                {testDetails && (
                    <Form layout="vertical">
                        <Form.Item label="Test ID">
                            <Input value={testDetails.testId} disabled />
                        </Form.Item>
                        <Form.Item label="Test Name">
                            <Input value={testDetails.testName} disabled />
                        </Form.Item>
                        <Form.Item label="Test Type">
                            <Input value={testDetails.testType} disabled />
                        </Form.Item>
                        <Form.Item label="Total Questions">
                            <Input value={testDetails.totalQuestions} disabled />
                        </Form.Item>
                        <Form.Item label="Answers">
                            <ul>
                                {testDetails.answers.map((answer) => (
                                    <li key={answer.questionNumber}>
                                        <strong>Q{answer.questionNumber}:</strong> {answer.questionText} - {answer.answerText} (Score: {answer.score})
                                    </li>
                                ))}
                            </ul>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}

export default ManageTest;