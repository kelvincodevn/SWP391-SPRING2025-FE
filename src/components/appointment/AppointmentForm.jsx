import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/api.user";
import { toast } from "react-toastify";

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
    reason: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      // Lấy reason từ localStorage nếu có
      const savedReason = localStorage.getItem("appointmentReason") || "";
      if (profile) {
        setFormData((prevData) => ({
          ...prevData,
          patientName: profile.fullName || prevData.patientName,
          gender: profile.gender || prevData.gender,
          phoneNumber: profile.phone || prevData.phoneNumber,
          email: profile.email || prevData.email,
          dob: profile.dob ? profile.dob : prevData.dob,
          reason: savedReason, // Khôi phục reason từ localStorage
        }));
      }
    };
    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient's name is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason for booking is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "reason" && value.length > 1000) return;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    // Lưu reason vào localStorage mỗi khi người dùng nhập
    if (name === "reason") {
      localStorage.setItem("appointmentReason", value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/confirmation", {
        state: { formData, psychologist, slotId, date, time, fee },
      });
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const handleBackToAppointment = () => {
    navigate("/appointment");
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 VND";
    return amount.toLocaleString("vi-VN") + " VND";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Make an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Psychologist Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Psychologist Information</h3>
          {psychologist && (
            <div className="bg-gray-100 p-4 rounded-md">
              <p><strong>Name:</strong> {psychologist.fullName || "N/A"}</p>
              <p><strong>Major:</strong> {psychologist.userDetail?.major || "N/A"}</p>
              <p><strong>Degree:</strong> {psychologist.userDetail?.degree || "N/A"}</p>
              <p><strong>Workplace:</strong> {psychologist.userDetail?.workplace || "N/A"}</p>
            </div>
          )}
        </div>

        {/* Appointment Date and Time */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Appointment Date and Time</h3>
          {date && time && (
            <div className="bg-gray-100 p-4 rounded-md">
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>
          )}
        </div>

        {/* Patient's Name */}
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium mb-1">
            Patient's Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.patientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter patient's name..."
          />
          {errors.patientName && (
            <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
          )}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex">
            <label className="mr-6 flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Contact Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
            Contact Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter phone number..."
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter email address..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.dob ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Reason for Booking */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium mb-1">
            Reason for Booking (Max 1000 characters)
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            maxLength={1000}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.reason ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter the reason for booking..."
            rows="4"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.reason.length}/1000 characters
          </p>
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          )}
        </div>

        {/* Consultation Fee */}
        <div className="mb-6">
          <span className="text-xl font-medium text-orange-600">
            Consultation Fee: {formatCurrency(fee)}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
        >
          Confirm Appointment
        </button>

        {/* Back to Appointment Button */}
        <button
          type="button"
          onClick={handleBackToAppointment}
          className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition duration-200"
        >
          Back to Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;