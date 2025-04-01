import React, { useEffect, useState } from 'react';
import { getPsychologistProfile, updatePsychologistProfile } from '../../services/api.psychologist';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaGraduationCap, FaBriefcase, FaMoneyBillWave, FaPhoneAlt } from 'react-icons/fa';
import { UserRoundIcon } from 'lucide-react';

function PsychologistProfile() {
  const [psychologistData, setPsychologistData] = useState({
    fullName: '',
    username: '',
    email: '',
    major: '',
    degree: '',
    workplace: '',
    fee: '', 
    phone: '',
    dob: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getPsychologistProfile();
        setPsychologistData(data);
      } catch (error) {
        console.error('Error fetching psychologist profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPsychologistData({
      ...psychologistData,
      [name]: value,
    });
  };

  const validate = () => {
    if (!psychologistData.fullName || psychologistData.fullName.length < 5) {
      toast.error('Full Name must be at least 5 characters long');
      return false;
    }
    if (!psychologistData.username) {
      toast.error('Username is required');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!psychologistData.email || !emailPattern.test(psychologistData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!psychologistData.major) {
      toast.error('Major is required');
      return false;
    }
    if (!psychologistData.degree) {
      toast.error('Degree is required');
      return false;
    }
    if (!psychologistData.workplace) {
      toast.error('Workplace is required');
      return false;
    }
    if (!psychologistData.phone) {
      toast.error('Phone number is required');
      return false;
    }
    if (!psychologistData.fee) {
      toast.error('Fee is required');
      return false;
    }
    if (!psychologistData.dob) {
      toast.error('Date of birth is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const updatedData = await updatePsychologistProfile(psychologistData);
      setPsychologistData(updatedData);
      toast.success('Profile saved successfully!');
      setIsEditing(false); // Switch back to view mode after saving
    } catch (error) {
      console.error('Error saving psychologist profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 border border-gray-300 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Psychologist Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name */}
          <div className="flex items-center mb-6">
            <FaUser className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Full Name:</label>
          </div>
          <input
            type="text"
            name="fullName"
            value={psychologistData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
          />

          {/* Username */}
          <div className="flex items-center mb-6">
            <FaUser className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Username:</label>
          </div>
          <input
            type="text"
            name="username"
            value={psychologistData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
          />

          {/* Email */}
          <div className="flex items-center mb-6">
            <FaEnvelope className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Email:</label>
          </div>
          <input
            type="email"
            name="email"
            value={psychologistData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
          />

          {/* Workplace */}
          <div className="flex items-center mb-6">
            <FaBriefcase className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Workplace:</label>
          </div>
          <select
            name="workplace"
            value={psychologistData.workplace}
            onChange={handleChange}
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
          >
            <option value="">Select your workplace</option>
            <option value="Private Practice">Private Practice</option>
            <option value="Hospital">Hospital</option>
            <option value="University">University</option>
            <option value="School">School</option>
            <option value="Clinic">Clinic</option>
            <option value="Other">Other</option>
          </select>

          {/* Fee */}
          <div className="flex items-center mb-6">
            <FaMoneyBillWave className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Fee:</label>
          </div>
          <input
            type="number"
            name="fee"
            value={psychologistData.fee}
            onChange={handleChange}
            placeholder="Enter your fee"
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
            step="0.01"
          />

          {/* Phone */}
          <div className="flex items-center mb-6">
            <FaPhoneAlt className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Phone:</label>
          </div>
          <input
            type="text"
            name="phone"
            value={psychologistData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
          />

          {/* Date of Birth */}
          <div className="flex items-center mb-6">
            <FaBriefcase className="text-2xl text-indigo-600 mr-4" />
            <label className="text-lg font-medium text-gray-800">Date of Birth:</label>
          </div>
          <input
            type="date"
            name="dob"
            value={psychologistData.dob}
            onChange={handleChange}
            className="w-full p-4 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
          />

          {/* Save and Cancel buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="w-1/2 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 mr-2 shadow-lg"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-1/2 py-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 ml-2 shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Profile Details</h3>
            <div className="mt-4 space-y-4">
              <p><strong>Full Name:</strong> {psychologistData.fullName}</p>
              <p><strong>Username:</strong> {psychologistData.username}</p>
              <p><strong>Email:</strong> {psychologistData.email}</p>
              <p><strong>Workplace:</strong> {psychologistData.workplace}</p>
              <p><strong>Major: </strong>{psychologistData.major}</p>
              <p><strong>Degree:</strong> {psychologistData.degree}</p>
              <p><strong>Fee:</strong> {psychologistData.fee}.000</p>
              <p><strong>Phone:</strong> {psychologistData.phone}</p>
              <p><strong>Date of Birth:</strong> {psychologistData.dob}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-4 mt-8 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default PsychologistProfile;
