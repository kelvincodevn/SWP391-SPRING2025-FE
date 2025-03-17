// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Modal, Table, Image, Select } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { createUser, deleteUser, getUser, updateUser } from '../../services/api.user'; // Import user API functions

// function ManageUser() {
//     const [users, setUsers] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingUser, setEditingUser] = useState(null);

//     const fetchUsers = async () => {
//         const data = await getUser();
//         setUsers(data);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const columns = [
//         {
//             title: "User ID",
//             dataIndex: "id",
//             key: "id",
//         },
//         {
//             title: "Fullname",
//             dataIndex: "fullname",
//             key: "fullname",
//         },
//         {
//             title: "Username",
//             dataIndex: "username",
//             key: "username",
//         },
//         {
//             title: "Gender",
//             dataIndex: "gender",
//             key: "gender",
//         },
//         // {
//         //     title: "Avatar",
//         //     dataIndex: "avatar",
//         //     key: "avatar",
//         //     render: (avatar) => (
//         //         avatar ? <Image width={50} height={50} src={avatar} /> : "No Avatar"
//         //     ),
//         // },
//         {
//             title: "Role",
//             dataIndex: "role",
//             key: "role",
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
//                 </>
//             ),
//         },
//     ];

//     const handleEdit = (user) => {
//         setEditingUser(user);
//         form.setFieldsValue(user); // Important: Pre-populate the form
//         setOpen(true);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteUser(id);
//             toast.success("User deleted successfully");
//             fetchUsers();
//         } catch (error) {
//             console.error("Error deleting user:", error);
//             toast.error("Failed to delete user.");
//         }
//     };

//     const handleSubmit = async (formValues) => {
//         try {
//             if (editingUser) {
//                 await updateUser(formValues, editingUser.id); // Call updateUser
//                 toast.success("User updated successfully");
//                 setEditingUser(null);
//             } else {
//                 await createUser(formValues); // Call createUser
//                 toast.success("User created successfully");
//             }

//             setOpen(false);
//             form.resetFields();
//             fetchUsers();
//         } catch (error) {
//             console.error("Error creating/updating user:", error);
//             toast.error("Failed to create/update user. Please check the form and try again.");
//         }
//     };

//     return (
//         <div>
//             <Button type="primary" onClick={() => { setOpen(true); setEditingUser(null); form.resetFields(); }}>
//                 Create new user
//             </Button>
//             <Table dataSource={users} columns={columns} />

//             <Modal
//                 title={editingUser ? "Edit User" : "Create User"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingUser(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//             >
//                 <Form
//                     labelCol={{ span: 24 }}
//                     form={form}
//                     onFinish={handleSubmit}
//                 >
//                     <Form.Item label="Fullname" name="fullname" rules={[{ required: true, message: "Fullname is required" }]}>
//                         <Input />
//                     </Form.Item>

//                     <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }]}>
//                         <Input />
//                     </Form.Item>

//                     <Form.Item label="Gender" name="gender">
//                         <Select>
//                             <Select.Option value="male">Male</Select.Option>
//                             <Select.Option value="female">Female</Select.Option>
//                             <Select.Option value="other">Other</Select.Option>
//                         </Select>
//                     </Form.Item>

//                     {/* <Form.Item label="Avatar URL" name="avatar">
//                         <Input />
//                     </Form.Item> */}

//                     <Form.Item label="Role" name="role" rules={[{ required: true, message: "Role is required" }]}>
//                         <Input /> {/* Or use a Select if you have predefined roles */}
//                     </Form.Item>

//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default ManageUser;

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createUser, deleteUser, getUser, updateUser } from '../../services/api.user.js';

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingUser, setEditingUser] = useState(null);
    

    const fetchUsers = async () => {
        const data = await getUser();
        const filteredUsers = data.filter(users => !users.is_deleted);
        setUsers(filteredUsers);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        {
            title: "User ID",
            dataIndex: "userID",
            key: "userID",
        },
        {
            title: "Fullname",
            dataIndex: "fullName", // Adjusted to match API response
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
                    case 'manager':
                        backgroundColor = '#ffe0e0'; // Light red
                        break;
                    case 'student':
                        backgroundColor = '#e0ffe0'; // Light green
                        break;
                    case 'parent':
                        backgroundColor = '#e0e0ff'; // Light blue
                        break;
                    case 'psychologist':
                        backgroundColor = '#fffacd'; // Light yellow
                        break;
                    default:
                        backgroundColor = 'transparent'; // No highlight for other roles
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

    const handleEdit = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setOpen(true);
    };

    const handleDelete = (userID) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    await deleteUser(userID);
                    // toast.success("User deleted successfully");
                    fetchUsers();
                } catch (error) {
                    console.error("Error deleting user:", error);
                    toast.error("Failed to delete user.");
                }
            },
        });
    };

    const handleSubmit = async (formValues) => {
        try {
            if (editingUser && editingUser.userID) { // Use editingUser.userID
                await updateUser(formValues, editingUser.userID);
                // toast.success("User updated successfully");
                setEditingUser(null);
            } else {
                await createUser(formValues);
                // toast.success("User created successfully");
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
            {/* <Table dataSource={users} columns={columns} /> */}
            <Table dataSource={users.filter(user => !user.is_deleted)} columns = {columns}/>

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

                    {/* <Form.Item label="Role" name="role" rules={[{ required: true, message: "Role is required" }]}>
                        <Input />
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    );
}

export default ManageUser;