import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createProgram, deleteProgram, getProgram } from '../../services/api.program';

function ManageProgram1() {
    const [programs, setPrograms] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingProgram, setEditingProgram] = useState(null);

    const fetchPrograms = async () => {
        const data = await getProgram();
        // Filter out programs where isDeleted is true
        const filteredPrograms = data.filter(program => !program.isDeleted);
        setPrograms(filteredPrograms);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const columns = [
        {
            title: "Program ID",
            dataIndex: "programId",
            key: "programId",
        },
        {
            title: "Program Name",
            dataIndex: "programName",
            key: "programName",
        },
        {
            title: "Program Category",
            dataIndex: "programCategory",
            key: "programCategory",
        },
        {
            title: "Program Description",
            dataIndex: "programDescription",
            key: "programDescription",
        },
        {
            title: "Action",
            key: "action",
            width: 200, // Adjust this width as needed
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.programId)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleEdit = (program) => {
        setEditingProgram(program);
        form.setFieldsValue(program);
        setOpen(true);
    };

    const handleDelete = async (programId) => {
        try {
            await deleteProgram(programId); // Assuming this sets isDeleted: true on the server
            toast.success("Program deleted successfully");
            fetchPrograms();
        } catch (error) {
            console.error("Error deleting program:", error);
            toast.error("Failed to delete program.");
        }
    };

    const handleSubmit = async (formValues) => {
        try {
            if (editingProgram) {
                await createProgram(formValues, editingProgram.programId);
                toast.success("Program updated successfully");
                setEditingProgram(null);
            } else {
                await createProgram(formValues);
                toast.success("Program created successfully");
            }
            setOpen(false);
            form.resetFields();
            fetchPrograms();
        } catch (error) {
            console.error("Error creating/updating program:", error);
            toast.error("Failed to create/update program. Please check the form and try again.");
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => { setOpen(true); setEditingProgram(null); form.resetFields(); }}>
                Create new program
            </Button>
            <Table dataSource={programs} columns={columns} rowKey="programId" />

            <Modal
                title={editingProgram ? "Edit Program" : "Create Program"}
                open={open}
                onCancel={() => { setOpen(false); setEditingProgram(null); form.resetFields(); }}
                onOk={() => form.submit()}
            >
                <Form
                    labelCol={{ span: 24 }}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Program Name" name="programName" rules={[{ required: true, message: "Name is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Program Category" name="programCategory" rules={[{ required: true, message: "Category is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Program Description" name="programDescription" rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManageProgram1;