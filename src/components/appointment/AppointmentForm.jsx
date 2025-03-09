import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { psychologist, date, time } = location.state || {};

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    dob: "",
    city: "",
    district: "",
    commune: "",
    isForSelf: true,
    relation: "",
    otherPatientName: "",
  });

  const cities = [
    { id: "hanoi", name: "Hà Nội" },
    { id: "hochiminh", name: "Hồ Chí Minh" },
    { id: "danang", name: "Đà Nẵng" },
  ];

  const districts = {
    hanoi: [
      { id: "ba_dinh", name: "Ba Đình" },
      { id: "hoan_kiem", name: "Hoàn Kiếm" },
      { id: "dong_da", name: "Đống Đa" },
    ],
    hochiminh: [
      { id: "district_1", name: "District 1" },
      { id: "district_2", name: "District 2" },
      { id: "district_3", name: "District 3" },
    ],
    danang: [
      { id: "hai_chau", name: "Hải Châu" },
      { id: "sontra", name: "Sơn Trà" },
    ],
  };

  const communes = {
    ba_dinh: [
      { id: "phuc_xa", name: "Phúc Xá" },
      { id: "hoan_kiem_ward", name: "Hoàn Kiếm Ward" },
    ],
    hoan_kiem: [
      { id: "hang_bao", name: "Hàng Bào" },
      { id: "cua_hoang", name: "Cửa Hoàng" },
    ],
    district_1: [
      { id: "le_lai", name: "Lê Lai" },
      { id: "nguyen_trai", name: "Nguyễn Trãi" },
    ],
    district_2: [
      { id: "bao_loc", name: "Bảo Lộc" },
      { id: "thu_thiem", name: "Thủ Thiêm" },
    ],
    hai_chau: [
      { id: "phuoc_nam", name: "Phước Nam" },
      { id: "hoa_xuan", name: "Hòa Xuân" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({
      ...formData,
      city: cityId,
      district: "",
      commune: "",
    });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({ ...formData, district: districtId, commune: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: { formData, psychologist, date, time },
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Make an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Psychologist Information</h3>
          {psychologist && (
            <div>
              <p><strong>Name:</strong> {psychologist.name}</p>
              <p><strong>Specialty:</strong> {psychologist.specialty}</p>
              <p><strong>Hospital:</strong> {psychologist.hospital}</p>
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
          <label htmlFor="city" className="block text-sm font-medium">
            Select City
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleCityChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="district" className="block text-sm font-medium">
            Select District
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleDistrictChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select District</option>
            {formData.city &&
              districts[formData.city]?.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-6">
          <span className="text-xl font-medium text-orange-600">Consultation Fee: 150,000 VND</span>
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
