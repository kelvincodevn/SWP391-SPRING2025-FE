import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const availableTimes = [
  { time: "08:00 - 08:30", id: 1 },
  { time: "09:00 - 09:30", id: 2 },
  { time: "09:30 - 10:00", id: 3 },
  { time: "10:00 - 10:30", id: 4 },
  { time: "10:30 - 11:00", id: 5 },
  { time: "11:00 - 11:30", id: 6 },
  { time: "11:30 - 12:00", id: 7 },
  { time: "13:30 - 14:00", id: 8 },
  { time: "14:00 - 14:30", id: 9 },
  { time: "14:30 - 15:00", id: 10 },
];

// Define the psychologists
const psychologists = [
  {
    name: "Psychologist : Nguyen Thi Kim",
    specialty: "Psychologist",
    hospital: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
    experience: "40 năm",
    location: "Hà Nội",
    id: 1,
    image: "src/assests1/Psychologist/nguyenthikim.jpg",
  },
  {
    name: "Psychologist : Nguyen Thi Tham",
    specialty: "Cardiologist",
    hospital: "Bệnh viện Hữu Nghị Việt Xô",
    experience: "35 năm",
    location: "Hà Nội",
    id: 2,
    image: "src/assests1/Psychologist/nguyen thi tham. jpg.jpg",
  },
  {
    name: "Psychologist : Than Thi Man",
    specialty: "Pediatrician",
    hospital: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
    experience: "20 năm",
    location: "Hà Nội",
    id: 3,
    image: "src/assests1/Psychologist/Than-Thi-Man-500x592-1.jpg",
  },
  {
    name: "Psychologist : Nguyen Viet Chung",
    specialty: "Neurologist",
    hospital: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
    experience: "10 năm",
    location: "Hà Nội",
    id: 4,
    image: "src/assests1/Psychologist/1d7e7012c3053a5b6314_6680.jpg",
  },
  {
    name: "Psychologist : Tran Dang Hung",
    specialty: "Dermatologist",
    hospital: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
    experience: "15 năm",
    location: "Hà Nội",
    id: 5,
    image: "src/assests1/Psychologist/ThS.-Tran-Dang-Hung.jpg",
  },
];

function AppointmentTest() {
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [disabledTimes, setDisabledTimes] = useState([]);

  const currentDate = new Date();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime(null);
    updateDisabledTimes(e.target.value);
  };

  const updateDisabledTimes = (date) => {
    const disabled = [];
    if (date === formatDate(currentDate)) {
      // Current day, check time slots
      availableTimes.forEach((slot) => {
        const [startHour, startMinute] = slot.time.split(" - ")[0].split(":");
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        
        if (parseInt(startHour) < currentHour || (parseInt(startHour) === currentHour && parseInt(startMinute) <= currentMinute)) {
          disabled.push(slot.id);
        }
      });
    }
    setDisabledTimes(disabled);
  };

  const handleTimeClick = (time) => {
    if (!disabledTimes.includes(time.id)) {
      setSelectedTime(time.time);
    }
  };

  const handleBooking = () => {
    // Pass selected data to the next page
    navigate("/appointmentform", {
      state: {
        psychologist: selectedPsychologist,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  useEffect(() => {
    if (selectedDate) {
      updateDisabledTimes(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Choose Psychologist</h2>

      {/* Select Psychologist */}
      <div className="mb-6 text-center">
        {psychologists.map((psychologist) => (
          <button
            key={psychologist.id}
            onClick={() => setSelectedPsychologist(psychologist)}
            className="p-2 bg-blue-500 text-white rounded-md mx-2 mb-4"
          >
            {psychologist.name}
          </button>
        ))}
      </div>

      {selectedPsychologist && (
        <>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={selectedPsychologist.image}
              alt="Doctor"
              className="w-24 h-24 rounded-full border"
            />
            <div>
              <h3 className="text-2xl font-semibold">{selectedPsychologist.name}</h3>
              <p className="text-gray-600">{selectedPsychologist.specialty}</p>
              <p className="text-gray-600">{selectedPsychologist.hospital}</p>
              <p className="text-gray-600">Experience: {selectedPsychologist.experience}</p>
              <p className="text-gray-600">{selectedPsychologist.location}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Choose Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={formatDate(currentDate)}
              className="border rounded-md p-2"
            />
          </div>

          {selectedDate && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Examination Schedule</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableTimes.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeClick(slot)}
                    className={`p-2 border rounded-md text-center ${
                      selectedTime === slot.time
                        ? "bg-blue-500 text-white"
                        : disabledTimes.includes(slot.id)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-white text-gray-800"
                    }`}
                    disabled={disabledTimes.includes(slot.id)}
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
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-600">Hệ thống Y tế Thu Cúc, 286 Thụy Khuê, Hà Nội</p>
              </div>

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

export default AppointmentTest;