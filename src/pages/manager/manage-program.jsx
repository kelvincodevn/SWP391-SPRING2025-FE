import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Image, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { createProgram, updateProgram, deleteProgram, getProgram, getProgramDetails } from '../../services/api.program';

function ManageProgram() {
    const [programs, setPrograms] = useState([]);
    const [open, setOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
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
            dataIndex: "programID",
            key: "programID",
        },
        {
            title: "Program Name",
            dataIndex: "programName",
            key: "programName",
        },
        {
            title: "Category",
            dataIndex: "programCategory",
            key: "programCategory",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleViewDetails(record)}>View</Button>
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.programID)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const handleViewDetails = async (program) => {
        const details = await getProgramDetails(program.programID);
        setSelectedProgram(details);
        setDetailOpen(true);
    };

    const handleEdit = (program) => {
        setEditingProgram(program);
        form.setFieldsValue({
            programName: program.programName,
            programCategory: program.programCategory,
            programDescription: program.programDescription,
            programLink: program.programLink
        });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProgram(id);
            toast.success("Program deleted successfully");
            fetchPrograms();
        } catch (error) {
            toast.error("Failed to delete program.");
        }
    };

    const handleSubmit = async (formValues) => {
        try {
            if (editingProgram) {
                await updateProgram(editingProgram.programID, formValues);
                toast.success("Program updated successfully");
            } else {
                await createProgram(formValues);
                toast.success("Program created successfully");
            }
            setOpen(false);
            setEditingProgram(null);
            form.resetFields();
            fetchPrograms();
        } catch (error) {
            toast.error("Failed to create/update program.");
        }
    };

    return (
        <div>
            <Button 
                type="primary" 
                onClick={() => { 
                    setOpen(true); 
                    setEditingProgram(null); 
                    form.resetFields(); 
                }}
                style={{ marginBottom: 16 }}
            >
                Create new program
            </Button>
            
            <Table dataSource={programs} columns={columns} rowKey="programId" />

            {/* Create/Edit Modal */}
            <Modal
                title={editingProgram ? "Edit Program" : "Create Program"}
                open={open}
                onCancel={() => { 
                    setOpen(false); 
                    setEditingProgram(null); 
                    form.resetFields(); 
                }}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item 
                        label="Program Name" 
                        name="programName" 
                        rules={[{ required: true, message: "Name is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Category" 
                        name="programCategory" 
                        rules={[{ required: true, message: "Category is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        label="Description" 
                        name="programDescription"
                        rules={[{ required: true, message: "Description is required" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Link URL" name="programLink">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Details Modal */}
            <Modal
                title="Program Details"
                open={detailOpen}
                onCancel={() => setDetailOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailOpen(false)}>
                        Close
                    </Button>
                ]}
            >
                {selectedProgram && (
                    <div>
                        <p><strong>Name:</strong> {selectedProgram.programName}</p>
                        <p><strong>Category:</strong> {selectedProgram.programCategory}</p>
                        <p><strong>Description:</strong> {selectedProgram.programDescription}</p>
                        {/* {selectedProgram.programLink && (
                            <p>
                                <strong>Image:</strong>
                                <Image 
                                    width={100} 
                                    src={selectedProgram.programLink} 
                                    fallback="No image available"
                                />
                            </p>
                        )} */}
                        <p><strong>Link:</strong> {selectedProgram.programLink}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ManageProgram;