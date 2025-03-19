import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table, Upload, Tag } from "antd";
import { toast } from "react-toastify";
import { getPsychologistBookings, acceptBooking, declineBooking, completeBooking } from "../../services/api.booking";
import api from "../../config/axios";

function PsychologistBooking() {
    const [bookings, setBookings] = useState([]);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [form] = Form.useForm();
    const psychologistId = localStorage.getItem("userID");

    useEffect(() => {
        const fetchBookings = async () => {
            if (!psychologistId) {
                toast.error("Psychologist not logged in. Please log in to continue.");
                return;
            }
            const data = await getPsychologistBookings(psychologistId);
            setBookings(data.map(booking => ({
                bookingId: booking.bookingId,
                clientFullName: booking.clientDetails.fullName,
                slotDate: booking.date,
                slotTime: `${booking.startTime} - ${booking.endTime}`,
                status: booking.status,
            })));
        };
        fetchBookings();
    }, [psychologistId]);

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
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <>
                    {record.status === "PENDING" && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => handleAccept(record.bookingId)}
                            >
                                Accept
                            </Button>
                            <Button
                                danger
                                style={{ marginLeft: "8px" }}
                                onClick={() => handleDecline(record.bookingId)}
                            >
                                Decline
                            </Button>
                        </>
                    )}
                    {record.status === "ACCEPTED" && (
                        <Button
                            type="primary"
                            onClick={() => handleComplete(record.bookingId)}
                            disabled={record.status !== "PAID"} // Chỉ enable khi trạng thái là PAID
                        >
                            Complete
                        </Button>
                    )}
                    {record.status === "PAID" && (
                        <Button
                            type="primary"
                            onClick={() => handleComplete(record.bookingId)}
                        >
                            Complete
                        </Button>
                    )}
                    {record.status === "DECLINED" && (
                        <Tag color="red">Booking Declined</Tag>
                    )}
                    {record.status === "COMPLETED" && (
                        <Tag color="green">Booking Completed</Tag>
                    )}
                </>
            ),
        },
    ];

    const handleAccept = async (bookingId) => {
        try {
            await acceptBooking(psychologistId, bookingId);
            toast.success("Booking accepted");
            setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "ACCEPTED" } : b));
        } catch (error) {
            toast.error("Failed to accept booking");
        }
    };

    const handleDecline = async (bookingId) => {
        try {
            await declineBooking(psychologistId, bookingId);
            toast.success("Booking declined");
            setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "DECLINED" } : b));
        } catch (error) {
            toast.error("Failed to decline booking");
        }
    };

    const handleComplete = (bookingId) => {
        setSelectedBookingId(bookingId);
        setOpenCompleteModal(true);
    };

    // const handleCompleteSubmit = async (values) => {
    //     const formData = new FormData();
    //     formData.append("report", values.report.fileList[0].originFileObj);
    //     formData.append("bookingId", selectedBookingId);

    //     try {
    //         await api.put(`/api/bookings/complete`, formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //             params: { psychologistId },
    //         });
    //         toast.success("Booking completed and report sent");
    //         setOpenCompleteModal(false);
    //         setBookings(
    //             bookings.map((b) =>
    //                 b.bookingId === selectedBookingId ? { ...b, status: "COMPLETED" } : b
    //             )
    //         );
    //     } catch (error) {
    //         toast.error("Failed to complete booking");
    //     }
    // };

    const handleCompleteSubmit = async (values) => {
      try {
          const file = values.report.fileList[0].originFileObj;
          await completeBooking(psychologistId, selectedBookingId, file);
          toast.success("Booking completed and report sent");
          setOpenCompleteModal(false);
          setBookings(
              bookings.map((b) =>
                  b.bookingId === selectedBookingId ? { ...b, status: "COMPLETED" } : b
              )
          );
      } catch (error) {
          toast.error("Failed to complete booking");
      }
  };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Manage Bookings</h1>
            <Table dataSource={bookings} columns={columns} />
            <Modal
                title="Complete Booking"
                open={openCompleteModal}
                onCancel={() => setOpenCompleteModal(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleCompleteSubmit} layout="vertical">
                    <Form.Item
                        name="report"
                        label="Upload Report"
                        rules={[{ required: true, message: "Please upload a report" }]}
                    >
                        <Upload maxCount={1} beforeUpload={() => false}>
                            <Button>Upload File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PsychologistBooking;