import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPsychologists, getPsychologistSlots } from "../../services/api.psychologist";

function Appointment() {
    const [psychologists, setPsychologists] = useState([]);
    const [selectedPsychologist, setSelectedPsychologist] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPsychologists = async () => {
            const data = await getAllPsychologists();
            setPsychologists(data);
        };
        fetchPsychologists();
    }, []);

    const handlePsychologistSelect = async (psychologist) => {
        setSelectedPsychologist(psychologist);
        const slots = await getPsychologistSlots(psychologist.userID);
        setAvailableSlots(slots.map(slot => ({
            id: slot.psychologistSlotId,
            date: slot.slot.date,
            time: `${slot.slot.startTime} - ${slot.slot.endTime}`,
        })));
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setSelectedTime(null);
    };

    const handleTimeClick = (slot) => {
        if (slot.date === selectedDate) {
            setSelectedTime(slot.time);
        }
    };

    const handleBooking = () => {
        const selectedSlot = availableSlots.find(slot => slot.date === selectedDate && slot.time === selectedTime);
        if (!selectedSlot) {
            alert("Please select a valid slot");
            return;
        }
        navigate("/appointmentform", {
            state: {
                psychologist: selectedPsychologist,
                slotId: selectedSlot.id,
                date: selectedDate,
                time: selectedTime,
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Choose Psychologist</h2>

            <div className="mb-6 text-center">
                {psychologists.map((psychologist) => (
                    <button
                        key={psychologist.userID}
                        onClick={() => handlePsychologistSelect(psychologist)}
                        className="p-2 bg-blue-500 text-white rounded-md mx-2 mb-4"
                    >
                        {psychologist.user.fullName}
                    </button>
                ))}
            </div>

            {selectedPsychologist && (
                <>
                    <div className="flex items-center space-x-4 mb-4">
                        <div>
                            <h3 className="text-2xl font-semibold">{selectedPsychologist.user.fullName}</h3>
                            <p className="text-gray-600">{selectedPsychologist.major}</p>
                            <p className="text-gray-600">{selectedPsychologist.degree}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Choose Date</h3>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="border rounded-md p-2"
                        />
                    </div>

                    {selectedDate && (
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Examination Schedule</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {availableSlots
                                    .filter(slot => slot.date === selectedDate)
                                    .map((slot) => (
                                        <button
                                            key={slot.id}
                                            onClick={() => handleTimeClick(slot)}
                                            className={`p-2 border rounded-md text-center ${
                                                selectedTime === slot.time
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-white text-gray-800"
                                            }`}
                                        >
                                            {slot.time}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    {selectedTime && (
                        <>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold">Price</h3>
                                <p className="text-gray-600">150.000đ</p>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleBooking}
                                    className="w-full bg-blue-500 text-white py-2 rounded-md"
                                >
                                    Booking
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Appointment;