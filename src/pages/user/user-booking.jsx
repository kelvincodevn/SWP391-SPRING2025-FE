// import React, { useEffect, useState } from "react";
// import { Button, Form, Input, Modal, Select, Table } from "antd";
// import { toast } from "react-toastify";
// import { getUserBookings, cancelBooking, createBooking } from "../../services/api.booking";
// import { getAllPsychologists, getPsychologistSlots } from "../../services/api.psychologist";
// import { createPayment } from "../../services/api.payment";

// function UserBooking() {
//     const [bookings, setBookings] = useState([]);
//     const [psychologists, setPsychologists] = useState([]);
//     const [slots, setSlots] = useState([]);
//     const [openModal, setOpenModal] = useState(false);
//     const [form] = Form.useForm();
//     const userId = localStorage.getItem("userID");

//     useEffect(() => {
//       const fetchBookings = async () => {
//         if (!userId) {
//           toast.error("User not logged in. Please log in to continue.");
//           return;
//         }
//         const data = await getUserBookings(userId);
//         setBookings(
//           data.map((booking) => ({
//             bookingId: booking.bookingId,
//             psychologistFullName: booking.psychologistName, // Dùng psychologistName từ BookingResponse
//             slotDate: booking.date, // Dùng date từ BookingResponse
//             slotTime: `${booking.startTime} - ${booking.endTime}`, // Dùng startTime và endTime
//             status: booking.status,
//             fee: booking.fee || 150000,
//           }))
//         );
//       };
//       fetchBookings();
//     }, [userId]);

//     useEffect(() => {
//         if (openModal) {
//           const fetchPsychologists = async () => {
//             const data = await getAllPsychologists();
//             setPsychologists(data);
//           };
//           fetchPsychologists();
//         }
//       }, [openModal]);

//       const handlePsychologistChange = async (psychologistId) => {
//         const data = await getPsychologistSlots(psychologistId);
//         setSlots(data.filter((slot) => slot.availabilityStatus === "AVAILABLE"));
//       };

//     const columns = [
//         {
//             title: "Booking ID",
//             dataIndex: "bookingId",
//             key: "bookingId",
//         },
//         {
//             title: "Psychologist Name",
//             dataIndex: "psychologistFullName",
//             key: "psychologistFullName",
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
//              <>
//                 {record.status === "CONFIRMED" && (
//                     <Button type="primary" onClick={() => handlePay(record.bookingId)}>
//                       Pay
//                     </Button>
//                   )}    

//                 {record.status !== "CANCELLED" &&
//                     record.status !== "PAID" &&
//                     record.status !== "COMPLETED" && (
//                     <Button danger onClick={() => handleCancel(record.bookingId)} style={{ marginLeft: 8 }}>
//                         Cancel
//                     </Button>
//                     )}
//                </> 
//             ),
//         },
//     ];

//     const handleCancel = async (bookingId) => {
//         try {
//             await cancelBooking(userId, bookingId);
//             toast.success("Booking cancelled");
//             setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b));
//         } catch (error) {
//             toast.error("Failed to cancel booking");
//         }
//     };

//     const handlePay = async (bookingId) => {
//         try {
//           const paymentUrl = await createPayment(bookingId);
//           if (paymentUrl) {
//             window.location.href = paymentUrl;
//           }
//         } catch (error) {
//           toast.error("Failed to initiate payment");
//         }
//       };

//       const handleCreateBooking = async (values) => {
//         const request = {
//           psychologistSlotId: values.slotId,
//           reason: values.reason,
//         };
//         try {
//           await createBooking(userId, request);
//           toast.success("Booking created successfully");
//           setOpenModal(false);
//           form.resetFields();
//           const data = await getUserBookings(userId);
//           setBookings(
//             data.map((booking) => ({
//               bookingId: booking.bookingId,
//               psychologistFullName: booking.psychologistSlot.psychologist.user.fullName,
//               slotDate: booking.psychologistSlot.slot.date,
//               slotTime: `${booking.psychologistSlot.slot.startTime} - ${booking.psychologistSlot.slot.endTime}`,
//               status: booking.status,
//             }))
//           );
//         } catch (error) {
//           toast.error("Failed to create booking");
//         }
//       };

//       return (
//         <div className="p-8">
//           <h1 className="text-2xl font-bold mb-8">Manage Bookings</h1>
//           <Button type="primary" onClick={() => setOpenModal(true)} className="mb-4">
//             Create New Booking
//           </Button>
//           <Table dataSource={bookings} columns={columns} />
//           <Modal
//             title="Create New Booking"
//             open={openModal}
//             onCancel={() => setOpenModal(false)}
//             footer={null}
//           >
//             <Form form={form} onFinish={handleCreateBooking} layout="vertical">
//               <Form.Item
//                 name="psychologistId"
//                 label="Select Psychologist"
//                 rules={[{ required: true, message: "Please select a psychologist" }]}
//               >
//                 <Select onChange={handlePsychologistChange}>
//                   {psychologists.map((p) => (
//                     <Select.Option key={p.userID} value={p.userID}>
//                       {p.fullName} ({p.major} - {p.degree})
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 name="slotId"
//                 label="Select Slot"
//                 rules={[{ required: true, message: "Please select a slot" }]}
//               >
//                 <Select>
//                   {slots.map((s) => (
//                     <Select.Option key={s.slotId} value={s.slotId}>
//                       {s.date} {s.time}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Form.Item
//                 name="reason"
//                 label="Reason for Booking"
//                 rules={[{ required: true, message: "Please provide a reason" }]}
//               >
//                 <Input.TextArea maxLength={1000} />
//               </Form.Item>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Submit Booking
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Modal>
//         </div>
//       );
//     }
    
//     export default UserBooking;

import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Card, Row, Col, Typography, Tag } from "antd";
import { toast } from "react-toastify";
import { getUserBookings, cancelBooking, getBookingDetails, confirmBooking } from "../../services/api.booking";
import { createPayment } from "../../services/api.payment";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

function UserBooking() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userID"));
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) {
        toast.error("User not logged in. Please log in to continue.");
        return;
      }
      const data = await getUserBookings(userId);
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
    };
    fetchBookings();
  }, [userId, location]);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(userId, bookingId);
      toast.success("Booking cancelled");
      setBookings(bookings.map((b) => (b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b)));
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const handleConfirm = async (bookingId) => {
    try {
      await confirmBooking(bookingId);
      toast.success("Booking confirmed");
      setBookings(bookings.map((b) => (b.bookingId === bookingId ? { ...b, status: "CONFIRMED" } : b)));
    } catch (error) {
      toast.error("Failed to confirm booking");
    }
  };

  const handlePay = async (bookingId) => {
    try {
      const paymentUrl = await createPayment(bookingId);
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      toast.error("Failed to initiate payment");
    }
  };

  const handleViewDetails = async (bookingId) => {
    try {
      const bookingDetails = await getBookingDetails(bookingId);
      if (bookingDetails) {
        setSelectedBooking(bookingDetails);
        setDetailsModalVisible(true);
      }
    } catch (error) {
      toast.error("Failed to fetch booking details");
    }
  };

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
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button type="link" onClick={() => handleViewDetails(record.bookingId)}>
            View Details
          </Button>
          {record.status === "PENDING" && (
            <Tag color="orange">Waiting for confirmation</Tag>
          )}
          {record.status === "ACCEPTED" && (
            <Button type="primary" onClick={() => handleConfirm(record.bookingId)}>
              Confirm
            </Button>
          )}
          {record.status === "CONFIRMED" && (
            <Button type="primary" onClick={() => handlePay(record.bookingId)}>
              Pay
            </Button>
          )}
          {record.status === "PAID" && (
            <Tag color="blue">Waiting for consultation report</Tag>
          )}
          {record.status === "DECLINED" && (
            <Tag color="red">Booking Declined</Tag>
          )}
          {record.status === "COMPLETED" && (
            <Tag color="green">Booking Completed</Tag>
          )}
          {record.status !== "CANCELLED" &&
            record.status !== "PAID" &&
            record.status !== "COMPLETED" &&
            record.status !== "DECLINED" && (
              <Button danger onClick={() => handleCancel(record.bookingId)}>
                Cancel
              </Button>
            )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <Title level={2} className="mb-8">
        Manage Bookings
      </Title>
      <Table dataSource={bookings} columns={columns} />

      <Modal
        title="Booking Details"
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <Card title="Booking Information">
              <Row gutter={16}>
                <Col span={8}>
                  <Text strong>Booking ID:</Text>
                  <Text> {selectedBooking.bookingId}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Status:</Text>
                  <Text> {selectedBooking.status}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Fee:</Text>
                  <Text> {selectedBooking.fee.toLocaleString("vi-VN")} VND</Text>
                </Col>
              </Row>
            </Card>

            <Card title="Slot Information">
              <Row gutter={16}>
                <Col span={8}>
                  <Text strong>Slot ID:</Text>
                  <Text> {selectedBooking.slotId}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Date:</Text>
                  <Text> {selectedBooking.date}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Time:</Text>
                  <Text> {selectedBooking.startTime} - {selectedBooking.endTime}</Text>
                </Col>
              </Row>
            </Card>

            <Card title="Psychologist Information">
              <Row gutter={16}>
                <Col span={8}>
                  <Text strong>Name:</Text>
                  <Text> {selectedBooking.psychologistDetails.fullName}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Major:</Text>
                  <Text> {selectedBooking.psychologistDetails.major}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Degree:</Text>
                  <Text> {selectedBooking.psychologistDetails.degree}</Text>
                </Col>
              </Row>
              <Row gutter={16} className="mt-4">
                <Col span={8}>
                  <Text strong>Workplace:</Text>
                  <Text> {selectedBooking.psychologistDetails.workplace}</Text>
                </Col>
                <Col span={8}>
                  <Text strong>Fee:</Text>
                  <Text> {selectedBooking.psychologistDetails.fee.toLocaleString("vi-VN")} VND</Text>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default UserBooking;