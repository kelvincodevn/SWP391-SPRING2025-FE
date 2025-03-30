import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Upload, Table, Spin, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { createSurveyFromExcel, getAllSurveys } from '../../services/api.survey';

function ManageSurvey() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái để điều khiển Modal
    const [form] = useForm();

    const fetchSurveys = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllSurveys();
            setSurveys(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSurveys();
    }, [fetchSurveys]);

    // Cập nhật cột hiển thị trong bảng theo API mới
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Survey Name', dataIndex: 'surveyName', key: 'surveyName' },
        { title: 'Description', dataIndex: 'surveyDescription', key: 'surveyDescription' },
    ];

    // Xử lý submit form tạo survey
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const file = values.file.fileList[0].originFileObj;
            // Chỉ gửi file, không cần các tham số thời gian
            await createSurveyFromExcel(file);
            form.resetFields();
            setIsModalOpen(false); // Đóng Modal sau khi submit thành công
            fetchSurveys(); // Làm mới danh sách survey
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className="p-8">
            <div className="mb-4">
                <Button type="primary" onClick={showModal}>
                    Create Survey
                </Button>
            </div>

            <Modal
                title="Create New Survey"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="file"
                        label="Upload Survey Excel"
                        rules={[{ required: true, message: 'Please upload an Excel file' }]}
                    >
                        <Upload accept=".xlsx, .xls" maxCount={1}>
                            <Button>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {loading ? <Spin /> : (
                <Table dataSource={surveys} columns={columns} rowKey="id" />
            )}
        </div>
    );
}

export default ManageSurvey;