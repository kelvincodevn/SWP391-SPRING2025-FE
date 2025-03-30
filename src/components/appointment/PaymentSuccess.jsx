// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingId, amount, date, time, psychologistName } = location.state || {};

//   if (!bookingId) {
//     return <div>Error: No payment data found!</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Payment Successful!</h2>
//       <div className="bg-green-100 p-6 rounded-lg mb-6">
//         <p className="text-lg text-gray-800"><strong>Booking ID:</strong> {bookingId}</p>
//         <p className="text-lg text-gray-800"><strong>Amount Paid:</strong> {amount || "150,000"} VND</p>
//         <p className="text-lg text-gray-800"><strong>Psychologist:</strong> {psychologistName || "N/A"}</p>
//         <p className="text-lg text-gray-800"><strong>Date:</strong> {date || "N/A"}</p>
//         <p className="text-lg text-gray-800"><strong>Time:</strong> {time || "N/A"}</p>
//       </div>
//       <div className="text-center">
//         <button
//           onClick={() => navigate("/user/booking")}
//           className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Check Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { checkPaymentSuccess } from "../../services/api.payment";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Lấy tham số từ query string
//   const queryParams = new URLSearchParams(location.search);
//   const bookingId = queryParams.get("bookingId");
//   const amount = queryParams.get("amount")
//     ? Number(queryParams.get("amount")) / 100 // Chuyển về VND
//     : null;
//   const date = queryParams.get("date");
//   const time = queryParams.get("time");
//   const psychologistName = queryParams.get("psychologistName");

//   useEffect(() => {
//     if (bookingId) {
//       // Gọi API để kiểm tra trạng thái thanh toán
//       checkPaymentSuccess(bookingId).then((data) => {
//         if (!data) {
//           navigate("/user/booking"); // Nếu không thành công, quay lại trang booking
//         }
//       });
//     }
//   }, [bookingId, navigate]);

//   if (!bookingId) {
//     return <div>Error: No payment data found!</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Payment Successful!</h2>
//       <div className="bg-green-100 p-6 rounded-lg mb-6">
//         <p className="text-lg text-gray-800">
//           <strong>Booking ID:</strong> {bookingId}
//         </p>
//         <p className="text-lg text-gray-800">
//           <strong>Amount Paid:</strong> {amount ? `${amount.toLocaleString("vi-VN")} VND` : "N/A"}
//         </p>
//         <p className="text-lg text-gray-800">
//           <strong>Psychologist:</strong> {psychologistName || "N/A"}
//         </p>
//         <p className="text-lg text-gray-800">
//           <strong>Date:</strong> {date || "N/A"}
//         </p>
//         <p className="text-lg text-gray-800">
//           <strong>Time:</strong> {time || "N/A"}
//         </p>
//       </div>
//       <div className="text-center">
//         <button
//           onClick={() => navigate("/user/booking")}
//           className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Check Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ state
  const { bookingId, amount, date, time, psychologistName } = location.state || {};

  if (!bookingId) {
    toast.error("No payment data found!");
    return <div>Error: No payment data found!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Payment Successful!</h2>
      <div className="bg-green-100 p-6 rounded-lg mb-6">
        <p className="text-lg text-gray-800">
          <strong>Booking ID:</strong> {bookingId}
        </p>
        <p className="text-lg text-gray-800">
          <strong>Amount Paid:</strong> {amount ? `${amount.toLocaleString("vi-VN")} VND` : "N/A"}
        </p>
        <p className="text-lg text-gray-800">
          <strong>Psychologist:</strong> {psychologistName || "N/A"}
        </p>
        <p className="text-lg text-gray-800">
          <strong>Date:</strong> {date || "N/A"}
        </p>
        <p className="text-lg text-gray-800">
          <strong>Time:</strong> {time || "N/A"}
        </p>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/student-dashboard/booking")}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Check Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;