// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Modal, Table, Select } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { createPsychologist, updatePsychologist, deletePsychologist, getAllPsychologists } from '../../services/api.psychologist';

// function ManagePsychologist() {
//     const [psychologists, setPsychologists] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingPsychologist, setEditingPsychologist] = useState(null);

//     const fetchPsychologists = async () => {
//         const data = await getAllPsychologists();
//         setPsychologists(data.filter(p => !p.is_deleted));
//     };

//     useEffect(() => {
//         fetchPsychologists();
//     }, []);

//     const columns = [
//         {
//             title: "Psychologist ID",
//             dataIndex: "userID",
//             key: "userID",
//         },
//         {
//             title: "Fullname",
//             dataIndex: "fullName",
//             key: "fullName",
//         },
//         {
//             title: "Username",
//             dataIndex: "username",
//             key: "username",
//         },
//         {
//             title: "Major",
//             dataIndex: "major",
//             key: "major",
//         },
//         {
//             title: "Degree",
//             dataIndex: "degree",
//             key: "degree",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <>
//                     <Button type="primary" onClick={() => handleEdit(record)}>
//                         Edit
//                     </Button>
//                     <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.userID)}>
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleEdit = (psychologist) => {
//         setEditingPsychologist(psychologist);
//         form.setFieldsValue(psychologist);
//         setOpen(true);
//     };

//     const handleDelete = (userID) => {
//         Modal.confirm({
//             title: 'Are you sure you want to delete this psychologist?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, delete',
//             okType: 'danger',
//             cancelText: 'No, cancel',
//             onOk: async () => {
//                 try {
//                     await deletePsychologist(userID);
//                     toast.success("Psychologist deleted successfully");
//                     fetchPsychologists();
//                 } catch (error) {
//                     console.error("Error deleting psychologist:", error);
//                     toast.error("Failed to delete psychologist.");
//                 }
//             },
//         });
//     };

//     const handleSubmit = async (formValues) => {
//         try {
//             if (!formValues.username || formValues.username.length < 4 || formValues.username.length > 20) {
//                 toast.error("Username must be between 4 and 20 characters");
//                 return;
//               }
//               if (!formValues.password || formValues.password.length < 6) {
//                 toast.error("Password must be at least 6 characters");
//                 return;
//               }
//               if (!formValues.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
//                 toast.error("Invalid email format");
//                 return;
//               }

//             if (editingPsychologist && editingPsychologist.userID) {
//                 await updatePsychologist(formValues, editingPsychologist.userID);
//                 toast.success("Psychologist updated successfully");
//                 setEditingPsychologist(null);
//             } else {
//                 await createPsychologist(formValues);
//                 toast.success("Psychologist created successfully");
//             }
//             setOpen(false);
//             form.resetFields();
//             fetchPsychologists();
//         } catch (error) {
//             console.error("Error creating/updating psychologist:", error);
//             toast.error("Failed to create/update psychologist.");
//         }
//     };

//     return (
//         <div>
//             <Button type="primary" onClick={() => { setOpen(true); setEditingPsychologist(null); form.resetFields(); }}>
//                 Create new psychologist
//             </Button>
//             <Table dataSource={psychologists} columns={columns} />

//             <Modal
//                 title={editingPsychologist ? "Edit Psychologist" : "Create Psychologist"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingPsychologist(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//             >
//                 <Form
//                     labelCol={{ span: 24 }}
//                     form={form}
//                     onFinish={handleSubmit}
//                 >
//                     <Form.Item label="Fullname" name="fullName" rules={[{ required: true, message: "Fullname is required" }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }, { min: 4, max: 20, message: "Username must be between 4 and 20 characters" }]}>
//                         <Input />
//                      </Form.Item>
//                     <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid email format" }]}>
//           <Input type="email" />
//         </Form.Item>
//         <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }, { min: 6, message: "Password must be at least 6 characters" }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item label="Major" name="major" rules={[{ required: true, message: "Major is required" }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item label="Degree" name="degree" rules={[{ required: true, message: "Degree is required" }]}>
//           <Input />
//         </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default ManagePsychologist;

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createPsychologist, updatePsychologist, deletePsychologist, getAllPsychologists, getPsychologistProfile, getPsychologistDetails } from '../../services/api.psychologist';

function ManagePsychologist() {
    const [psychologists, setPsychologists] = useState([]);
    const [open, setOpen] = useState(false); // Modal cho Create/Edit
    const [openDetails, setOpenDetails] = useState(false); // Modal cho View Details
    const [form] = useForm();
    const [editingPsychologist, setEditingPsychologist] = useState(null);
    const [selectedPsychologist, setSelectedPsychologist] = useState(null); // Psychologist được chọn để xem chi tiết

    const fetchPsychologists = async () => {
        const data = await getAllPsychologists();
        setPsychologists(data.filter(p => !p.is_deleted));
    };

    useEffect(() => {
        fetchPsychologists();
    }, []);

    const columns = [
        {
            title: "Psychologist ID",
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
            title: "Email",
            dataIndex: "email",
            key: "email",
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
                    <Button style={{ marginLeft: '8px' }} onClick={() => handleViewDetails(record)}>
                        View Details
                    </Button>
                </>
            ),
        },
    ];

    const handleEdit = (psychologist) => {
        setEditingPsychologist(psychologist);
        form.setFieldsValue({
            fullName: psychologist.fullName,
            username: psychologist.username,
            email: psychologist.email,
        });
        setOpen(true);
    };

    const handleDelete = (userID) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this psychologist?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    await deletePsychologist(userID);
                    toast.success("Psychologist deleted successfully");
                    fetchPsychologists();
                } catch (error) {
                    console.error("Error deleting psychologist:", error);
                    toast.error("Failed to delete psychologist.");
                }
            },
        });
    };

    const handleViewDetails = async (psychologist) => {
        try {
            const details = await getPsychologistDetails(psychologist.userID);
            setSelectedPsychologist(details);
            setOpenDetails(true);
        } catch (error) {
            console.error("Error fetching psychologist details:", error);
            toast.error("Failed to fetch psychologist details.");
        }
    };

    const handleSubmit = async (formValues) => {
        try {
            if (!formValues.username || formValues.username.length < 4 || formValues.username.length > 20) {
                toast.error("Username must be between 4 and 20 characters");
                return;
            }
            if (!formValues.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
                toast.error("Invalid email format");
                return;
            }
            if (!editingPsychologist && (!formValues.password || formValues.password.length < 6)) {
                toast.error("Password must be at least 6 characters");
                return;
            }

            if (editingPsychologist && editingPsychologist.userID) {
                await updatePsychologist(editingPsychologist.userID, {
                    fullName: formValues.fullName,
                    username: formValues.username,
                    email: formValues.email,
                });
                toast.success("Psychologist updated successfully");
                setEditingPsychologist(null);
            } else {
                await createPsychologist({
                    fullName: formValues.fullName,
                    username: formValues.username,
                    email: formValues.email,
                    password: formValues.password,
                });
                toast.success("Psychologist created successfully");
            }
            setOpen(false);
            form.resetFields();
            fetchPsychologists();
        } catch (error) {
            console.error("Error creating/updating psychologist:", error);
            toast.error("Failed to create/update psychologist.");
        }
    };

    return (
        <div className="p-8">
            <Button type="primary" onClick={() => { setOpen(true); setEditingPsychologist(null); form.resetFields(); }} className="mb-4">
                Create new psychologist
            </Button>
            <Table dataSource={psychologists} columns={columns} />

            {/* Modal for Create/Edit */}
            <Modal
                title={editingPsychologist ? "Edit Psychologist" : "Create Psychologist"}
                open={open}
                onCancel={() => { setOpen(false); setEditingPsychologist(null); form.resetFields(); }}
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
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required" }, { min: 4, max: 20, message: "Username must be between 4 and 20 characters" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid email format" }]}>
                        <Input type="email" />
                    </Form.Item>
                    {!editingPsychologist && (
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }, { min: 6, message: "Password must be at least 6 characters" }]}>
                            <Input.Password />
                        </Form.Item>
                    )}
                </Form>
            </Modal>

            {/* Modal for View Details */}
            <Modal
                title="Psychologist Details"
                open={openDetails}
                onCancel={() => setOpenDetails(false)}
                footer={[
                    <Button key="close" onClick={() => setOpenDetails(false)}>
                        Close
                    </Button>,
                ]}
            >
                {selectedPsychologist && (
                    <div>
                        <p><strong>Psychologist ID:</strong> {selectedPsychologist.userID}</p>
                        <p><strong>Fullname:</strong> {selectedPsychologist.fullName}</p>
                        <p><strong>Username:</strong> {selectedPsychologist.username}</p>
                        <p><strong>Email:</strong> {selectedPsychologist.email}</p>
                        <p><strong>Date of birth:</strong> {selectedPsychologist.dob || "Not set"}</p>
                        <p><strong>Phone number:</strong> {selectedPsychologist.phone || "Not set"}</p>
                        <p><strong>Gender:</strong> {selectedPsychologist.gender || "Not set"}</p>
                        <p><strong>Major:</strong> {selectedPsychologist.major || "Not set"}</p>
                        <p><strong>Degree:</strong> {selectedPsychologist.degree || "Not set"}</p>
                        <p><strong>Workplace:</strong> {selectedPsychologist.workplace || "Not set"}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ManagePsychologist;