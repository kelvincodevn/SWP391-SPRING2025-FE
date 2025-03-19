import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createUser, deleteUser, getUser, updateUser } from '../../services/api.user';

function ManageClient() {
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingClient, setEditingClient] = useState(null);

    const fetchClients = async () => {
        const data = await getUser();
        const filteredClients = data.filter(client => 
            client.roleEnum.toLowerCase() === 'student' || client.roleEnum.toLowerCase() === 'parent' && !client.is_deleted
        );
        setClients(filteredClients);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const columns = [
        {
            title: "User ID",
            dataIndex: "userID",
            key: "userID",
        },
        {
            title: "Fullname",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Role",
            dataIndex: "roleEnum",
            key: "roleEnum",
            render: (roleEnum) => {
                let backgroundColor = '';
                switch (roleEnum.toLowerCase()) {
                    case 'student':
                        backgroundColor = '#e0ffe0'; // Light green
                        break;
                    case 'parent':
                        backgroundColor = '#e0e0ff'; // Light blue
                        break;
                    default:
                        backgroundColor = 'transparent';
                }
                return <span style={{ backgroundColor, padding: '4px', borderRadius: '4px', color: 'black' }}>{roleEnum}</span>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.userID)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const handleEdit = (client) => {
        setEditingClient(client);
        form.setFieldsValue(client);
        setOpen(true);
    };

    const handleDelete = (userID) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this client?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    await deleteUser(userID);
                    toast.success("Client deleted successfully");
                    fetchClients();
                } catch (error) {
                    console.error("Error deleting client:", error);
                    toast.error("Failed to delete client.");
                }
            },
        });
    };

    const handleSubmit = async (formValues) => {
        try {
            if (editingClient && editingClient.userID) {
                await updateUser(formValues, editingClient.userID);
                toast.success("Client updated successfully");
                setEditingClient(null);
            } else {
                await createUser({ ...formValues, roleEnum: 'STUDENT' }); // Default to STUDENT for new clients
                toast.success("Client created successfully");
            }
            setOpen(false);
            form.resetFields();
            fetchClients();
        } catch (error) {
            console.error("Error creating/updating client:", error);
            toast.error("Failed to create/update client. Please check the form and try again.");
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => { setOpen(true); setEditingClient(null); form.resetFields(); }}>
                Create new client
            </Button>
            <Table dataSource={clients} columns={columns} />

            <Modal
                title={editingClient ? "Edit Client" : "Create Client"}
                open={open}
                onCancel={() => { setOpen(false); setEditingClient(null); form.resetFields(); }}
                onOk={() => form.submit()}
            >
                <Form
                    labelCol={{ span: 24 }}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Fullname" name="fullName" rules={[{ required: true, message: "Fullname is required" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }]}>
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Role" name="roleEnum" rules={[{ required: true, message: "Role is required" }]}>
                        <Select defaultValue="STUDENT">
                            <Select.Option value="STUDENT">Student</Select.Option>
                            <Select.Option value="PARENT">Parent</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManageClient;