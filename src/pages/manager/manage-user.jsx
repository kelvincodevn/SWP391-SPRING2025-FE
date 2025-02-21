import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Image, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createUser, deleteUser, getUser, updateUser } from '../../services/api.user'; // Import user API functions

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        const data = await getUser();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: "User ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar) => (
                avatar ? <Image width={50} height={50} src={avatar} /> : "No Avatar"
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
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

    const handleEdit = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user); // Important: Pre-populate the form
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        }
    };

    const handleSubmit = async (formValues) => {
        try {
            if (editingUser) {
                await updateUser(formValues, editingUser.id); // Call updateUser
                toast.success("User updated successfully");
                setEditingUser(null);
            } else {
                await createUser(formValues); // Call createUser
                toast.success("User created successfully");
            }

            setOpen(false);
            form.resetFields();
            fetchUsers();
        } catch (error) {
            console.error("Error creating/updating user:", error);
            toast.error("Failed to create/update user. Please check the form and try again.");
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => { setOpen(true); setEditingUser(null); form.resetFields(); }}>
                Create new user
            </Button>
            <Table dataSource={users} columns={columns} />

            <Modal
                title={editingUser ? "Edit User" : "Create User"}
                open={open}
                onCancel={() => { setOpen(false); setEditingUser(null); form.resetFields(); }}
                onOk={() => form.submit()}
            >
                <Form
                    labelCol={{ span: 24 }}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Fullname" name="fullname" rules={[{ required: true, message: "Fullname is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Gender" name="gender">
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Avatar URL" name="avatar">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Role" name="role" rules={[{ required: true, message: "Role is required" }]}>
                        <Input /> {/* Or use a Select if you have predefined roles */}
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default ManageUser;