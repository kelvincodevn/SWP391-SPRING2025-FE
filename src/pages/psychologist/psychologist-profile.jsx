import React, { useEffect, useState } from 'react';
import { getPsychologistProfile, updatePsychologistProfile } from '../../services/api.psychologist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { UserRoundIcon } from 'lucide-react';

function PsychologistProfile() {
  const [psychologistData, setPsychologistData] = useState({
    fullName: '',
    username: '',
    email: '',
    major: '',
    degree: '',
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
      <ToastContainer />
      <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">Psychologist Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6 flex items-center">
            <FaUser className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Full Name:</label>
          </div>
          <input
            type="text"
            name="fullName"
            value={psychologistData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
            <FaUser className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Username:</label>
          </div>
          <input
            type="text"
            name="username"
            value={psychologistData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
            <FaEnvelope className="text-2xl text-indigo-600 mr-3" />
            <label className="block text-lg font-medium text-gray-800">Email:</label>
          </div>
          <input
            type="email"
            name="email"
            value={psychologistData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="mb-6 flex items-center">
  <FaBriefcase className="text-2xl text-indigo-600 mr-3" />
  <label className="block text-lg font-medium text-gray-800">Major:</label>
</div>
<select
  name="major"
  value={psychologistData.major}
  onChange={handleChange}
  className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
>
  <option value="">Select your major</option>
  <option value="Clinical Psychology">Clinical Psychology</option>
  <option value="Counseling Psychology">Counseling Psychology</option>
  <option value="School Psychology">School Psychology</option>
  <option value="Educational Psychology">Educational Psychology</option>
  <option value="Industrial-Organizational Psychology">Industrial-Organizational Psychology</option>
  <option value="Forensic Psychology">Forensic Psychology</option>
</select>

<div className="mb-6 flex items-center">
  <FaGraduationCap className="text-2xl text-indigo-600 mr-3" />
  <label className="block text-lg font-medium text-gray-800">Degree:</label>
</div>
<select
  name="degree"
  value={psychologistData.degree}
  onChange={handleChange}
  className="mt-2 p-4 w-full border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
>
  <option value="">Select your degree</option>
  <option value="Bachelor's">Bachelor's</option>
  <option value="Master's">Master's</option>
  <option value="PhD">PhD</option>
  <option value="PsyD">PsyD</option>
  <option value="EdD">EdD</option>
  <option value="Other">Other</option>
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
              <p><strong>Full Name:</strong> {psychologistData.fullName}</p>
              <p><strong>Username:</strong> {psychologistData.username}</p>
              <p><strong>Email:</strong> {psychologistData.email}</p>
              <p><strong>Major:</strong> {psychologistData.major}</p>
              <p><strong>Degree:</strong> {psychologistData.degree}</p>
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