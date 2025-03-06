import React, { useState } from "react";

const doctor = {
  name: "Tiến sĩ, Bác sĩ Nguyễn Văn Doanh",
  img: "src/assets/doctor.jpg", // Ensure the correct image path
  location: "Hà Nội",
  title: "Trưởng khoa Khám bệnh, Bệnh viện Đa khoa Quốc tế Thu Cúc",
  experience: "Bác sĩ có 40 năm kinh nghiệm làm việc chuyên khoa Nội Thần kinh",
  patientAge: "Bác sĩ khám cho người bệnh từ 16 tuổi trở lên",
  schedule: {
    "Thứ 2 - 4/3": ["09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30"],
    "Thứ 3 - 5/3": ["10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00"],
    "Thứ 4 - 6/3": ["13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00"],
  },
  locationDetail: "Hệ thống Y tế Thu Cúc cơ sở Thụy Khuê, 286 Thụy Khuê, Tây Hồ, Hà Nội",
  price: "150.000đ",
};

function Appointment() {
  const [selectedDate, setSelectedDate] = useState(Object.keys(doctor.schedule)[0]);
  const [selectedSlot, setSelectedSlot] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={doctor.img}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-blue-600">{doctor.name}</h2>
          <p className="text-gray-700">{doctor.title}</p>
          <p className="text-gray-600">{doctor.experience}</p>
          <p className="text-gray-500">{doctor.patientAge}</p>
          <p className="text-gray-600 flex items-center mt-2">📍 {doctor.location}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6">🗓 Chọn ngày</h3>
      <select
        className="w-full mt-2 p-2 border rounded-md"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setSelectedSlot("");
        }}
      >
        {Object.keys(doctor.schedule).map((date, index) => (
          <option key={index} value={date}>{date}</option>
        ))}
      </select>

      <h3 className="text-lg font-semibold mt-6">🗓 Lịch khám ({selectedDate})</h3>
      <div className="grid grid-cols-3 gap-3 mt-3">
        {doctor.schedule[selectedDate].map((time, index) => (
          <button
            key={index}
            onClick={() => setSelectedSlot(time)}
            className={`py-2 px-3 border rounded-md text-center ${
              selectedSlot === time ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {selectedSlot && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold">Thông tin đặt lịch</h3>
          <p><strong>Bác sĩ:</strong> {doctor.name}</p>
          <p><strong>Ngày:</strong> {selectedDate}</p>
          <p><strong>Thời gian:</strong> {selectedSlot}</p>
          <p><strong>Địa điểm:</strong> {doctor.locationDetail}</p>
          <p><strong>Giá khám:</strong> {doctor.price}</p>
          <button
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Xác nhận đặt lịch
          </button>
        </div>
      )}
    </div>
  );
}

export default Appointment;
