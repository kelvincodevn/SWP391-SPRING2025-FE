// import React, { useEffect, useState } from 'react';
// import { Button, DatePicker, Form, Modal, Select, Table, TimePicker } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { getPsychologistSlots, createSlot, updateSlot, deleteSlot } from '../../services/api.slot';
// import moment from 'moment'; // Import moment để xử lý thời gian

// function PsychologistSlot() {
//     const [slots, setSlots] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingSlot, setEditingSlot] = useState(null);
//     const psychologistId = localStorage.getItem('userID'); // Lấy từ localStorage

//     const fetchSlots = async () => {
//         if (!psychologistId) {
//             toast.error("Psychologist ID not found. Please log in.");
//             return;
//         }
//         const data = await getPsychologistSlots(psychologistId);
//         // Ánh xạ dữ liệu từ backend sang định dạng frontend mong đợi
//         const mappedData = data.map(slot => ({
//             ...slot,
//             date: moment(slot.availableDate).format('DD-MM-YYYY'), // Định dạng date
//             time: `${moment(slot.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(slot.endTime, 'HH:mm:ss').format('HH:mm')}`, // Định dạng time
//         }));
//         setSlots(mappedData.filter(s => !s.is_deleted));
//     };

//     useEffect(() => {
//         fetchSlots();
//     }, [psychologistId]);

//     const columns = [
//         {
//             title: "Slot ID",
//             dataIndex: "slotId",
//             key: "slotId",
//         },
//         {
//             title: "Date",
//             dataIndex: "date",
//             key: "date",
//         },
//         {
//             title: "Time",
//             dataIndex: "time",
//             key: "time",
//         },
//         {
//             title: "Availability",
//             dataIndex: "availabilityStatus",
//             key: "availabilityStatus",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <>
//                     <Button type="primary" onClick={() => handleEdit(record)}>
//                         Edit
//                     </Button>
//                     <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.slotId)}>
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     // const handleEdit = (slot) => {
//     //     setEditingSlot(slot);
//     //     // Định dạng lại time để phù hợp với TimePicker.RangePicker
//     //     const [start, end] = slot.time.split(' - ');
//     //     form.setFieldsValue({
//     //         date: moment(slot.date, 'DD-MM-YYYY'), // Sử dụng moment để parse date
//     //         time: [moment(start, 'HH:mm'), moment(end, 'HH:mm')], // Parse time
//     //         availabilityStatus: slot.availabilityStatus,
//     //     });
//     //     setOpen(true);
//     // };

//     const handleEdit = (slot) => {
//         setEditingSlot(slot);
//         try {
//             // Định dạng lại time để phù hợp với TimePicker.RangePicker
//             let start, end;
//             if (slot.time) {
//                 [start, end] = slot.time.split(' - ');
//             } else {
//                 // Nếu slot.time không tồn tại, gán giá trị mặc định
//                 start = '00:00';
//                 end = '00:00';
//             }
//             form.setFieldsValue({
//                 date: slot.date ? moment(slot.date, 'DD-MM-YYYY') : null, // Parse date
//                 time: [
//                     start ? moment(start, 'HH:mm') : moment('00:00', 'HH:mm'),
//                     end ? moment(end, 'HH:mm') : moment('00:00', 'HH:mm'),
//                 ], // Parse time
//                 availabilityStatus: slot.availabilityStatus || 'AVAILABLE',
//             });
//         } catch (error) {
//             console.error("Error setting form values:", error);
//             toast.error("Failed to load slot data for editing");
//             // Đặt giá trị mặc định nếu có lỗi
//             form.setFieldsValue({
//                 date: null,
//                 time: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
//                 availabilityStatus: 'AVAILABLE',
//             });
//         }
//         setOpen(true); // Đảm bảo modal luôn mở
//     };

//     const handleDelete = (slotId) => {
//         const slot = slots.find((s) => s.slotId === slotId);
//         if (slot.availabilityStatus === "BOOKED") {
//             toast.error("Cannot delete a booked slot");
//             return;
//         }
//         Modal.confirm({
//             title: 'Are you sure you want to delete this slot?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, delete',
//             okType: 'danger',
//             cancelText: 'No, cancel',
//             onOk: async () => {
//                 try {
//                     await deleteSlot(psychologistId, slotId);
//                     toast.success("Slot deleted successfully");
//                     fetchSlots();
//                 } catch (error) {
//                     console.error("Error deleting slot:", error);
//                     toast.error("Failed to delete slot.");
//                 }
//             },
//         });
//     };

//     const handleSubmit = async (formValues) => {
//         const startTimeMoment = formValues.time[0];
//         const endTimeMoment = formValues.time[1];
//         const duration = (endTimeMoment.valueOf() - startTimeMoment.valueOf()) / (1000 * 60); // Chuyển đổi sang phút
//         if (duration > 120) {
//             toast.error("Slot duration cannot exceed 2 hours");
//             return;
//         }

//         try {
//             if (editingSlot && editingSlot.slotId) {
//                 if (editingSlot.availabilityStatus === "BOOKED") {
//                     toast.error("Cannot update a booked slot");
//                     return;
//                 }
//                 await updateSlot(
//                     {
//                         date: formValues.date.format('DD-MM-YYYY'), // Định dạng date
//                         startTime: startTimeMoment.format('HH:mm'), // Định dạng startTime
//                         endTime: endTimeMoment.format('HH:mm'), // Định dạng endTime
//                         availabilityStatus: formValues.availabilityStatus,
//                         psychologistId,
//                     },
//                     editingSlot.slotId
//                 );
//                 toast.success("Slot updated successfully");
//                 setEditingSlot(null);
//             } else {
//                 await createSlot({
//                     date: formValues.date.format('DD-MM-YYYY'), // Định dạng date
//                     startTime: startTimeMoment.format('HH:mm'), // Định dạng startTime
//                     endTime: endTimeMoment.format('HH:mm'), // Định dạng endTime
//                     availabilityStatus: formValues.availabilityStatus,
//                     psychologistId,
//                 });
//                 toast.success("Slot created successfully");
//             }
//             setOpen(false);
//             form.resetFields();
//             fetchSlots();
//         } catch (error) {
//             console.error("Error creating/updating slot:", error);
//             toast.error("Failed to create/update slot.");
//         }
//     };

//     return (
//         <div className="p-8">
//             <Button type="primary" onClick={() => { setOpen(true); setEditingSlot(null); form.resetFields(); }} className="mb-4">
//                 Create new slot
//             </Button>
//             <Table dataSource={slots} columns={columns} />

//             <Modal
//                 title={editingSlot ? "Edit Slot" : "Create Slot"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingSlot(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//             >
//                 <Form form={form} onFinish={handleSubmit} layout="vertical">
//                     <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is required" }]}>
//                         <DatePicker format="DD-MM-YYYY" />
//                     </Form.Item>
//                     <Form.Item label="Time" name="time" rules={[{ required: true, message: "Time is required" }]}>
//                         <TimePicker.RangePicker format="HH:mm" minuteStep={15} />
//                     </Form.Item>
//                     <Form.Item label="Availability Status" name="availabilityStatus" rules={[{ required: true, message: "Status is required" }]}>
//                         <Select>
//                             <Select.Option value="AVAILABLE">Available</Select.Option>
//                             <Select.Option value="BOOKED">Booked</Select.Option>
//                         </Select>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default PsychologistSlot;

// import React, { useEffect, useState } from 'react';
// import { Button, DatePicker, Form, Modal, Select, Table, TimePicker } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { getPsychologistSlots, createSlot, updateSlot, deleteSlot } from '../../services/api.slot';
// import moment from 'moment';
// // import '../../assets/css/psychologist.css'; // Sửa đường dẫn tương đối


// function PsychologistSlot() {
//     const [slots, setSlots] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingSlot, setEditingSlot] = useState(null);
//     const psychologistId = localStorage.getItem('userID');

//     const fetchSlots = async () => {
//         if (!psychologistId) {
//             toast.error("Psychologist ID not found. Please log in.");
//             return;
//         }
//         const data = await getPsychologistSlots(psychologistId);
//         const mappedData = data.map(slot => ({
//             ...slot,
//             date: moment(slot.availableDate).format('DD-MM-YYYY'),
//             time: `${moment(slot.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(slot.endTime, 'HH:mm:ss').format('HH:mm')}`,
//         }));
//         setSlots(mappedData.filter(s => !s.is_deleted));
//     };

//     useEffect(() => {
//         fetchSlots();
//     }, [psychologistId]);


//     const columns = [
//         {
//             title: "Slot ID",
//             dataIndex: "slotId",
//             key: "slotId",
//         },
//         {
//             title: "Date",
//             dataIndex: "date",
//             key: "date",
//         },
//         {
//             title: "Time",
//             dataIndex: "time",
//             key: "time",
//         },
//         {
//             title: "Availability",
//             dataIndex: "availabilityStatus",
//             key: "availabilityStatus",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <>
//                     <Button type="primary" onClick={() => handleEdit(record)}>
//                         Edit
//                     </Button>
//                     <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.slotId)}>
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleEdit = (slot) => {
//         setEditingSlot(slot);
//         try {
//             let start, end;
//             if (slot.time) {
//                 [start, end] = slot.time.split(' - ');
//             } else {
//                 start = '00:00';
//                 end = '00:00';
//             }
//             form.setFieldsValue({
//                 date: slot.date ? moment(slot.date, 'DD-MM-YYYY') : null,
//                 time: [
//                     start ? moment(start, 'HH:mm') : moment('00:00', 'HH:mm'),
//                     end ? moment(end, 'HH:mm') : moment('00:00', 'HH:mm'),
//                 ],
//                 availabilityStatus: slot.availabilityStatus || 'AVAILABLE',
//             });
//         } catch (error) {
//             console.error("Error setting form values:", error);
//             toast.error("Failed to load slot data for editing");
//             form.setFieldsValue({
//                 date: null,
//                 time: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
//                 availabilityStatus: 'AVAILABLE',
//             });
//         }
//         setOpen(true);
//     };

//     const handleDelete = (slotId) => {
//         const slot = slots.find((s) => s.slotId === slotId);
//         if (slot.availabilityStatus === "BOOKED") {
//             toast.error("Cannot delete a booked slot");
//             return;
//         }
//         Modal.confirm({
//             title: 'Are you sure you want to delete this slot?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, delete',
//             okType: 'danger',
//             cancelText: 'No, cancel',
//             onOk: async () => {
//                 try {
//                     await deleteSlot(psychologistId, slotId);
//                     toast.success("Slot deleted successfully");
//                     fetchSlots();
//                 } catch (error) {
//                     console.error("Error deleting slot:", error);
//                     toast.error("Failed to delete slot.");
//                 }
//             },
//         });
//     };

//     const handleSubmit = async (formValues) => {
//         const startTimeMoment = formValues.time[0];
//         const endTimeMoment = formValues.time[1];
//         const duration = (endTimeMoment.valueOf() - startTimeMoment.valueOf()) / (1000 * 60);
//         if (duration > 120) {
//             toast.error("Slot duration cannot exceed 2 hours");
//             return;
//         }

//         try {
//             if (editingSlot && editingSlot.slotId) {
//                 if (editingSlot.availabilityStatus === "BOOKED") {
//                     toast.error("Cannot update a booked slot");
//                     return;
//                 }
//                 await updateSlot(
//                     {
//                         date: formValues.date.format('DD-MM-YYYY'),
//                         startTime: startTimeMoment.format('HH:mm'),
//                         endTime: endTimeMoment.format('HH:mm'),
//                         availabilityStatus: formValues.availabilityStatus,
//                         psychologistId,
//                     },
//                     editingSlot.slotId
//                 );
//                 toast.success("Slot updated successfully");
//                 setEditingSlot(null);
//             } else {
//                 await createSlot({
//                     date: formValues.date.format('DD-MM-YYYY'),
//                     startTime: startTimeMoment.format('HH:mm'),
//                     endTime: endTimeMoment.format('HH:mm'),
//                     availabilityStatus: formValues.availabilityStatus,
//                     psychologistId,
//                 });
//                 toast.success("Slot created successfully");
//             }
//             setOpen(false);
//             form.resetFields();
//             fetchSlots();
//         } catch (error) {
//             console.error("Error creating/updating slot:", error);
//             toast.error("Failed to create/update slot.");
//         }
//     };

//     return (
//         <div className="p-8">
//             <Button type="primary" onClick={() => { setOpen(true); setEditingSlot(null); form.resetFields(); }} className="mb-4">
//                 Create new slot
//             </Button>
//             <Table dataSource={slots} columns={columns} />

//             <Modal
//                 title={editingSlot ? "Edit Slot" : "Create Slot"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingSlot(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//                 style={{ top: 20 }} // Điều chỉnh vị trí modal để tránh che dropdown
//             >
//                 <Form form={form} onFinish={handleSubmit} layout="vertical">
//                     <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is required" }]}>
//                         <DatePicker format="DD-MM-YYYY" />
//                     </Form.Item>
//                     <Form.Item label="Time" name="time" rules={[{ required: true, message: "Time is required" }]}>
//                         <TimePicker.RangePicker
//                             format="HH:mm"
//                             minuteStep={15}
//                             getPopupContainer={trigger => trigger.parentElement} // Đảm bảo dropdown hiển thị đúng vị trí
//                             popupClassName="disable-auto-scroll-picker" // Ngăn auto scroll
//                         />
//                     </Form.Item>
//                     {/* <Form.Item label="Availability Status" name="availabilityStatus" rules={[{ required: true, message: "Status is required" }]}>
//                         <Select>
//                             <Select.Option value="AVAILABLE">Available</Select.Option>
//                         </Select>
//                     </Form.Item> */}
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default PsychologistSlot;

// import React, { useEffect, useState } from 'react';
// import { Button, DatePicker, Form, Modal, Table, TimePicker } from 'antd';
// import { useForm } from 'antd/es/form/Form';
// import { toast } from 'react-toastify';
// import { getPsychologistSlots, createSlot, updateSlot, deleteSlot } from '../../services/api.slot';
// import moment from 'moment';

// function PsychologistSlot() {
//     const [slots, setSlots] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [form] = useForm();
//     const [editingSlot, setEditingSlot] = useState(null);
//     const psychologistId = localStorage.getItem('userID');

//     const fetchSlots = async () => {
//         if (!psychologistId) {
//             toast.error("Psychologist ID not found. Please log in.");
//             return;
//         }
//         const data = await getPsychologistSlots(psychologistId);
//         const mappedData = data.map(slot => ({
//             ...slot,
//             date: moment(slot.availableDate).format('DD-MM-YYYY'),
//             time: `${moment(slot.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(slot.endTime, 'HH:mm:ss').format('HH:mm')}`,
//         }));
//         setSlots(mappedData.filter(s => !s.is_deleted));
//     };

//     useEffect(() => {
//         fetchSlots();
//     }, [psychologistId]);

//     const columns = [
//         {
//             title: "Slot ID",
//             dataIndex: "slotId",
//             key: "slotId",
//         },
//         {
//             title: "Date",
//             dataIndex: "date",
//             key: "date",
//         },
//         {
//             title: "Time",
//             dataIndex: "time",
//             key: "time",
//         },
//         {
//             title: "Availability",
//             dataIndex: "availabilityStatus",
//             key: "availabilityStatus",
//         },
//         {
//             title: "Action",
//             key: "action",
//             render: (text, record) => (
//                 <>
//                     <Button type="primary" onClick={() => handleEdit(record)}>
//                         Edit
//                     </Button>
//                     <Button danger style={{ marginLeft: '8px' }} onClick={() => handleDelete(record.slotId)}>
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     const handleEdit = (slot) => {
//         setEditingSlot(slot);
//         try {
//             let start, end;
//             if (slot.time) {
//                 [start, end] = slot.time.split(' - ');
//             } else {
//                 start = '00:00';
//                 end = '00:00';
//             }
//             form.setFieldsValue({
//                 date: slot.date ? moment(slot.date, 'DD-MM-YYYY') : null,
//                 time: [
//                     start ? moment(start, 'HH:mm') : moment('00:00', 'HH:mm'),
//                     end ? moment(end, 'HH:mm') : moment('00:00', 'HH:mm'),
//                 ],
//             });
//         } catch (error) {
//             console.error("Error setting form values:", error);
//             toast.error("Failed to load slot data for editing");
//             form.setFieldsValue({
//                 date: null,
//                 time: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
//             });
//         }
//         setOpen(true);
//     };

//     const handleDelete = (slotId) => {
//         const slot = slots.find((s) => s.slotId === slotId);
//         if (slot.availabilityStatus === "BOOKED") {
//             toast.error("Cannot delete a booked slot");
//             return;
//         }
//         Modal.confirm({
//             title: 'Are you sure you want to delete this slot?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, delete',
//             okType: 'danger',
//             cancelText: 'No, cancel',
//             onOk: async () => {
//                 try {
//                     await deleteSlot(psychologistId, slotId);
//                     toast.success("Slot deleted successfully");
//                     fetchSlots();
//                 } catch (error) {
//                     console.error("Error deleting slot:", error);
//                     toast.error("Failed to delete slot.");
//                 }
//             },
//         });
//     };

//     const handleSubmit = async (formValues) => {
//         const startTimeMoment = formValues.time[0];
//         const endTimeMoment = formValues.time[1];
//         const duration = (endTimeMoment.valueOf() - startTimeMoment.valueOf()) / (1000 * 60);
//         if (duration > 120) {
//             toast.error("Slot duration cannot exceed 2 hours");
//             return;
//         }

//         try {
//             if (editingSlot && editingSlot.slotId) {
//                 if (editingSlot.availabilityStatus === "BOOKED") {
//                     toast.error("Cannot update a booked slot");
//                     return;
//                 }
//                 await updateSlot(
//                     {
//                         date: formValues.date.format('DD-MM-YYYY'),
//                         startTime: startTimeMoment.format('HH:mm'),
//                         endTime: endTimeMoment.format('HH:mm'),
//                         psychologistId,
//                     },
//                     editingSlot.slotId
//                 );
//                 toast.success("Slot updated successfully");
//                 setEditingSlot(null);
//             } else {
//                 await createSlot({
//                     date: formValues.date.format('DD-MM-YYYY'),
//                     startTime: startTimeMoment.format('HH:mm'),
//                     endTime: endTimeMoment.format('HH:mm'),
//                     psychologistId,
//                 });
//                 toast.success("Slot created successfully");
//             }
//             setOpen(false);
//             form.resetFields();
//             fetchSlots();
//         } catch (error) {
//             console.error("Error creating/updating slot:", error);
//             toast.error("Failed to create/update slot.");
//         }
//     };

//     return (
//         <div className="p-8">
//             <Button type="primary" onClick={() => { setOpen(true); setEditingSlot(null); form.resetFields(); }} className="mb-4">
//                 Create new slot
//             </Button>
//             <Table dataSource={slots} columns={columns} />

//             <Modal
//                 title={editingSlot ? "Edit Slot" : "Create Slot"}
//                 open={open}
//                 onCancel={() => { setOpen(false); setEditingSlot(null); form.resetFields(); }}
//                 onOk={() => form.submit()}
//                 style={{ top: 20 }}
//             >
//                 <Form form={form} onFinish={handleSubmit} layout="vertical">
//                     <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is required" }]}>
//                         <DatePicker format="DD-MM-YYYY" />
//                     </Form.Item>
//                     <Form.Item label="Time" name="time" rules={[{ required: true, message: "Time is required" }]}>
//                         <TimePicker.RangePicker
//                             format="HH:mm"
//                             minuteStep={15}
//                             getPopupContainer={trigger => trigger.parentElement}
//                             popupClassName="disable-auto-scroll-picker"
//                         />
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// }

// export default PsychologistSlot;

import React, { useEffect, useState, useCallback } from 'react';
import { Button, DatePicker, Form, Modal, Table, TimePicker, Spin, Alert, Typography, Space, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import { getPsychologistSlots, createSlot, updateSlot, deleteSlot } from '../../services/api.slot';
import moment from 'moment';

const { Title, Text } = Typography;

function PsychologistSlot() {
    const [slots, setSlots] = useState([]);
    const [open, setOpen] = useState(false); // Modal cho Create/Edit Slot
    const [form] = useForm();
    const [editingSlot, setEditingSlot] = useState(null);
    const [loading, setLoading] = useState(false); // Loading cho danh sách slots
    const [actionLoading, setActionLoading] = useState(false); // Loading cho các hành động (create, update, delete)
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const psychologistId = localStorage.getItem('userID');

    // Hàm lấy danh sách slots
    const fetchSlots = useCallback(async () => {
        if (!psychologistId) {
            toast.error("Psychologist ID not found. Please log in.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getPsychologistSlots(psychologistId);
            if (data) {
                const mappedData = data.map(slot => ({
                    ...slot,
                    date: slot.availableDate ? moment(slot.availableDate).format('DD-MM-YYYY') : "N/A",
                    time: slot.startTime && slot.endTime
                        ? `${moment(slot.startTime, 'HH:mm:ss').format('HH:mm')} - ${moment(slot.endTime, 'HH:mm:ss').format('HH:mm')}`
                        : "N/A",
                }));
                setSlots(mappedData.filter(s => !s.is_deleted));
            } else {
                setError("Failed to load slots. Please try again later.");
            }
        } catch (error) {
            setError("An error occurred while fetching slots.");
            console.error("Error fetching slots:", error);
        } finally {
            setLoading(false);
        }
    }, [psychologistId]);

    useEffect(() => {
        fetchSlots();
    }, [fetchSlots]);

    const columns = [
        {
            title: "Slot ID",
            dataIndex: "slotId",
            key: "slotId",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Availability",
            dataIndex: "availabilityStatus",
            key: "availabilityStatus",
            render: (status) => {
                let color;
                switch (status) {
                    case "AVAILABLE":
                        color = "green";
                        break;
                    case "BOOKED":
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
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record)}
                        disabled={actionLoading}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDelete(record.slotId)}
                        disabled={actionLoading || record.availabilityStatus === "BOOKED"}
                        loading={actionLoading}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (slot) => {
        setEditingSlot(slot);
        try {
            let start, end;
            if (slot.time && slot.time !== "N/A") {
                [start, end] = slot.time.split(' - ');
            } else {
                start = '00:00';
                end = '00:00';
            }
            form.setFieldsValue({
                date: slot.date && slot.date !== "N/A" ? moment(slot.date, 'DD-MM-YYYY') : null,
                time: [
                    start ? moment(start, 'HH:mm') : moment('00:00', 'HH:mm'),
                    end ? moment(end, 'HH:mm') : moment('00:00', 'HH:mm'),
                ],
            });
        } catch (error) {
            console.error("Error setting form values:", error);
            toast.error("Failed to load slot data for editing");
            form.setFieldsValue({
                date: null,
                time: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
            });
        }
        setOpen(true);
    };

    const handleDelete = useCallback((slotId) => {
        const slot = slots.find((s) => s.slotId === slotId);
        if (slot.availabilityStatus === "BOOKED") {
            toast.error("Cannot delete a booked slot");
            return;
        }

        Modal.confirm({
            title: 'Are you sure you want to delete this slot?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                setActionLoading(true);
                try {
                    await deleteSlot(psychologistId, slotId);
                    toast.success("Slot deleted successfully");
                    fetchSlots();
                } catch (error) {
                    console.error("Error deleting slot:", error);
                    toast.error("Failed to delete slot.");
                } finally {
                    setActionLoading(false);
                }
            },
        });
    }, [psychologistId, slots, fetchSlots]);

    const handleSubmit = useCallback(async (formValues) => {
        const startTimeMoment = formValues.time[0];
        const endTimeMoment = formValues.time[1];

        // Kiểm tra thời gian bắt đầu phải trước thời gian kết thúc
        if (startTimeMoment >= endTimeMoment) {
            toast.error("Start time must be before end time");
            return;
        }

        // Kiểm tra thời gian không vượt quá 2 giờ
        const duration = (endTimeMoment.valueOf() - startTimeMoment.valueOf()) / (1000 * 60);
        if (duration > 120) {
            toast.error("Slot duration cannot exceed 2 hours");
            return;
        }

        setActionLoading(true);
        try {
            if (editingSlot && editingSlot.slotId) {
                if (editingSlot.availabilityStatus === "BOOKED") {
                    toast.error("Cannot update a booked slot");
                    return;
                }
                await updateSlot(
                    {
                        date: formValues.date.format('DD-MM-YYYY'),
                        startTime: startTimeMoment.format('HH:mm'),
                        endTime: endTimeMoment.format('HH:mm'),
                        psychologistId,
                    },
                    editingSlot.slotId
                );
                toast.success("Slot updated successfully");
                setEditingSlot(null);
            } else {
                await createSlot({
                    date: formValues.date.format('DD-MM-YYYY'),
                    startTime: startTimeMoment.format('HH:mm'),
                    endTime: endTimeMoment.format('HH:mm'),
                    psychologistId,
                });
                toast.success("Slot created successfully");
            }
            setOpen(false);
            form.resetFields();
            fetchSlots();
        } catch (error) {
            console.error("Error creating/updating slot:", error);
            toast.error("Failed to create/update slot.");
        } finally {
            setActionLoading(false);
        }
    }, [psychologistId, editingSlot, fetchSlots, form]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Title level={2} className="mb-8 text-center">
                Manage Psychologist Slots
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
                onClick={() => { setOpen(true); setEditingSlot(null); form.resetFields(); }}
                className="mb-4"
                disabled={actionLoading}
            >
                Create New Slot
            </Button>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin tip="Loading slots..." size="large" />
                </div>
            ) : (
                <Table
                    dataSource={slots}
                    columns={columns}
                    rowKey="slotId"
                    className="shadow-md rounded-lg"
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: "No slots found." }}
                />
            )}

            {/* Modal for Create/Edit Slot */}
            <Modal
                title={editingSlot ? "Edit Slot" : "Create Slot"}
                open={open}
                onCancel={() => { setOpen(false); setEditingSlot(null); form.resetFields(); }}
                onOk={() => form.submit()}
                okButtonProps={{ loading: actionLoading }}
                cancelButtonProps={{ disabled: actionLoading }}
                centered
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: "Date is required" }]}
                    >
                        <DatePicker
                            format="DD-MM-YYYY"
                            disabledDate={(current) => current && current < moment().startOf('day')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        name="time"
                        rules={[{ required: true, message: "Time is required" }]}
                    >
                        <TimePicker.RangePicker
                            format="HH:mm"
                            minuteStep={15}
                            getPopupContainer={trigger => trigger.parentElement}
                            popupClassName="disable-auto-scroll-picker"
                            disabled={actionLoading}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PsychologistSlot;