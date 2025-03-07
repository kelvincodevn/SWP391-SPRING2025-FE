import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();

  // Destructure the necessary data passed from the previous page (BookingForm)
  const {
    patientName,
    contactName,
    contactPhone,
    gender,
    phone,
    email,
    dateOfBirth,
    location: city,
    reason,
    selectedDate,
    selectedTime,
    bookingFor, // Whether it's for "myself" or "someoneElse"
  } = location.state || {};

  const price = 150000; // Example price in VND
  const total = price;

  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Appointment Confirmation</h2>

        {/* If booking for someone else, show contact details */}
        {bookingFor === 'someoneElse' && (
          <div className="mb-4">
            <strong>Booking Contact Name:</strong> {contactName}
          </div>
        )}
        {bookingFor === 'someoneElse' && (
          <div className="mb-4">
            <strong>Contact Phone:</strong> {contactPhone}
          </div>
        )}

        {/* Patient Information */}
        <div className="mb-4">
          <strong>Patient Name:</strong> {patientName}
        </div>
        <div className="mb-4">
          <strong>Gender:</strong> {gender}
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> {phone}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {email}
        </div>
        <div className="mb-4">
          <strong>Date of Birth:</strong> {dateOfBirth}
        </div>

        {/* Location and Reason for Visit */}
        <div className="mb-4">
          <strong>Location:</strong> {city}
        </div>
        <div className="mb-4">
          <strong>Reason for Visit:</strong> {reason}
        </div>

        {/* Display the selected Appointment Date and Time */}
        <div className="mb-4">
          <strong>Appointment Date: </strong> {selectedDate}
        </div>
        <div className="mb-4">
          <strong>Appointment Time: </strong> {selectedTime}
        </div>

        {/* Display Total Price */}
        <div className="mb-4">
          <strong>Total Price: </strong> {new Intl.NumberFormat().format(total)} VND
        </div>

        {/* Confirmation Button */}
        <div className="text-center">
          <Link
            to="/"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
