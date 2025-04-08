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

  // Function to format currency
  const formatCurrency = (amount) => {
    if (!amount) return "0 VND";
    return amount.toLocaleString("vi-VN") + " VND";
  };

  useEffect(() => {
    const fetchPsychologists = async () => {
      const data = await getAllPsychologists();
      setPsychologists(data);
    };
    fetchPsychologists();
  }, []);

  const handlePsychologistSelect = async (psychologist) => {
    const psychologistWithFee = {
      ...psychologist,
      fee: psychologist.userDetail?.fee || 150000,
    };
    setSelectedPsychologist(psychologistWithFee);
    setSelectedDate("");
    setSelectedTime(null);

    const slots = await getPsychologistSlots(psychologist.userID);
    const normalizedSlots = slots.map((slot) => ({
      id: slot.slotId,
      date: slot.availableDate,
      time: `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`,
    }));
    setAvailableSlots(normalizedSlots);
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    setSelectedTime(null);
  };

  const handleTimeClick = (slot) => {
    if (slot.date === selectedDate) {
      setSelectedTime(slot.time);
    }
  };

  const handleBooking = () => {
    const selectedSlot = availableSlots.find(
      (slot) => slot.date === selectedDate && slot.time === selectedTime
    );
    if (!selectedSlot) {
      alert("Please select a valid time slot");
      return;
    }
    navigate("/appointmentform", {
      state: {
        psychologist: selectedPsychologist,
        slotId: selectedSlot.id,
        date: selectedDate,
        time: selectedTime,
        fee: selectedPsychologist.fee,
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Choose a Psychologist</h2>

      {/* Danh sách psychologists */}
      {!selectedPsychologist ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {psychologists.map((psychologist) => (
            <div
              key={psychologist.userID}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{psychologist.fullName}</h3>
                <p className="text-gray-600">{psychologist.major || "Psychologist"}</p>
              </div>
              <p className="text-gray-600 mb-2">
                <strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Fee:</strong> {formatCurrency(psychologist.userDetail?.fee)}
              </p>
              <button
                onClick={() => handlePsychologistSelect(psychologist)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={() => setSelectedPsychologist(null)}
            className="text-blue-500 mb-4 hover:underline"
          >
            Back to List
          </button>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">{selectedPsychologist.fullName}</h3>
            <p className="text-gray-600">{selectedPsychologist.major || "Psychologist"}</p>
            <p className="text-gray-600">
              <strong>Workplace:</strong> {selectedPsychologist.userDetail?.workplace || "N/A"}
            </p>
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
              <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
              {availableSlots.filter((slot) => slot.date === selectedDate).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableSlots
                    .filter((slot) => slot.date === selectedDate)
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
              ) : (
                <p className="text-gray-600">No available slots for this date.</p>
              )}
            </div>
          )}
          {selectedTime && (
            <>
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Consultation Fee</h3>
                <p className="text-gray-600">{formatCurrency(selectedPsychologist.fee)}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Book Appointment
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Appointment;