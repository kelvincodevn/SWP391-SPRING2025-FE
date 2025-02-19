import { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    accountType: "individual",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
    avatar: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "Name should not contain numbers";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setErrors({ ...errors, avatar: "File size should be less than 5MB" });
        return;
      }
      if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
        setErrors({ ...errors, avatar: "Only PNG, JPG files are allowed" });
        return;
      }
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (No longer fixed) */}
      <div className="lg:w-1/2 h-screen relative"> {/* Changed to relative */}
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
          alt="Mental Health"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-teal-500/40 backdrop-blur-sm">
          <img
            src="https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1"
            alt="Logo"
            className="w-24 h-24 object-contain m-8"
          />
        </div>
      </div>


   <div className="lg:w-1/2 ml-auto h-screen overflow-y-auto flex flex-col items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Form Header */}
          {/* <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our mental wellness community</p>
          </div> */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Account Type Buttons */}
            <div className="flex gap-4 justify-center">
              {["individual", "therapist"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: type })}
                  className={`px-6 py-2 rounded-full ${
                    formData.accountType === type
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600"
                  } capitalize`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.firstName ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-purple-200 outline-none`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
                  />
                </div>
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-purple-200 outline-none`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-purple-200 outline-none`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

              <input
                type="date"
                value={formData.dob}
                max={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
              />

              <div className="flex gap-4">
                {["male", "female", "other"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="capitalize">{gender}</span>
                  </label>
                ))}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.password ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-purple-200 outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? "border-red-300" : "border-gray-300"} focus:ring-2 focus:ring-purple-200 outline-none`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <FiUpload size={24} className="text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={Object.keys(errors).length > 0}
            >
              Create Account
            </button>

            <p className="text-center text-gray-600">
                Already have an account?{" "}
            <Link to="/login1" className="text-purple-600 hover:underline"> {/* Use Link */}
                Log in
            </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
