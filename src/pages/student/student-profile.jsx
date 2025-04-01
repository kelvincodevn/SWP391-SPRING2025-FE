import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/api.user';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhoneAlt, FaBirthdayCake, FaTransgenderAlt } from 'react-icons/fa'; // Importing icons

function StudentProfile() {
  // Define state for the user data
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    dob: '',
    phone: '',
    createdDate: '',
    gender: '',
  });

  // Define state to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Validate input fields
  const validate = () => {
    if (!userData.fullName || userData.fullName.length < 5) {
      toast.error('Full Name must be at least 5 characters long');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailPattern.test(userData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    const phonePattern = /^0\d{9}$/;
    if (!userData.phone || !phonePattern.test(userData.phone)) {
      toast.error('Phone number must be 10 digits long and start with 0');
      return false;
    }
    if (!userData.dob) {
      toast.error('Date of Birth is required');
      return false;
    }
    if (!userData.gender) {
      toast.error('Gender is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const updatedData = await updateUserProfile(userData);
      setUserData(updatedData);
      toast.success('Profile saved successfully!');
      setIsEditing(false); // Switch back to view mode after saving
    } catch (error) {
      console.error('Error saving user profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 border border-gray-300 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 flex items-center">
            <FaUser className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Full Name:</label>
          </div>
          <input
            type="text"
            name="fullName"
            value={userData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
            <FaEnvelope className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Email:</label>
          </div>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
            <FaBirthdayCake className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Date of Birth:</label>
          </div>
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleChange}
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
            <FaPhoneAlt className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Phone:</label>
          </div>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
            <FaTransgenderAlt className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Gender:</label>
          </div>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-1/2 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 mr-2"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-1/2 py-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 ml-2"
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
              <p><strong>Full Name:</strong> {userData.fullName}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Date of Birth:</strong> {userData.dob}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
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

export default StudentProfile;