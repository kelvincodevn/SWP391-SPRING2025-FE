import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Image } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createProgram, deleteProgram, getProgram } from '../../services/api.program'; // Import program API functions

function ManageProgram() {
    const [programs, setPrograms] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingProgram, setEditingProgram] = useState(null);

    const fetchPrograms = async () => {
        const data = await getProgram();
        setPrograms(data);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const columns = [
        {
            title: "Program ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Program Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Program Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                image ? <Image width={50} height={50} src={image} /> : "No Image"
            ),
        },
        {
            title: "Program Status", // Assuming you'll display the status here
            dataIndex: "status",  // Adjust if your status field is named differently
            key: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
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

    const handleEdit = (program) => {
        setEditingProgram(program);
        form.setFieldsValue(program);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProgram(id);
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
                await createProgram(formValues, editingProgram.id);
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
            <Table dataSource={programs} columns={columns} />

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
                    <Form.Item label="Program Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Program Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Image URL" name="image">
                        <Input />
                    </Form.Item>

                    {/* Add a form item for Program Status.  How you implement this
                         depends on how you manage status (e.g., a Select, a Checkbox, etc.) */}
                    <Form.Item label="Program Status" name="status">
                        <Input /> {/* Placeholder - replace with your actual status input */}
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default ManageProgram;
