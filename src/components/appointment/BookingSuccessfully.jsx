import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingSuccessfully = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ location.state
  const { formData = {}, psychologist, slotId, date, time, fee } = location.state || {};

  // Kiểm tra dữ liệu
  if (!formData || !psychologist || !slotId || !date || !time) {
    toast.error("Booking information is missing. Please try again.");
    navigate("/confirmation");
    return null;
  }

  // Hàm điều hướng
  const handleCheckBooking = () => {
    navigate("/user-dashboard"); // Navigate đến trang dashboard để xem danh sách booking
  };

  const handleBackToHome = () => {
    navigate("/home"); // Navigate về trang chủ
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        {/* Icon thành công */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 rounded-full p-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Successfully
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for booking, your booking has been placed successfully.
        </p>

        {/* Thông tin booking */}
        <div className="space-y-4 text-left">
          {/* Thông tin Psychologist */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Psychologist Information
            </h2>
            <p>
              <strong>Name:</strong> {psychologist?.fullName || "N/A"}
            </p>
            <p>
              <strong>Major:</strong> {psychologist.userDetail?.major || "N/A"}
            </p>
            <p>
              <strong>Degree:</strong> {psychologist.userDetail?.degree || "N/A"}
            </p>
            <p>
              <strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}
            </p>
          </div>

          {/* Thông tin khách hàng */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Customer Information
            </h2>
            <p>
              <strong>Name:</strong>{" "}
              {formData.isForSelf ? formData.patientName : formData.otherPatientName}
            </p>
            <p>
              <strong>Phone Number:</strong> {formData.phoneNumber || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {formData.email || "N/A"}
            </p>
          </div>

          {/* Thông tin slot */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-700">Slot Information</h2>
            <p>
              <strong>Date:</strong> {date || "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {time || "N/A"}
            </p>
          </div>

          {/* Phí dịch vụ */}
          <div className="border-t pt-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
            <span className="text-gray-700 font-medium">Consultation Fee</span>
            <span className="text-lg font-semibold text-gray-800">
              {fee ? `${fee.toLocaleString("vi-VN")} VND` : "150,000 VND"}
            </span>
          </div>
        </div>

        {/* Nút điều hướng */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleCheckBooking}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Check Booking
          </button>
          <button
            onClick={handleBackToHome}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessfully;