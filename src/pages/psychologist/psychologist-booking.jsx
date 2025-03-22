// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Table, Upload, Tag } from "antd";
// import { toast } from "react-toastify";
// import { getPsychologistBookings, acceptBooking, declineBooking, completeBooking } from "../../services/api.booking";
// import api from "../../config/axios";

// function PsychologistBooking() {
//     const [bookings, setBookings] = useState([]);
//     const [openCompleteModal, setOpenCompleteModal] = useState(false);
//     const [selectedBookingId, setSelectedBookingId] = useState(null);
//     const [form] = Form.useForm();
//     const psychologistId = localStorage.getItem("userID");

//     useEffect(() => {
//         const fetchBookings = async () => {
//             if (!psychologistId) {
//                 toast.error("Psychologist not logged in. Please log in to continue.");
//                 return;
//             }
//             const data = await getPsychologistBookings(psychologistId);
//             setBookings(data.map(booking => ({
//                 bookingId: booking.bookingId,
//                 clientFullName: booking.clientDetails.fullName,
//                 slotDate: booking.date,
//                 slotTime: `${booking.startTime} - ${booking.endTime}`,
//                 status: booking.status,
//             })));
//         };
//         fetchBookings();
//     }, [psychologistId]);

//     const columns = [
//         {
//             title: "Booking ID",
//             dataIndex: "bookingId",
//             key: "bookingId",
//         },
//         {
//             title: "Client Name",
//             dataIndex: "clientFullName",
//             key: "clientFullName",
//         },
//         {
//             title: "Slot Date",
//             dataIndex: "slotDate",
//             key: "slotDate",
//         },
//         {
//             title: "Slot Time",
//             dataIndex: "slotTime",
//             key: "slotTime",
//         },
//         {
//             title: "Status",
//             dataIndex: "status",
//             key: "status",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <>
//                     {record.status === "PENDING" && (
//                         <>
//                             <Button
//                                 type="primary"
//                                 onClick={() => handleAccept(record.bookingId)}
//                             >
//                                 Accept
//                             </Button>
//                             <Button
//                                 danger
//                                 style={{ marginLeft: "8px" }}
//                                 onClick={() => handleDecline(record.bookingId)}
//                             >
//                                 Decline
//                             </Button>
//                         </>
//                     )}
//                     {record.status === "ACCEPTED" && (
//                         <Button
//                             type="primary"
//                             onClick={() => handleComplete(record.bookingId)}
//                             disabled={record.status !== "PAID"} // Chỉ enable khi trạng thái là PAID
//                         >
//                             Complete
//                         </Button>
//                     )}
//                     {record.status === "PAID" && (
//                         <Button
//                             type="primary"
//                             onClick={() => handleComplete(record.bookingId)}
//                         >
//                             Complete
//                         </Button>
//                     )}
//                     {record.status === "DECLINED" && (
//                         <Tag color="red">Booking Declined</Tag>
//                     )}
//                     {record.status === "COMPLETED" && (
//                         <Tag color="green">Booking Completed</Tag>
//                     )}
//                 </>
//             ),
//         },
//     ];

//     const handleAccept = async (bookingId) => {
//         try {
//             await acceptBooking(psychologistId, bookingId);
//             toast.success("Booking accepted");
//             setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "ACCEPTED" } : b));
//         } catch (error) {
//             toast.error("Failed to accept booking");
//         }
//     };

//     const handleDecline = async (bookingId) => {
//         try {
//             await declineBooking(psychologistId, bookingId);
//             toast.success("Booking declined");
//             setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "DECLINED" } : b));
//         } catch (error) {
//             toast.error("Failed to decline booking");
//         }
//     };

//     const handleComplete = (bookingId) => {
//         setSelectedBookingId(bookingId);
//         setOpenCompleteModal(true);
//     };

//     // const handleCompleteSubmit = async (values) => {
//     //     const formData = new FormData();
//     //     formData.append("report", values.report.fileList[0].originFileObj);
//     //     formData.append("bookingId", selectedBookingId);

//     //     try {
//     //         await api.put(`/api/bookings/complete`, formData, {
//     //             headers: { "Content-Type": "multipart/form-data" },
//     //             params: { psychologistId },
//     //         });
//     //         toast.success("Booking completed and report sent");
//     //         setOpenCompleteModal(false);
//     //         setBookings(
//     //             bookings.map((b) =>
//     //                 b.bookingId === selectedBookingId ? { ...b, status: "COMPLETED" } : b
//     //             )
//     //         );
//     //     } catch (error) {
//     //         toast.error("Failed to complete booking");
//     //     }
//     // };

//     const handleCompleteSubmit = async (values) => {
//       try {
//           const file = values.report.fileList[0].originFileObj;
//           await completeBooking(psychologistId, selectedBookingId, file);
//           toast.success("Booking completed and report sent");
//           setOpenCompleteModal(false);
//           setBookings(
//               bookings.map((b) =>
//                   b.bookingId === selectedBookingId ? { ...b, status: "COMPLETED" } : b
//               )
//           );
//       } catch (error) {
//           toast.error("Failed to complete booking");
//       }
//   };

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-8">Manage Bookings</h1>
//             <Table dataSource={bookings} columns={columns} />
//             <Modal
//                 title="Complete Booking"
//                 open={openCompleteModal}
//                 onCancel={() => setOpenCompleteModal(false)}
//                 footer={null}
//             >
//                 <Form form={form} onFinish={handleCompleteSubmit} layout="vertical">
//                     <Form.Item
//                         name="report"
//                         label="Upload Report"
//                         rules={[{ required: true, message: "Please upload a report" }]}
//                     >
//                         <Upload maxCount={1} beforeUpload={() => false}>
//                             <Button>Upload File</Button>
//                         </Upload>
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default PsychologistBooking;

import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Modal, Table, Upload, Tag, Spin, Alert, Typography, Space } from "antd";
import { toast } from "react-toastify";
import { getPsychologistBookings, acceptBooking, declineBooking, completeBooking } from "../../services/api.booking";

const { Title, Text } = Typography;

function PsychologistBooking() {
    const [bookings, setBookings] = useState([]);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); // Loading cho danh sách bookings
    const [actionLoading, setActionLoading] = useState(false); // Loading cho các hành động (accept, decline, complete)
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const psychologistId = localStorage.getItem("userID");

    // Hàm lấy danh sách bookings
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
            console.error("Error fetching bookings:", error);
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
                    case "ACCEPTED":
                        color = "blue";
                        break;
                    case "PAID":
                        color = "purple";
                        break;
                    case "COMPLETED":
                        color = "green";
                        break;
                    case "DECLINED":
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
                <Space>
                    {record.status === "PENDING" && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => handleAccept(record.bookingId)}
                                disabled={actionLoading}
                                loading={actionLoading}
                            >
                                Accept
                            </Button>
                            <Button
                                danger
                                onClick={() => handleDecline(record.bookingId)}
                                disabled={actionLoading}
                                loading={actionLoading}
                            >
                                Decline
                            </Button>
                        </>
                    )}
                    {(record.status === "PAID" || record.status === "ACCEPTED") && (
                        <Button
                            type="primary"
                            onClick={() => handleComplete(record.bookingId)}
                            disabled={actionLoading || record.status !== "PAID"} // Chỉ enable khi trạng thái là PAID
                        >
                            Complete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const handleAccept = useCallback(async (bookingId) => {
        if (!psychologistId) {
            toast.error("Psychologist not logged in. Please log in to continue.");
            return;
        }

        setActionLoading(true);
        try {
            await acceptBooking(psychologistId, bookingId);
            toast.success("Booking accepted");
            setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "ACCEPTED" } : b));
        } catch (error) {
            toast.error("Failed to accept booking");
            console.error("Error accepting booking:", error);
        } finally {
            setActionLoading(false);
        }
    }, [psychologistId, bookings]);

    const handleDecline = useCallback((bookingId) => {
        if (!psychologistId) {
            toast.error("Psychologist not logged in. Please log in to continue.");
            return;
        }

        Modal.confirm({
            title: 'Are you sure you want to decline this booking?',
            content: 'This action cannot be undone.',
            okText: 'Yes, decline',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                setActionLoading(true);
                try {
                    await declineBooking(psychologistId, bookingId);
                    toast.success("Booking declined");
                    setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "DECLINED" } : b));
                } catch (error) {
                    toast.error("Failed to decline booking");
                    console.error("Error declining booking:", error);
                } finally {
                    setActionLoading(false);
                }
            },
        });
    }, [psychologistId, bookings]);

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
            console.error("Error completing booking:", error);
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

            {/* Modal for Complete Booking */}
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