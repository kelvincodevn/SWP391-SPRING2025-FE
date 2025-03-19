// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { createPayment } from "../../services/api.payment";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { slotId, date, time, psychologist } = location.state || {};
//   const bookingId = slotId; // Giả sử bookingId tạm thời là slotId, cần tạo booking trước khi thanh toán

//   const handlePayment = async () => {
//     const paymentUrl = await createPayment(bookingId);
//     if (paymentUrl) {
//       window.location.href = paymentUrl; // Redirect đến VNPay
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
//       <h2 className="text-2xl font-semibold mb-4">Payment</h2>
//       <p><strong>Psychologist:</strong> {psychologist?.user.fullName}</p>
//       <p><strong>Date:</strong> {date}</p>
//       <p><strong>Time:</strong> {time}</p>
//       <p><strong>Amount:</strong> 150,000 VND</p>
//       <button
//         onClick={handlePayment}
//         className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// export default Payment;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment } from "../../services/api.payment.js";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ location.state, mặc định là object rỗng nếu không có
  const { bookingId, date, time, psychologist, fee } = location.state || {};

  // Kiểm tra nếu bookingId không tồn tại
  if (!bookingId) {
    toast.error("Booking ID is missing. Please go back and try again.");
    navigate("/confirmation"); // Quay lại trang xác nhận nếu thiếu bookingId
    return null; // Tránh render nội dung không cần thiết
  }

  const handlePayment = async () => {
    try {
      const paymentUrl = await createPayment(bookingId);
      if (paymentUrl) {
        window.location.href = paymentUrl; // Redirect đến VNPay
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      toast.error(`Payment initiation failed: ${error.message}`);
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Payment</h2>
      <div className="space-y-4">
        <p>
          <strong>Psychologist:</strong>{" "}
          {psychologist?.fullName || psychologist?.user?.fullName || "N/A"}
        </p>
        <p>
          <strong>Date:</strong> {date || "N/A"}
        </p>
        <p>
          <strong>Time:</strong> {time || "N/A"}
        </p>
        <p>
          <strong>Amount:</strong> {fee || "N/A"}
        </p>
      </div>
      <button
        onClick={handlePayment}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        disabled={!bookingId} // Vô hiệu hóa nút nếu không có bookingId
      >
        Proceed to Payment
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
      >
        Back
      </button>
    </div>
  );
};

export default Payment;