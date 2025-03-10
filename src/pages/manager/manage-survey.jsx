// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input, Modal, Table, Image } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { createSurvey, deleteSurvey, getSurvey } from '../../services/api.survey'; // Import survey API functions

// function ManageSurvey() {
//     const [surveys, setSurveys] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingSurvey, setEditingSurvey] = useState(null);

//     const fetchSurveys = async () => {
//         const data = await getSurvey();
//         setSurveys(data);
//     };

//     useEffect(() => {
//         fetchSurveys();
//     }, []);

//     const columns = [
//         {
//             title: "Survey ID",
//             dataIndex: "id",
//             key: "id",
//         },
//         {
//             title: "Survey Name",
//             dataIndex: "title",
//             key: "title",
//         },
//         {
//             title: "Survey Description",
//             dataIndex: "description",
//             key: "description",
//         },
//         {
//             title: "Survey Image",
//             dataIndex: "image",
//             key: "image",
//             render: (image) => (
//                 image ? <Image width={50} height={50} src={image} /> : "No Image"
//             ),
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

//     const handleEdit = (survey) => {
//         setEditingSurvey(survey);
//         form.setFieldsValue(survey);
//         setOpen(true);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteSurvey(id);
//             toast.success("Survey deleted successfully");
//             fetchSurveys();
//         } catch (error) {
//             console.error("Error deleting survey:", error);
//             toast.error("Failed to delete survey.");
//         }
//     };

//     const handleSubmit = async (formValues) => {
//         try {
//             if (editingSurvey) {
//                 await createSurvey(formValues, editingSurvey.id);
//                 toast.success("Survey updated successfully");
//                 setEditingSurvey(null);
//             } else {
//                 await createSurvey(formValues);
//                 toast.success("Survey created successfully");
//             }

//             setOpen(false);
//             form.resetFields();
//             fetchSurveys();
//         } catch (error) {
//             console.error("Error creating/updating survey:", error);
//             toast.error("Failed to create/update survey. Please check the form and try again.");
//         }
//     };

//     return (
//         <div>
//             <Button type="primary" onClick={() => { setOpen(true); setEditingSurvey(null); form.resetFields(); }}>
//                 Create new survey
//             </Button>
//             <Table dataSource={surveys} columns={columns} />

//             <Modal
//                 title={editingSurvey ? "Edit Survey" : "Create Survey"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingSurvey(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//             >
//                 <Form
//                     labelCol={{ span: 24 }}
//                     form={form}
//                     onFinish={handleSubmit}
//                 >
//                     <Form.Item label="Survey Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
//                         <Input />
//                     </Form.Item>

//                     <Form.Item label="Survey Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
//                         <Input.TextArea />
//                     </Form.Item>

//                     <Form.Item label="Survey Image URL" name="image">
//                         <Input />
//                     </Form.Item>
//                     {/* Add other relevant form items for surveys */}

//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default ManageSurvey;

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createAndSendSurvey, deleteSurvey, getSurvey } from '../../services/api.survey';

function ManageSurvey() {
    const [surveys, setSurveys] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [editingSurvey, setEditingSurvey] = useState(null);

    const fetchSurveys = async () => {
        const data = await getSurvey();
        setSurveys(data);
    };

    useEffect(() => {
        fetchSurveys();
    }, []);

    const columns = [
        {
            title: "Survey ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Survey Name",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Survey Description",
            dataIndex: "description",
            key: "description",
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
                    {/* <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => handleCreate(record)}>
                        Create
                    </Button> */}
                </>
            ),
        },
    ];

    const handleEdit = (survey) => {
        setEditingSurvey(survey);
        form.setFieldsValue(survey);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteSurvey(id);
            toast.success("Survey deleted successfully");
            fetchSurveys();
        } catch (error) {
            console.error("Error deleting survey:", error);
            toast.error("Failed to delete survey.");
        }
    };

    const handleCreate = (survey) => {
        setEditingSurvey(survey);
        form.resetFields();
        setOpen(true);
    };

    const handleSubmit = async (formValues) => {
        try {
            const emailsArray = formValues.emails.split(',').map(email => email.trim());

            const requestBody = {
                title: formValues.title,
                description: formValues.description,
                surveyLink: formValues.surveyLink,
                emails: emailsArray,
            };

            const response = await createAndSendSurvey(requestBody);
            if (response === "Survey emails sent successfully.") {
                toast.success(response);
                setOpen(false);
                form.resetFields();
                fetchSurveys();
            } else {
                toast.error("Failed to create/send survey. Please check the form and try again.");
            }
        } catch (error) {
            console.error("Error creating/sending survey:", error);
            toast.error("Failed to create/send survey. Please check the form and try again.");
        }
    };

    return (
        <div>
            <Button type="primary" onClick={() => { setOpen(true); setEditingSurvey(null); form.resetFields(); }}>
                Create new survey
            </Button>
            <Table dataSource={surveys} columns={columns} />

            <Modal
                title={editingSurvey ? "Edit Survey" : "Create Survey"}
                open={open}
                onCancel={() => { setOpen(false); setEditingSurvey(null); form.resetFields(); }}
                onOk={() => form.submit()}
            >
                <Form
                    labelCol={{ span: 24 }}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Survey Name" name="title" rules={[{ required: true, message: "Name is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Survey Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Survey Link" name="surveyLink" rules={[{ required: true, message: "Survey Link is required" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Emails (comma-separated)" name="emails" rules={[{ required: true, message: "Emails are required" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManageSurvey;