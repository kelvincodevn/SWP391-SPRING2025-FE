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
                        disabled={actionLoading || record.availabilityStatus === "BOOKED"} // Thêm điều kiện disable
                        loading={actionLoading}
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
                    // toast.success("Slot deleted successfully");
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
        const selectedDate = formValues.date;
    
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
    
        // Kiểm tra slot không nằm trong quá khứ
        const now = moment(); // Thời gian hiện tại
        const selectedDateTime = moment(
            `${selectedDate.format('YYYY-MM-DD')} ${startTimeMoment.format('HH:mm')}`,
            'YYYY-MM-DD HH:mm'
        );
    
        if (selectedDateTime.isBefore(now)) {
            toast.error("Cannot create a slot in the past");
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
                setEditingSlot(null);
            } else {
                await createSlot({
                    date: formValues.date.format('DD-MM-YYYY'),
                    startTime: startTimeMoment.format('HH:mm'),
                    endTime: endTimeMoment.format('HH:mm'),
                    psychologistId,
                });
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
                    {/* <Form.Item
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
                    </Form.Item> */}

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
                            disabledTime={(current) => {
                                const selectedDate = form.getFieldValue('date');
                                const isToday = selectedDate && moment().isSame(selectedDate, 'day');
                                if (!isToday) return {};

                                const now = moment();
                                return {
                                    disabledHours: () => {
                                        const hours = [];
                                        for (let i = 0; i < now.hour(); i++) {
                                            hours.push(i);
                                        }
                                        return hours;
                                    },
                                    disabledMinutes: (selectedHour) => {
                                        if (selectedHour === now.hour()) {
                                            const minutes = [];
                                            for (let i = 0; i < now.minute(); i++) {
                                                minutes.push(i);
                                            }
                                            return minutes;
                                        }
                                        return [];
                                    },
                                };
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PsychologistSlot;