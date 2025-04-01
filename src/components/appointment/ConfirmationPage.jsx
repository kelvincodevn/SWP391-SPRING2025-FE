// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createBooking } from "../../services/api.booking";

// const ConfirmationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { formData = {}, psychologist, slotId, date, time, fee } = location.state || {};
//   const userId = localStorage.getItem("userID");

//   const handleConfirm = async () => {
//     // Kiểm tra userId
//     if (!userId || userId === "null") {
//       toast.error("User not logged in. Please log in to continue.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const bookingRequest = {
//         slotId: slotId,
//         fullName: formData.isForSelf ? formData.patientName : formData.otherPatientName,
//         gender: formData.gender,
//         phoneNumber: formData.phoneNumber,
//         email: formData.email,
//         dob: formData.dob
//           ? new Date(formData.dob).toLocaleDateString("en-GB", {
//               day: "2-digit",
//               month: "2-digit",
//               year: "numeric",
//             }).replace(/\//g, "-")
//           : "",
//         reason: formData.reason || "Consultation",
//         fee: fee || 150000.0,
//       };
//       console.log("userId:", userId);
//       console.log("Booking Request:", bookingRequest);
//       const booking = await createBooking(userId, bookingRequest);
//       if (booking) {
//         toast.success("Booking created successfully!");
//         // Navigate đến BookingSuccessfully thay vì Payment
//         navigate("/booking-successfully", {
//           state: {
//             formData,
//             psychologist,
//             slotId,
//             date,
//             time,
//             fee,
//           },
//         });
//       }
//     } catch (error) {
//       toast.error(`Failed to create booking: ${error.response?.data?.error || error.message}`);
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Appointment Confirmation</h2>
//       {psychologist && (
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Psychologist Information</h3>
//           <p><strong>Name:</strong> {psychologist.fullName || "N/A"}</p>
//           <p><strong>Major:</strong> {psychologist.userDetail?.major || "N/A"}</p>
//           <p><strong>Degree:</strong> {psychologist.userDetail?.degree || "N/A"}</p>
//           <p><strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}</p>
//         </div>
//       )}
//       {date && time && (
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Appointment Date and Time</h3>
//           <p><strong>Date:</strong> {date}</p>
//           <p><strong>Time:</strong> {time}</p>
//         </div>
//       )}
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Patient Information</h3>
//         <p><strong>Name:</strong> {formData.isForSelf ? formData.patientName : formData.otherPatientName}</p>
//         <p><strong>Gender:</strong> {formData.gender}</p>
//         <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
//         <p><strong>Email:</strong> {formData.email}</p>
//         <p><strong>Date of Birth:</strong> {formData.dob}</p>
//         <p><strong>Reason for Booking:</strong> {formData.reason || "Not provided"}</p>
//       </div>
//       {!formData.isForSelf && (
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Relation to the Person</h3>
//           <p><strong>Relation:</strong> {formData.relation}</p>
//         </div>
//       )}
//       <div className="mb-6">
//         <span className="text-xl font-medium text-orange-600">
//           Consultation Fee: {fee ? `${fee.toLocaleString("vi-VN")}đ` : "150,000đ"}
//         </span>
//       </div>
//       <button
//         onClick={handleConfirm}
//         className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//       >
//         Confirm Appointment
//       </button>
//     </div>
//   );
// };

// export default ConfirmationPage;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../services/api.booking";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData = {}, psychologist, slotId, date, time, fee } = location.state || {};
  const userId = localStorage.getItem("userID");

  const handleConfirm = async () => {
    if (!userId || userId === "null") {
      toast.error("User not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    try {
      const bookingRequest = {
        slotId: slotId,
        fullName: formData.isForSelf ? formData.patientName : formData.otherPatientName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        dob: formData.dob
          ? new Date(formData.dob)
              .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
              .replace(/\//g, "-")
          : "",
        reason: formData.reason || "Consultation",
        fee: fee || 150000.0,
      };
      const booking = await createBooking(userId, bookingRequest);
      if (booking) {
        toast.success("Booking created successfully!");
        navigate("/booking-successfully", {
          state: {
            formData,
            psychologist,
            slotId,
            date,
            time,
            fee,
          },
        });
      }
    } catch (error) {
      toast.error(`Failed to create booking: ${error.response?.data?.error || error.message}`);
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Appointment Confirmation</h2>
      {psychologist && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Psychologist Information</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong>Name:</strong> {psychologist.fullName || "N/A"}</p>
            <p><strong>Major:</strong> {psychologist.userDetail?.major || "N/A"}</p>
            <p><strong>Degree:</strong> {psychologist.userDetail?.degree || "N/A"}</p>
            <p><strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}</p>
          </div>
        </div>
      )}
      {date && time && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Appointment Date and Time</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
          </div>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
        <div className="bg-gray-100 p-4 rounded-md">
          <p><strong>Name:</strong> {formData.isForSelf ? formData.patientName : formData.otherPatientName}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Email:</strong> {formData.email || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Reason for Booking:</strong> {formData.reason || "Not provided"}</p>
        </div>
      </div>
      {!formData.isForSelf && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Relation to the Person</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong>Relation:</strong> {formData.relation}</p>
          </div>
        </div>
      )}
      <div className="mb-6">
        <span className="text-xl font-medium text-orange-600">
          Consultation Fee: {fee ? `${fee.toLocaleString("vi-VN")} VND` : "150,000 VND"}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;