import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { getPsychologistProfile, updatePsychologistProfile } from '../../services/api.psychologist';

function PsychologistProfile() {
    const [form] = useForm();
    const psychologistId = localStorage.getItem('psychologistId');

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getPsychologistProfile(psychologistId);
            form.setFieldsValue(data);
        };
        fetchProfile();
    }, [psychologistId]);

    const handleSubmit = async (formValues) => {
        try {
            await updatePsychologistProfile(formValues, psychologistId);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Profile</h1>
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
                <Form.Item label="Major" name="major" rules={[{ required: true, message: "Major is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Degree" name="degree" rules={[{ required: true, message: "Degree is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default PsychologistProfile;