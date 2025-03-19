// // import React, { useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { checkPaymentSuccess } from "../../services/api.payment";

// // const PaymentCallback = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const searchParams = new URLSearchParams(location.search);
// //   const bookingId = searchParams.get("vnp_TxnRef")?.split("_")[0];

// //   useEffect(() => {
// //     const handleCallback = async () => {
// //       if (bookingId) {
// //         const paymentData = await checkPaymentSuccess(parseInt(bookingId));
// //         if (paymentData) {
// //           navigate("/payment-success", { state: paymentData });
// //         } else {
// //           navigate("/user/booking");
// //         }
// //       }
// //     };
// //     handleCallback();
// //   }, [bookingId, navigate]);

// //   return <div>Processing payment... Please wait.</div>;
// // };

// // export default PaymentCallback;

// import React, { useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { checkPaymentSuccess } from "../../services/api.payment";
// import { toast } from "react-toastify";

// function PaymentCallback() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const bookingId = searchParams.get("bookingId");
//       const vnpResponseCode = searchParams.get("vnp_ResponseCode");

//       if (vnpResponseCode === "00") {
//         const result = await checkPaymentSuccess(bookingId);
//         if (result) {
//           toast.success("Payment successful!");
//           navigate("/payment-success", {
//             state: {
//               bookingId,
//               amount: "150,000",
//               date: result.date, // Giả định backend trả về
//               time: result.time,
//               psychologistName: result.psychologistName,
//             },
//           });
//         }
//       } else {
//         toast.error("Payment failed. Please try again.");
//         navigate("/user-dashboard/bookings");
//       }
//     };
//     verifyPayment();
//   }, [searchParams, navigate]);

//   return <div>Processing payment...</div>;
// }

// export default PaymentCallback;

import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { handlePaymentCallback, checkPaymentSuccess } from "../../services/api.payment";
import { toast } from "react-toastify";

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const bookingId = searchParams.get("vnp_TxnRef")?.split("_")[0];
      const vnpResponseCode = searchParams.get("vnp_ResponseCode");

      if (!bookingId || !vnpResponseCode) {
        toast.error("Invalid payment data");
        navigate("/user/booking");
        return;
      }

      // Tạo params từ searchParams để gửi lên API callback
      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      // Gọi API callback để cập nhật trạng thái booking
      const callbackResult = await handlePaymentCallback(params);
      if (!callbackResult) {
        toast.error("Failed to process payment");
        navigate("/user/booking");
        return;
      }

      // Nếu thanh toán thành công, gọi API success để lấy thông tin booking
      if (vnpResponseCode === "00") {
        const paymentData = await checkPaymentSuccess(bookingId);
        if (paymentData) {
          toast.success("Payment successful!");
          navigate("/payment-success", {
            state: {
              bookingId: paymentData.bookingId,
              amount: paymentData.amount,
              date: paymentData.date,
              time: paymentData.time,
              psychologistName: paymentData.psychologistName,
            },
          });
        } else {
          toast.error("Failed to fetch payment details");
          navigate("/user/booking");
        }
      } else {
        toast.error("Payment failed. Please try again.");
        navigate("/user/booking");
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return <div>Processing payment...</div>;
}

export default PaymentCallback;