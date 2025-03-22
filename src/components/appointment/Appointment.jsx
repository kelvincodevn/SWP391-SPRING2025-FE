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

  // Function to convert date format from YYYY-MM-DD to DD/MM/YYYY
  const formatDateToDisplay = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    if (!amount) return "0đ";
    return amount.toLocaleString("vi-VN") + "đ";
  };

  useEffect(() => {
    const fetchPsychologists = async () => {
      const data = await getAllPsychologists();
      setPsychologists(data);
    };
    fetchPsychologists();
  }, []);

  const handlePsychologistSelect = async (psychologist) => {
    // Add fee to selectedPsychologist
    const psychologistWithFee = {
      ...psychologist,
      fee: psychologist.userDetail?.fee || 150000, // Get fee from userDetail, default to 0 if not available
    };
    setSelectedPsychologist(psychologistWithFee);
    setSelectedDate(""); // Reset date when selecting a new psychologist
    setSelectedTime(null); // Reset time

    const slots = await getPsychologistSlots(psychologist.userID);
    // Map data from API to availableSlots array
    const normalizedSlots = slots.map((slot) => ({
      id: slot.slotId,
      date: slot.availableDate, // Keep YYYY-MM-DD format for comparison
      time: `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`, // Remove seconds, keep HH:mm
    }));
    setAvailableSlots(normalizedSlots);
    console.log("Available slots:", normalizedSlots); // Debug log
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value; // YYYY-MM-DD format
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
        fee: selectedPsychologist.fee, // Pass fee to appointmentform page
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
            {psychologist.fullName}
          </button>
        ))}
      </div>
      {selectedPsychologist && (
        <>
          <div className="flex items-center space-x-4 mb-4">
            <div>
              <h3 className="text-2xl font-semibold">{selectedPsychologist.fullName}</h3>
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
            {/* Display selected date in DD/MM/YYYY format */}
            {selectedDate && (
              <p className="mt-2 text-gray-600">
                Selected Date: {formatDateToDisplay(selectedDate)}
              </p>
            )}
          </div>
          {selectedDate && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Examination Schedule</h3>
              {availableSlots.filter((slot) => slot.date === selectedDate).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <h3 className="text-lg font-semibold">Price</h3>
                <p className="text-gray-600">{formatCurrency(selectedPsychologist.fee)}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Book Appointment
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