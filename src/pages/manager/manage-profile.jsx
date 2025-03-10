import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

const ManagerProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState(null); // Separate form data
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     username: "thangKelvin",
//     phone: "+1 (555) 123-4567",
//     dateOfBirth: "17/03/2004", // Added date of birth
//     gender: "Male", // Added gender
//     profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
//   });


useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await axios.get('https://67aa9a3d65ab088ea7e71025.mockapi.io/api/v3/Profile/1'); // Assuming ID is 1. Adjust as needed
            setProfileData(response.data);
            setFormData(response.data); // Initialize form data with fetched data
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Error fetching profile. Please try again later.");
        }
    };

    fetchProfile();
}, []);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors for the field being changed
    setErrors({ ...errors, [name]: "" });
};

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone || !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
        newErrors.dateOfBirth = "Date of birth must be in YYYY-MM-DD format";
    }
    if (!formData.gender) newErrors.gender = "Gender is required"; // Validate gender
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
        try {
            await axios.put('https://67aa9a3d65ab088ea7e71025.mockapi.io/api/v3/Profile/1', formData); // Use PUT to update
            setProfileData(formData); // Update displayed data
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile. Please try again later.");
        }
    } else {
        setErrors(newErrors);
        toast.error("Please fix the errors before saving.");
    }
};

if (!profileData) {
    return <div>Loading...</div>; // Display loading message while data is fetching
}

//   const confirmSave = () => {
//     setShowModal(false);

//     toast.success("Profile updated successfully!", {
//       autoClose: 3000,
//       onClose: () => {
//         setIsEditing(false);
//       },
//     });
//   };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <div className="p-8 min-w-full"> {/* or w-3/4  or  max-w-7xl mx-auto */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit2 /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FiX /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiCheck /> Save
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="relative">
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";
                  }}
                />
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FiEdit2 className="text-gray-600" />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>

          
            <div className="col-span-2 space-y-6">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.fullName ? "border-red-500" : ""}`}
                                        />
                                        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.email ? "border-red-500" : ""}`}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.username ? "border-red-500" : ""}`}
                                        />
                                        {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.phone ? "border-red-500" : ""}`}
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : ""}`}
                                        />
                                        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.gender ? "border-red-500" : ""}`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h2>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">
                                            <span className="font-medium">Email:</span> {profileData.email}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Username:</span> {profileData.username}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Phone:</span> {profileData.phone}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Date of Birth:</span> {profileData.dateOfBirth}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Gender:</span> {profileData.gender}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default ManagerProfile;