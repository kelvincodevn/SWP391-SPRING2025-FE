import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit2, FiSave, FiX, FiCamera } from "react-icons/fi";
import { format } from "date-fns";

const UserProfile1 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    phoneNumber: "+1234567890",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjYxNjl8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTcwMTg0NjE0OXww&ixlib=rb-4.0.3&q=80&w=200"
  });

  const [errors, setErrors] = useState({});
  const [tempFormData, setTempFormData] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (new Date(formData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future";
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setTempFormData({ ...formData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(tempFormData);
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmSave = () => {
    setShowModal(false);
    setIsEditing(false);
    toast.success("Profile Updated Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast.error("Only JPG, PNG & WebP formats are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <FiCamera className="w-5 h-5" />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        <div className="mt-20 px-8 py-6">
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <FiEdit2 className="mr-2" /> Edit Profile
              </button>
            ) : (
              <div className="space-x-4">
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <FiSave className="mr-2" /> Save
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{formData.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{formData.username}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                {isEditing ? (
                  <div>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{format(new Date(formData.dateOfBirth), "MMMM dd, yyyy")}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer Not to Say">Prefer Not to Say</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{formData.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                {isEditing ? (
                  <div>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>
                ) : (
                  <p className="mt-1 text-gray-900">{formData.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Update</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to update your profile?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserProfile1;