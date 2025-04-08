import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Modal, Table, Upload, Tag, Spin, Alert, Typography, Space } from "antd";
import { toast } from "react-toastify";
import { getPsychologistBookings, completeBooking } from "../../services/api.booking";

const { Title, Text } = Typography;

function PsychologistBooking() {
    const [bookings, setBookings] = useState([]);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);
    const psychologistId = localStorage.getItem("userID");

    const fetchBookings = useCallback(async () => {
        if (!psychologistId) {
            toast.error("Psychologist not logged in. Please log in to continue.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getPsychologistBookings(psychologistId);
            if (data) {
                setBookings(data.map(booking => ({
                    bookingId: booking.bookingId,
                    clientFullName: booking.clientDetails?.fullName || "Not specified",
                    slotDate: booking.date || "N/A",
                    slotTime: booking.startTime && booking.endTime ? `${booking.startTime} - ${booking.endTime}` : "N/A",
                    status: booking.status,
                })));
            } else {
                setError("Failed to load bookings. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching bookings.");
        } finally {
            setLoading(false);
        }
    }, [psychologistId]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const columns = [
        {
            title: "Booking ID",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "Client Name",
            dataIndex: "clientFullName",
            key: "clientFullName",
        },
        {
            title: "Slot Date",
            dataIndex: "slotDate",
            key: "slotDate",
        },
        {
            title: "Slot Time",
            dataIndex: "slotTime",
            key: "slotTime",
        },
        // {
        //     title: "Status",
        //     dataIndex: "status",
        //     key: "status",
        //     render: (status) => {
        //         let color;
        //         switch (status) {
        //             case "PENDING":
        //                 color = "orange";
        //                 break;
        //             case "PAID":
        //                 color = "purple";
        //                 break;
        //             case "COMPLETED":
        //                 color = "green";
        //                 break;
        //             case "CANCELLED":
        //                 color = "red";
        //                 break;
        //             default:
        //                 color = "default";
        //         }
        //         return <Tag color={color}>{status}</Tag>;
        //     },
        // },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color;
                switch (status) {
                    case "PENDING":
                        color = "orange";
                        break;
                    case "PAID":
                        color = "purple";
                        break;
                    case "AWAITING_CONFIRMATION":
                        color = "blue";
                        break;
                    case "COMPLETED":
                        color = "green";
                        break;
                    case "CANCELLED":
                        color = "red";
                        break;
                    default:
                        color = "default";
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        // {
        //     title: "Action",
        //     key: "action",
        //     render: (text, record) => (
        //         <Space>
        //             {record.status === "PAID" && (
        //                 <Button
        //                     type="primary"
        //                     onClick={() => handleComplete(record.bookingId)}
        //                     disabled={actionLoading}
        //                 >
        //                     Complete
        //                 </Button>
        //             )}
        //             {record.status === "PENDING" && (
        //                 <Tag color="orange">Waiting for payment</Tag>
        //             )}
        //             {record.status === "COMPLETED" && (
        //                 <Tag color="green">Booking Completed</Tag>
        //             )}
        //             {record.status === "CANCELLED" && (
        //                 <Tag color="red">Booking Cancelled</Tag>
        //             )}
        //         </Space>
        //     ),
        // },

        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space>
                    {record.status === "PAID" && (
                        <Button
                            type="primary"
                            onClick={() => handleComplete(record.bookingId)}
                            disabled={actionLoading}
                        >
                            Complete
                        </Button>
                    )}
                    {record.status === "AWAITING_CONFIRMATION" && (
                        <Tag color="blue">Awaiting Client Confirmation</Tag>
                    )}
                    {record.status === "PENDING" && (
                        <Tag color="orange">Waiting for payment</Tag>
                    )}
                    {record.status === "COMPLETED" && (
                        <Tag color="green">Booking Completed</Tag>
                    )}
                    {record.status === "CANCELLED" && (
                        <Tag color="red">Booking Cancelled</Tag>
                    )}
                </Space>
            ),
        },
    ];

    const handleComplete = (bookingId) => {
        setSelectedBookingId(bookingId);
        setOpenCompleteModal(true);
        form.resetFields();
    };

    const handleCompleteSubmit = useCallback(async (values) => {
        if (!psychologistId) {
            toast.error("Psychologist not logged in. Please log in to continue.");
            return;
        }

        setActionLoading(true);
        try {
            const file = values.report.fileList[0].originFileObj;
            await completeBooking(psychologistId, selectedBookingId, file);
            toast.success("Booking completed and report sent");
            setOpenCompleteModal(false);
            setBookings(bookings.map(b => b.bookingId === selectedBookingId ? { ...b, status: "COMPLETED" } : b));
        } catch (error) {
            toast.error("Failed to complete booking");
        } finally {
            setActionLoading(false);
        }
    }, [psychologistId, selectedBookingId, bookings]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Psychologist Bookings
            </Title>

            {error && (
                <Alert
                    message={error}
                    type="error"
                    showIcon
                    className="mb-6 max-w-2xl mx-auto"
                />
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading bookings..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={bookings}
                    columns={columns}
                    rowKey="bookingId"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "No bookings found." }}
                />
            )}

            <Modal
                title="Complete Booking"
                open={openCompleteModal}
                onCancel={() => setOpenCompleteModal(false)}
                footer={null}
                centered
            >
                <Form form={form} onFinish={handleCompleteSubmit} layout="vertical">
                    <Form.Item
                        name="report"
                        label="Upload Report"
                        rules={[{ required: true, message: "Please upload a report" }]}
                    >
                        <Upload
                            maxCount={1}
                            beforeUpload={() => false}
                            disabled={actionLoading}
                        >
                            <Button disabled={actionLoading}>Upload File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={actionLoading}
                            disabled={actionLoading}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PsychologistBooking;