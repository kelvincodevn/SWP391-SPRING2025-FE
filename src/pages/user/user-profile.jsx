import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/api.user'; // Đảm bảo import đúng

function UserNProfile() {
  // Define state for the user data
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    dob: '',
    phone: '',
    createdDate: '',
    gender: '',
    avatar: '',
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateUserProfile(userData);
      setUserData(updatedData);
      alert('Profile saved successfully!');
      setIsEditing(false); // Switch back to view mode after saving
    } catch (error) {
      console.error('Error saving user profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={userData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              type="file"
              name="avatar"
              // value={userData.avatar}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Profile
          </button>
        </form>
      ) : (
        <div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
            <div className="mt-4">
              <p><strong>Full Name:</strong> {userData.fullName}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Date of Birth:</strong> {userData.dob}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Avatar:</strong> <img src={userData.avatar} alt="Avatar" className="w-16 h-16 rounded-full" /></p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default UserNProfile;