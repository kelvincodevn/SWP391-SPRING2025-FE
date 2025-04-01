import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import api from "../../config/axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    roleEnum: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 5) {
      newErrors.fullName = "Full name must be at least 5 characters";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full name should only contain letters and spaces";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.username)) {
      newErrors.username = "Username should only contain letters and numbers (no spaces or special characters)";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) { // Tăng lên 8 cho bảo mật
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // RoleEnum validation
    if (!formData.roleEnum) {
      newErrors.roleEnum = "Please select an account type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Xóa lỗi của field khi người dùng bắt đầu nhập lại
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await api.post("/api/auth/register", {
          fullName: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          roleEnum: formData.roleEnum.toUpperCase(),
        });
        toast.success("Register Successfully");
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data || "Registration failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex overflow-y-auto">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src="src/assests1/mental/mental_health_register.jpg"
          alt="Mental Health"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0">
          <Link to="/" className="flex items-center">
            <img
              src="src/assests1/mental/medical-aid.png"
              alt="FCare Logo"
              className="w-16 h-16 object-contain m-4"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
              FCare
            </span>
          </Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 ml-auto min-h-screen overflow-y-auto flex flex-col items-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our mental wellness community</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Account Type Selection */}
            <div className="flex gap-4 justify-center mt-4">
              {["parent", "student"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, roleEnum: type })}
                  className={`px-6 py-2 rounded-full ${
                    formData.roleEnum === type
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600"
                  } capitalize`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.roleEnum && (
              <p className="text-red-500 text-sm text-center mt-1">{errors.roleEnum}</p>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-200 outline-none`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-200 outline-none`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-200 outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } focus:ring-2 focus:ring-purple-200 outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <button
              type="button"
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              aria-label="Back to Home"
              onClick={() => navigate("/")}
            >
              <FaHome className="w-5 h-5 mr-2" />
              Back to Home
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
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