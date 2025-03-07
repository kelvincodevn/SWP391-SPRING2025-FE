import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingForm = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};

  const [formData, setFormData] = useState({
    patientName: '',
    gender: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    location: '',
    district: '',
    address: '',
    reason: '',
    paymentMethod: '',
    contactName: '', // Add contact name for the user who is booking
    contactPhone: '', // Add phone for the user who is booking
    bookingFor: 'myself', // Default option: booking for yourself
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // List of cities in Vietnam with their respective districts (Example)
  const cityDistricts = {
    'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Tây Hồ', 'Cầu Giấy', 'Đống Đa'],
    'Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 5', 'Quận 7'],
    'Đà Nẵng': ['Hải Châu', 'Ngũ Hành Sơn', 'Sơn Trà'],
    'Cần Thơ': ['Ninh Kiều', 'Cái Răng', 'Bình Thủy'],
    'Hải Phòng': ['Hồng Bàng', 'Ngô Quyền', 'Lê Chân'],
  };

  const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Online Payment'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      location: selectedCity,
      district: '', // Reset district when city changes
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Booking Details:', formData);
    // Redirect to confirmation page after submission with the form data
    navigate('/confirm', { state: formData });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.contactName.trim() && formData.bookingFor === 'someoneElse') {
      validationErrors.contactName = 'Họ tên người đặt lịch là bắt buộc';
    }
    if (!formData.patientName.trim()) {
      validationErrors.patientName = 'Họ tên bệnh nhân là bắt buộc';
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = 'Số điện thoại liên hệ là bắt buộc';
    }
    if (formData.bookingFor === 'someoneElse' && !formData.contactPhone.trim()) {
      validationErrors.contactPhone = 'Số điện thoại bệnh nhân là bắt buộc';
    }
    return validationErrors;
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Confirm Your Appointment</h2>

        {/* Appointment Date and Time */}
        <div className="mb-4">
          <strong>Appointment Date:</strong> {selectedDate}
        </div>
        <div className="mb-4">
          <strong>Appointment Time:</strong> {selectedTime}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Booking Type: For Yourself or Someone Else */}
          <div className="mb-4">
            <label className="block font-semibold">Booking For:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="myself"
                  checked={formData.bookingFor === 'myself'}
                  onChange={handleChange}
                />
                Book for Myself
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="someoneElse"
                  checked={formData.bookingFor === 'someoneElse'}
                  onChange={handleChange}
                />
                Book for Someone Else
              </label>
            </div>
          </div>

          {/* Contact Information (User making the booking) */}
          {formData.bookingFor === 'someoneElse' && (
            <>
              <div className="mb-4">
                <label className="block font-semibold" htmlFor="contactName">Họ tên người đặt lịch</label>
                <input
                  className={`w-full p-2 border rounded ${errors.contactName ? 'border-red-500' : ''}`}
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required={formData.bookingFor === 'someoneElse'}
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm">{errors.contactName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block font-semibold" htmlFor="contactPhone">Số điện thoại liên hệ</label>
                <input
                  className={`w-full p-2 border rounded ${errors.contactPhone ? 'border-red-500' : ''}`}
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required={formData.bookingFor === 'someoneElse'}
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm">{errors.contactPhone}</p>
                )}
              </div>
            </>
          )}

          {/* Patient Information */}
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="patientName">Họ tên bệnh nhân</label>
            <input
              className={`w-full p-2 border rounded ${errors.patientName ? 'border-red-500' : ''}`}
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm">{errors.patientName}</p>
            )}
          </div>

          {/* Reason for Visit */}
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="reason">Reason for Visit</label>
            <textarea
              className="w-full p-2 border rounded"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location and District */}
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="location">Location</label>
            <select
              className="w-full p-2 border rounded"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleCityChange}
              required
            >
              <option value="">Select a City</option>
              {Object.keys(cityDistricts).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold" htmlFor="district">District</label>
            <select
              className="w-full p-2 border rounded"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              disabled={!formData.location}
            >
              <option value="">Select a District</option>
              {formData.location && cityDistricts[formData.location]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block font-semibold" htmlFor="paymentMethod">Payment Method</label>
            <select
              className="w-full p-2 border rounded"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
