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

// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Modal, Table } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { createPsychologist, updatePsychologist, deletePsychologist, getAllPsychologists, getPsychologistProfile, getPsychologistDetails } from '../../services/api.psychologist';

// function ManagePsychologist() {
//     const [psychologists, setPsychologists] = useState([]);
//     const [open, setOpen] = useState(false); // Modal cho Create/Edit
//     const [openDetails, setOpenDetails] = useState(false); // Modal cho View Details
//     const [form] = useForm();
//     const [editingPsychologist, setEditingPsychologist] = useState(null);
//     const [selectedPsychologist, setSelectedPsychologist] = useState(null); // Psychologist được chọn để xem chi tiết

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
//             title: "Email",
//             dataIndex: "email",
//             key: "email",
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
//                     <Button style={{ marginLeft: '8px' }} onClick={() => handleViewDetails(record)}>
//                         View Details
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleEdit = (psychologist) => {
//         setEditingPsychologist(psychologist);
//         form.setFieldsValue({
//             fullName: psychologist.fullName,
//             username: psychologist.username,
//             email: psychologist.email,
//         });
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

//     const handleViewDetails = async (psychologist) => {
//         try {
//             const details = await getPsychologistDetails(psychologist.userID);
//             setSelectedPsychologist(details);
//             setOpenDetails(true);
//         } catch (error) {
//             console.error("Error fetching psychologist details:", error);
//             toast.error("Failed to fetch psychologist details.");
//         }
//     };

//     const handleSubmit = async (formValues) => {
//         try {
//             if (!formValues.username || formValues.username.length < 4 || formValues.username.length > 20) {
//                 toast.error("Username must be between 4 and 20 characters");
//                 return;
//             }
//             if (!formValues.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
//                 toast.error("Invalid email format");
//                 return;
//             }
//             if (!editingPsychologist && (!formValues.password || formValues.password.length < 6)) {
//                 toast.error("Password must be at least 6 characters");
//                 return;
//             }

//             if (editingPsychologist && editingPsychologist.userID) {
//                 await updatePsychologist(editingPsychologist.userID, {
//                     fullName: formValues.fullName,
//                     username: formValues.username,
//                     email: formValues.email,
//                 });
//                 toast.success("Psychologist updated successfully");
//                 setEditingPsychologist(null);
//             } else {
//                 await createPsychologist({
//                     fullName: formValues.fullName,
//                     username: formValues.username,
//                     email: formValues.email,
//                     password: formValues.password,
//                 });
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
//         <div className="p-8">
//             <Button type="primary" onClick={() => { setOpen(true); setEditingPsychologist(null); form.resetFields(); }} className="mb-4">
//                 Create new psychologist
//             </Button>
//             <Table dataSource={psychologists} columns={columns} />

//             {/* Modal for Create/Edit */}
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
//                     </Form.Item>
//                     <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid email format" }]}>
//                         <Input type="email" />
//                     </Form.Item>
//                     {!editingPsychologist && (
//                         <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }, { min: 6, message: "Password must be at least 6 characters" }]}>
//                             <Input.Password />
//                         </Form.Item>
//                     )}
//                 </Form>
//             </Modal>

//             {/* Modal for View Details */}
//             <Modal
//                 title="Psychologist Details"
//                 open={openDetails}
//                 onCancel={() => setOpenDetails(false)}
//                 footer={[
//                     <Button key="close" onClick={() => setOpenDetails(false)}>
//                         Close
//                     </Button>,
//                 ]}
//             >
//                 {selectedPsychologist && (
//                     <div>
//                         <p><strong>Psychologist ID:</strong> {selectedPsychologist.userID}</p>
//                         <p><strong>Fullname:</strong> {selectedPsychologist.fullName}</p>
//                         <p><strong>Username:</strong> {selectedPsychologist.username}</p>
//                         <p><strong>Email:</strong> {selectedPsychologist.email}</p>
//                         <p><strong>Date of birth:</strong> {selectedPsychologist.dob || "Not set"}</p>
//                         <p><strong>Phone number:</strong> {selectedPsychologist.phone || "Not set"}</p>
//                         <p><strong>Gender:</strong> {selectedPsychologist.gender || "Not set"}</p>
//                         <p><strong>Major:</strong> {selectedPsychologist.major || "Not set"}</p>
//                         <p><strong>Degree:</strong> {selectedPsychologist.degree || "Not set"}</p>
//                         <p><strong>Workplace:</strong> {selectedPsychologist.workplace || "Not set"}</p>
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     );
// }

// export default ManagePsychologist;

import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Input, Modal, Table, Spin, Alert, Typography, Card, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createPsychologist, updatePsychologist, deletePsychologist, getAllPsychologists, getPsychologistDetails } from '../../services/api.psychologist';

const { Title, Text } = Typography;

function ManagePsychologist() {
    const [psychologists, setPsychologists] = useState([]);
    const [open, setOpen] = useState(false); // Modal cho Create/Edit
    const [openDetails, setOpenDetails] = useState(false); // Modal cho View Details
    const [form] = useForm();
    const [editingPsychologist, setEditingPsychologist] = useState(null);
    const [selectedPsychologist, setSelectedPsychologist] = useState(null); // Psychologist được chọn để xem chi tiết
    const [loading, setLoading] = useState(false); // Loading cho danh sách psychologists
    const [actionLoading, setActionLoading] = useState(false); // Loading cho các hành động (create, update, delete)
    const [detailsLoading, setDetailsLoading] = useState(false); // Loading cho modal View Details
    const [error, setError] = useState(null); // Lưu lỗi nếu có

    // Hàm lấy danh sách psychologists
    const fetchPsychologists = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllPsychologists();
            if (data) {
                setPsychologists(data.filter(p => !p.is_deleted));
            } else {
                setError("Failed to load psychologists. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching psychologists.");
            console.error("Error fetching psychologists:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPsychologists();
    }, [fetchPsychologists]);

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
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record)}
                        disabled={actionLoading}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDelete(record.userID)}
                        disabled={actionLoading}
                        loading={actionLoading}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => handleViewDetails(record)}
                        disabled={actionLoading}
                    >
                        View Details
                    </Button>
                </div>
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

    const handleDelete = useCallback((userID) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this psychologist?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                setActionLoading(true);
                try {
                    await deletePsychologist(userID);
                    toast.success("Psychologist deleted successfully");
                    fetchPsychologists();
                } catch (error) {
                    console.error("Error deleting psychologist:", error);
                    toast.error("Failed to delete psychologist.");
                } finally {
                    setActionLoading(false);
                }
            },
        });
    }, [fetchPsychologists]);

    const handleViewDetails = useCallback(async (psychologist) => {
        setDetailsLoading(true);
        setSelectedPsychologist(null); // Reset dữ liệu trước khi lấy mới
        try {
            const details = await getPsychologistDetails(psychologist.userID);
            if (details) {
                setSelectedPsychologist(details);
                setOpenDetails(true);
            } else {
                toast.error("No psychologist details found.");
            }
        } catch (error) {
            console.error("Error fetching psychologist details:", error);
            toast.error("Failed to fetch psychologist details.");
        } finally {
            setDetailsLoading(false);
        }
    }, []);

    const handleSubmit = useCallback(async (formValues) => {
        setActionLoading(true);
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
        } finally {
            setActionLoading(false);
        }
    }, [editingPsychologist, fetchPsychologists, form]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Psychologists
            </Title>

            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="mb-6 max-w-2xl mx-auto"
                />
            )}

            <Button
                type="primary"
                onClick={() => { setOpen(true); setEditingPsychologist(null); form.resetFields(); }}
                className="mb-4"
                disabled={actionLoading}
            >
                Create New Psychologist
            </Button>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading psychologists..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={psychologists}
                    columns={columns}
                    rowKey="userID"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "No psychologists found." }}
                />
            )}

            {/* Modal for Create/Edit */}
            <Modal
                title={editingPsychologist ? "Edit Psychologist" : "Create Psychologist"}
                open={open}
                onCancel={() => { setOpen(false); setEditingPsychologist(null); form.resetFields(); }}
                onOk={() => form.submit()}
                okButtonProps={{ loading: actionLoading }}
                cancelButtonProps={{ disabled: actionLoading }}
                centered
            >
                <Form
                    labelCol={{ span: 24 }}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Fullname"
                        name="fullName"
                        rules={[{ required: true, message: "Fullname is required" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Username is required" }, { min: 4, max: 20, message: "Username must be between 4 and 20 characters" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Invalid email format" }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    {!editingPsychologist && (
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Password is required" }, { min: 6, message: "Password must be at least 6 characters" }]}
                        >
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
                width={600}
                centered
            >
                {detailsLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading psychologist details..." />
                    </div>
                ) : selectedPsychologist ? (
                    <div className="space-y-6">
                        <Card
                            title="Personal Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Psychologist ID:</Text>
                                    <Text className="block">{selectedPsychologist.userID || "N/A"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Fullname:</Text>
                                    <Text className="block">{selectedPsychologist.fullName || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Username:</Text>
                                    <Text className="block">{selectedPsychologist.username || "Not specified"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Email:</Text>
                                    <Text className="block">{selectedPsychologist.email || "Not specified"}</Text>
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title="Additional Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Text strong>Date of Birth:</Text>
                                    <Text className="block">{selectedPsychologist.dob || "Not set"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Phone Number:</Text>
                                    <Text className="block">{selectedPsychologist.phone || "Not set"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Gender:</Text>
                                    <Text className="block">{selectedPsychologist.gender || "Not set"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Major:</Text>
                                    <Text className="block">{selectedPsychologist.major || "Not set"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Degree:</Text>
                                    <Text className="block">{selectedPsychologist.degree || "Not set"}</Text>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Workplace:</Text>
                                    <Text className="block">{selectedPsychologist.workplace || "Not set"}</Text>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <Text type="secondary">No psychologist details available.</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ManagePsychologist;