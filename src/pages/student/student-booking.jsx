import React, { useEffect, useState, useCallback } from "react";
import { Button, Modal, Table, Card, Row, Col, Typography, Tag, Spin, Alert } from "antd";
import { toast } from "react-toastify";
import { getUserBookings, cancelBooking, getBookingDetails, confirmBooking } from "../../services/api.booking";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../services/api.payment";

const { Title, Text } = Typography;

function StudentBooking() {
    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem("userID"));
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const location = useLocation();

    const fetchBookings = useCallback(async () => {
        if (!userId) {
            toast.error("User not logged in. Please log in to continue.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getUserBookings(userId);
            if (data) {
                setBookings(
                    data.map((booking) => ({
                        bookingId: booking.bookingId,
                        psychologistFullName: booking.psychologistName,
                        slotDate: booking.date,
                        slotTime: `${booking.startTime} - ${booking.endTime}`,
                        status: booking.status,
                        fee: booking.fee || 150000,
                    }))
                );
            } else {
                setError("Failed to load bookings. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching bookings.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings, location]);

    const handleCancel = useCallback(async (bookingId) => {
        setActionLoading(true);
        try {
            await cancelBooking(userId, bookingId);
            toast.success("Booking cancelled successfully.");
            setBookings((prevBookings) =>
                prevBookings.map((b) =>
                    b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b
                )
            );
        } catch (error) {
            toast.error("Failed to cancel booking.");
        } finally {
            setActionLoading(false);
        }
    }, [userId]);

    const handlePay = useCallback(async (bookingId) => {
        setActionLoading(true);
        try {
            const paymentUrl = await createPayment(bookingId);
            if (paymentUrl) {
                window.location.href = paymentUrl; // Chuyển hướng đến URL thanh toán VNPay
            }
        } catch (error) {
            toast.error("Failed to initiate payment.");
        } finally {
            setActionLoading(false);
        }
    }, []);

    const handleConfirm = useCallback(async (bookingId) => {
        setActionLoading(true);
        try {
            const response = await confirmBooking(userId, bookingId); // Gọi hàm từ api.booking.js
            if (response) {
                toast.success("Booking confirmed successfully.");
                setBookings((prevBookings) =>
                    prevBookings.map((b) =>
                        b.bookingId === bookingId ? { ...b, status: "COMPLETED" } : b
                    )
                );
            }
        } catch (error) {
            toast.error("Failed to confirm booking."); // Lỗi đã được xử lý trong api.booking.js
        } finally {
            setActionLoading(false);
        }
    }, [userId]);

    const handleViewDetails = useCallback(async (bookingId) => {
        setModalLoading(true);
        setSelectedBooking(null);
        try {
            const bookingDetails = await getBookingDetails(bookingId);
            if (bookingDetails) {
                setSelectedBooking(bookingDetails);
                setDetailsModalVisible(true);
            } else {
                toast.error("No booking details found.");
            }
        } catch (error) {
            toast.error("Failed to fetch booking details.");
        } finally {
            setModalLoading(false);
        }
    }, []);

    const columns = [
        {
            title: "Booking ID",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "Psychologist Name",
            dataIndex: "psychologistFullName",
            key: "psychologistFullName",
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
        {
            title: "Fee",
            dataIndex: "fee",
            key: "fee",
            render: (fee) => `${fee.toLocaleString("vi-VN")} VND`,
        },
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
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <Button
                        type="link"
                        onClick={() => handleViewDetails(record.bookingId)}
                        disabled={actionLoading}
                    >
                        View Details
                    </Button>
                    {record.status === "PENDING" && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => handlePay(record.bookingId)}
                                disabled={actionLoading}
                                loading={actionLoading}
                            >
                                Pay
                            </Button>
                            <Button
                                danger
                                onClick={() => handleCancel(record.bookingId)}
                                disabled={actionLoading}
                                loading={actionLoading}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                    {record.status === "PAID" && (
                        <Tag color="purple">Waiting for consultation</Tag>
                    )}
                    {record.status === "AWAITING_CONFIRMATION" && (
                        <Button
                            type="primary"
                            onClick={() => handleConfirm(record.bookingId)}
                            disabled={actionLoading}
                        >
                            Confirm
                        </Button>
                    )}
                    {record.status === "COMPLETED" && (
                        <Tag color="green">Booking Completed</Tag>
                    )}
                    {record.status === "CANCELLED" && (
                        <Tag color="red">Booking Cancelled</Tag>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Your Bookings
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
                    locale={{ emptyText: "You haven't made any bookings yet." }}
                />
            )}

            <Modal
                title="Booking Details"
                open={detailsModalVisible}
                onCancel={() => setDetailsModalVisible(false)}
                footer={null}
                width={800}
                centered
            >
                {modalLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin tip="Loading booking details..." />
                    </div>
                ) : selectedBooking ? (
                    <div className="space-y-6">
                        <Card
                            title="Booking Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Text strong>Booking ID:</Text>
                                    <Text className="block">{selectedBooking.bookingId || "N/A"}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Status:</Text>
                                    <Text className="block">{selectedBooking.status || "N/A"}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Fee:</Text>
                                    <Text className="block">
                                        {selectedBooking.fee
                                            ? `${selectedBooking.fee.toLocaleString("vi-VN")} VND`
                                            : "N/A"}
                                    </Text>
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title="Slot Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Text strong>Slot ID:</Text>
                                    <Text className="block">{selectedBooking.slotId || "N/A"}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Date:</Text>
                                    <Text className="block">{selectedBooking.date || "N/A"}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Time:</Text>
                                    <Text className="block">
                                        {selectedBooking.startTime && selectedBooking.endTime
                                            ? `${selectedBooking.startTime} - ${selectedBooking.endTime}`
                                            : "N/A"}
                                    </Text>
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title="Psychologist Information"
                            className="shadow-sm"
                            headStyle={{ backgroundColor: "#f0f5ff", borderBottom: "none" }}
                        >
                            {selectedBooking.psychologistDetails ? (
                                <>
                                    <Row gutter={[16, 16]}>
                                        <Col span={8}>
                                            <Text strong>Name:</Text>
                                            <Text className="block">
                                                {selectedBooking.psychologistDetails.fullName || "Not specified"}
                                            </Text>
                                        </Col>
                                        <Col span={8}>
                                            <Text strong>Major:</Text>
                                            <Text className="block">
                                                {selectedBooking.psychologistDetails.major || "Not specified"}
                                            </Text>
                                        </Col>
                                        <Col span={8}>
                                            <Text strong>Degree:</Text>
                                            <Text className="block">
                                                {selectedBooking.psychologistDetails.degree || "Not specified"}
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]} className="mt-4">
                                        <Col span={8}>
                                            <Text strong>Workplace:</Text>
                                            <Text className="block">
                                                {selectedBooking.psychologistDetails.workplace || "Not specified"}
                                            </Text>
                                        </Col>
                                        <Col span={8}>
                                            <Text strong>Fee:</Text>
                                            <Text className="block">
                                                {selectedBooking.psychologistDetails.fee != null
                                                    ? `${selectedBooking.psychologistDetails.fee.toLocaleString("vi-VN")} VND`
                                                    : "N/A"}
                                            </Text>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Text type="secondary">Psychologist information not available.</Text>
                            )}
                        </Card>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <Text type="secondary">No booking details available.</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default StudentBooking;