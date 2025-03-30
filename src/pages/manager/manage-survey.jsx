import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Input, Modal, Table, Spin, Select, DatePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createSurvey, updateSurvey, deleteSurvey, getAllSurveys } from '../../services/api.survey';
import moment from 'moment';

const { Option } = Select;

function ManageSurvey() {
    const [surveys, setSurveys] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingSurvey, setEditingSurvey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchSurveys = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllSurveys();
            setSurveys(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys]);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Schedule Type', dataIndex: 'scheduleType', key: 'scheduleType' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    const handleEdit = (survey) => {
        setEditingSurvey(survey);
        form.setFieldsValue({
            title: survey.title,
            description: survey.description,
            scheduleType: survey.scheduleType,
            startTime: survey.startTime ? moment(survey.startTime) : null,
            endTime: survey.endTime ? moment(survey.endTime) : null,
            recurrenceInterval: survey.recurrenceInterval,
            questions: survey.questions.map(q => ({
                questionText: q.questionText,
                questionType: q.questionType,
                options: q.options ? JSON.parse(q.options) : [],
            })),
        });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        setActionLoading(true);
        try {
            await deleteSurvey(id);
            fetchSurveys();
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        setActionLoading(true);
        const surveyData = {
            title: values.title,
            description: values.description,
            scheduleType: values.scheduleType,
            startTime: values.startTime?.toISOString(),
            endTime: values.endTime?.toISOString(),
            recurrenceInterval: values.recurrenceInterval,
            questions: values.questions.map(q => ({
                questionText: q.questionText,
                questionType: q.questionType,
                options: q.options ? q.options.split(',').map(opt => opt.trim()) : null,
            })),
        };

        try {
            if (editingSurvey) {
                await updateSurvey(editingSurvey.id, surveyData);
            } else {
                await createSurvey(surveyData);
            }
            setOpen(false);
            form.resetFields();
            setEditingSurvey(null);
            fetchSurveys();
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="p-8">
            <Button type="primary" onClick={() => setOpen(true)}>Create Survey</Button>
            {loading ? <Spin /> : (
                <Table dataSource={surveys} columns={columns} rowKey="id" />
            )}

            <Modal
                title={editingSurvey ? "Edit Survey" : "Create Survey"}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
                okButtonProps={{ loading: actionLoading }}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="scheduleType" label="Schedule Type" rules={[{ required: true, message: 'Schedule type is required' }]}>
                        <Select>
                            <Option value="ONE_TIME">One-Time</Option>
                            <Option value="RECURRING">Recurring</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="startTime" label="Start Time" rules={[{ required: true, message: 'Start time is required' }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name="endTime" label="End Time">
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name="recurrenceInterval" label="Recurrence Interval">
                        <Select allowClear>
                            <Option value="MONTHLY">Monthly</Option>
                            <Option value="WEEKLY">Weekly</Option>
                        </Select>
                    </Form.Item>
                    <Form.List name="questions">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{ marginBottom: 16 }}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'questionText']}
                                            label="Question Text"
                                            rules={[{ required: true, message: 'Question text is required' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'questionType']}
                                            label="Question Type"
                                            rules={[{ required: true, message: 'Question type is required' }]}
                                        >
                                            <Select>
                                                <Option value="TEXT">Text</Option>
                                                <Option value="MULTIPLE_CHOICE">Multiple Choice</Option>
                                                <Option value="RATING">Rating</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'options']}
                                            label="Options (comma-separated)"
                                        >
                                            <Input placeholder="e.g., Yes, No" />
                                        </Form.Item>
                                        <Button danger onClick={() => remove(name)}>Remove</Button>
                                    </div>
                                ))}
                                <Button onClick={() => add()}>Add Question</Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    );
}

export default ManageSurvey;