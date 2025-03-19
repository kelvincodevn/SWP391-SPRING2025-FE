import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPageTest = () => {
  const location = useLocation();
  const { formData = {}, psychologist, date, time } = location.state || {}; // Default empty object for formData

  if (!formData) {
    return <div>Error: No form data found!</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Appointment Confirmation</h2>

      {/* Displaying Psychologist Information */}
      {psychologist && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Psychologist Information</h3>
          <p><strong>Name:</strong> {psychologist.name}</p>
          <p><strong>Specialty:</strong> {psychologist.specialty}</p>
          <p><strong>Hospital:</strong> {psychologist.hospital}</p>
        </div>
      )}

      {/* Displaying Appointment Date and Time */}
      {date && time && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Appointment Date and Time</h3>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
        </div>
      )}

      {/* Displaying Form Data */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Patient Information</h3>
        <p><strong>Name:</strong> {formData.isForSelf ? formData.patientName : formData.otherPatientName}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Date of Birth:</strong> {formData.dob}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>District:</strong> {formData.district}</p>
      </div>

      {/* Displaying Relation if the appointment is for someone else */}
      {!formData.isForSelf && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Relation to the Person</h3>
          <p><strong>Relation:</strong> {formData.relation}</p>
        </div>
      )}

      <div className="mb-6">
        <span className="text-xl font-medium text-orange-600">Consultation Fee: 150,000 VND</span>
      </div>

      {/* Confirmation button */}
      <button
        onClick={() => alert("Appointment Confirmed!")}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Confirm Appointment
      </button>
    </div>
  );
};

export default ConfirmationPageTest;