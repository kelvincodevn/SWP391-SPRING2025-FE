import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, InputNumber, Select, Space } from 'antd';
import { toast } from 'react-toastify';
import { createTestScoring, deleteTestScoring, getTest, getTestScoring, updateTestScoring } from '../../services/api.testq';


function ManageTestScore() {
    const [testScores, setTestScores] = useState([]);
    const [tests, setTests] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingTestScore, setEditingTestScore] = useState(null);
    const [selectedTestId, setSelectedTestId] = useState(null);

    const fetchTestScores = async (testId) => {
        const data = await getTestScoring(testId);
        setTestScores(data);
    };

    const fetchTests = async () => {
        const data = await getTest();
        setTests(data);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    useEffect(()=>{
        if(selectedTestId){
            fetchTestScores(selectedTestId);
        }
    }, [selectedTestId]);

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
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (testScore) => {
        setEditingTestScore(testScore);
        form.setFieldsValue(testScore);
        setOpen(true);
    };

    const handleDelete = async (scoringId) => {
        try {
            await deleteTestScoring(scoringId);
            fetchTestScores(selectedTestId);
            toast.success("Test score deleted successfully");
        } catch (error) {
            toast.error("Failed to delete test score");
        }
    };

    const handleSubmit = async (values) => {
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
            toast.error("Failed to create/update test score");
        }
    };

    return (
        <div>
            <Select style={{width: 200, marginBottom: 16}} onChange={(value) => setSelectedTestId(value)}>
                {tests.map(test => (
                    <Select.Option key={test.id} value={test.id}>{test.testsName}</Select.Option>
                ))}
            </Select>
            <Button type="primary" onClick={() => { setOpen(true); setEditingTestScore(null); form.resetFields(); }}>
                Create Test Score
            </Button>
            <Table dataSource={testScores} columns={columns} rowKey="id" />

            <Modal
                title={editingTestScore ? "Edit Test Score" : "Create Test Score"}
                open={open}
                onCancel={() => { setOpen(false); form.resetFields(); setEditingTestScore(null); }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Min Score" name="minScore" rules={[{ required: true, message: "Please enter min score" }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Max Score" name="maxScore" rules={[{ required: true, message: "Please enter max score" }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Level" name="level" rules={[{ required: true, message: "Please enter level" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter description" }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManageTestScore;