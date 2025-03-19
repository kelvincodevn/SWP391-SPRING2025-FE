// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getUserProfile } from "../../services/api.user"; // Import hàm getUserProfile

// const AppointmentForm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { psychologist, slotId, date, time, fee } = location.state || {};

//   const [formData, setFormData] = useState({
//     patientName: "",
//     gender: "",
//     phoneNumber: "",
//     email: "",
//     dob: "",
//     isForSelf: true,
//     relation: "",
//     otherPatientName: "",
//     reason: "", // Thêm field reason
//   });

//   // Load user profile when component mounts
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const profile = await getUserProfile();
//       if (profile) {
//         setFormData((prevData) => ({
//           ...prevData,
//           patientName: profile.fullName || prevData.patientName,
//           gender: profile.gender || prevData.gender,
//           phoneNumber: profile.phone || prevData.phoneNumber,
//           email: profile.email || prevData.email,
//           dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : prevData.dob,
//         }));
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Giới hạn length của reason là 1000 ký tự
//     if (name === "reason" && value.length > 1000) return;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/confirmation", {
//       state: { formData, psychologist, slotId, date, time, fee },
//     });
//   };

//   // Format currency for display
//   const formatCurrency = (amount) => {
//     if (!amount) return "0đ";
//     return amount.toLocaleString("vi-VN") + "đ";
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Make an Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Psychologist Information</h3>
//           {psychologist && (
//             <div>
//               <p>
//                 <strong>Name:</strong> {psychologist.fullName || "N/A"}
//               </p>
//               <p>
//                 <strong>Major:</strong> {psychologist.major || "N/A"}
//               </p>
//               <p>
//                 <strong>Degree:</strong> {psychologist.degree || "N/A"}
//               </p>
//               <p>
//                 <strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mb-4">
//           <h3 className="text-lg font-semibold">Appointment Date and Time</h3>
//           {date && time && (
//             <div>
//               <p>
//                 <strong>Date:</strong> {date}
//               </p>
//               <p>
//                 <strong>Time:</strong> {time}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mb-4">
//           <div className="flex items-center mb-2">
//             <input
//               type="radio"
//               name="isForSelf"
//               checked={formData.isForSelf}
//               onChange={() => setFormData({ ...formData, isForSelf: true })}
//               className="mr-2"
//             />
//             <label>For Myself</label>
//             <input
//               type="radio"
//               name="isForSelf"
//               checked={!formData.isForSelf}
//               onChange={() => setFormData({ ...formData, isForSelf: false })}
//               className="ml-4 mr-2"
//             />
//             <label>For Someone Else</label>
//           </div>
//         </div>

//         {!formData.isForSelf && (
//           <div className="mb-4">
//             <label htmlFor="otherPatientName" className="block text-sm font-medium">
//               Name of Person Being Registered For
//             </label>
//             <input
//               type="text"
//               id="otherPatientName"
//               name="otherPatientName"
//               value={formData.otherPatientName}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//         )}

//         {!formData.isForSelf && (
//           <div className="mb-4">
//             <label htmlFor="relation" className="block text-sm font-medium">
//               Your Relation to the Person
//             </label>
//             <input
//               type="text"
//               id="relation"
//               name="relation"
//               value={formData.relation}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//         )}

//         {formData.isForSelf && (
//           <div className="mb-4">
//             <label htmlFor="patientName" className="block text-sm font-medium">
//               Patient's Name
//             </label>
//             <input
//               type="text"
//               id="patientName"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Gender</label>
//           <div className="flex">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={formData.gender === "Male"}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Male
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={formData.gender === "Female"}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Female
//             </label>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="phoneNumber" className="block text-sm font-medium">
//             Contact Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="dob" className="block text-sm font-medium">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="reason" className="block text-sm font-medium">
//             Reason for Booking (Max 1000 characters)
//           </label>
//           <textarea
//             id="reason"
//             name="reason"
//             value={formData.reason}
//             onChange={handleChange}
//             maxLength={1000} // Giới hạn 1000 ký tự
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//             placeholder="Enter the reason for booking..."
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             {formData.reason.length}/1000 characters
//           </p>
//         </div>

//         <div className="mb-6">
//           <span className="text-xl font-medium text-orange-600">
//             Consultation Fee: {formatCurrency(fee)}
//           </span>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//         >
//           Confirm Appointment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AppointmentForm;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/api.user";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { psychologist, slotId, date, time, fee } = location.state || {};

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    dob: "",
    isForSelf: true,
    relation: "",
    otherPatientName: "",
    reason: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setFormData((prevData) => ({
          ...prevData,
          patientName: profile.fullName || prevData.patientName,
          gender: profile.gender || prevData.gender,
          phoneNumber: profile.phone || prevData.phoneNumber,
          email: profile.email || prevData.email,
          dob: profile.dob ? new Date(profile.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-") : prevData.dob,
        }));
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "reason" && value.length > 1000) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: { formData, psychologist, slotId, date, time, fee },
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0đ";
    return amount.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Make an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Psychologist Information</h3>
          {psychologist && (
            <div>
              <p><strong>Name:</strong> {psychologist.fullName || "N/A"}</p>
              <p><strong>Major:</strong> {psychologist.major || "N/A"}</p>
              <p><strong>Degree:</strong> {psychologist.degree || "N/A"}</p>
              <p><strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Appointment Date and Time</h3>
          {date && time && (
            <div>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="isForSelf"
              checked={formData.isForSelf}
              onChange={() => setFormData({ ...formData, isForSelf: true })}
              className="mr-2"
            />
            <label>For Myself</label>
            <input
              type="radio"
              name="isForSelf"
              checked={!formData.isForSelf}
              onChange={() => setFormData({ ...formData, isForSelf: false })}
              className="ml-4 mr-2"
            />
            <label>For Someone Else</label>
          </div>
        </div>

        {!formData.isForSelf && (
          <div className="mb-4">
            <label htmlFor="otherPatientName" className="block text-sm font-medium">
              Name of Person Being Registered For
            </label>
            <input
              type="text"
              id="otherPatientName"
              name="otherPatientName"
              value={formData.otherPatientName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        {!formData.isForSelf && (
          <div className="mb-4">
            <label htmlFor="relation" className="block text-sm font-medium">
              Your Relation to the Person
            </label>
            <input
              type="text"
              id="relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        {formData.isForSelf && (
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-sm font-medium">
              Patient's Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium">Gender</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium">
            Contact Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium">
            Reason for Booking (Max 1000 characters)
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            maxLength={1000}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter the reason for booking..."
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.reason.length}/1000 characters
          </p>
        </div>

        <div className="mb-6">
          <span className="text-xl font-medium text-orange-600">
            Consultation Fee: {formatCurrency(fee)}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;