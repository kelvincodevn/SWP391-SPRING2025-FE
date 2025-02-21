import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Table, Image } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createTest, deleteTest, getTest } from '../../services/api.testq';

function ManageTest() {
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingTest, setEditingTest] = useState(null); // Store the test being edited

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
            dataIndex: "id", // Assuming your Test object has an 'id' field
            key: "id",
        },
        {
            title: "Test Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Test Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Test Image",
            dataIndex: "image",
            key: "image",
            render: (image) => ( // Render the image
                image ? <Image width={50} height={50} src={image} /> : "No Image"
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => ( // Render edit and delete buttons
                <>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleEdit = (test) => {
        setEditingTest(test); // Set the test being edited
        form.setFieldsValue(test); // Populate the form with test data
        setOpen(true); // Open the modal
    };


    const handleDelete = async (id) => {
        try {
            await deleteTest(id);
            toast.success("Test deleted successfully");
            fetchTests();
        } catch (error) {
            console.error("Error deleting test:", error);
            toast.error("Failed to delete test.");
        }
    };

    const handleSubmit = async (formValues) => {
        try {
            if (editingTest) {
                // Update existing test
                await createTest(formValues, editingTest.id); // Assuming your API handles updates based on ID
                toast.success("Test updated successfully");
                setEditingTest(null); // Clear editing state
            } else {
                // Create new test
                await createTest(formValues);
                toast.success("Test created successfully");
            }

            setOpen(false);
            form.resetFields();
            fetchTests();
        } catch (error) {
            console.error("Error creating/updating test:", error);
            toast.error("Failed to create/update test. Please check the form and try again.");
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => { setOpen(true); setEditingTest(null); form.resetFields(); }}>
                Create new test
            </Button>
            <Table dataSource={tests} columns={columns} />

            <Modal
                title={editingTest ? "Edit Test" : "Create Test"} // Dynamic title
                open={open}
                onCancel={() => { setOpen(false); setEditingTest(null); form.resetFields(); }} // Clear editing state on cancel
                onOk={() => form.submit()}
            >
                <Form
                    labelCol={{ span: 24 }}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Test Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Test Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Test Image URL" name="image">
                        <Input />
                    </Form.Item>
                    {/* Add other relevant form items for tests */}

                </Form>
            </Modal>
        </div>
    );
}

export default ManageTest;