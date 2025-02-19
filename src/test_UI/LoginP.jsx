import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";


const LoginPage1 = () => {
  const [formData, setFormData] = useState({
    email: "", // Changed to email for consistency
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login form submitted:", formData);
      // Handle login logic here (e.g., API call)
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Same as Registration) */}
      <div className="lg:w-1/2 h-screen absolute top-0 left-0">
        {/* ... (Same image and overlay code as RegistrationPage) */}
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

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 ml-auto h-screen overflow-y-auto flex flex-col items-center justify-center p-8 bg-white lg:pl-32">
        <div className="max-w-md w-full space-y-8">
          {/* Form Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">Login</h2>
            <p className="mt-2 text-gray-600">Welcome back to our community</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <input
                type="email" // Use email input for consistency
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } focus:ring-2 focus:ring-purple-200 outline-none`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={Object.keys(errors).length > 0}
            >
              Login
            </button>

            {/* Sign in with Google Button */}
            {/* <button type="button" className="w-full py-3 px-4 rounded-lg bg-red-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
              <FiGoogle size={20} /> <span>Sign in with Google</span>
            </button> */}

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register1 " className="text-purple-600 hover:underline"> {/* Use Link */}
                Register
            </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage1;