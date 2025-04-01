import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaHome } from "react-icons/fa";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import api from "../../config/axios";

const images = ["src/assests1/mental/mental_health_login.png"];
const DEFAULT_AVATAR = ["src/assests1/profile/user.png"];

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.username)) {
      newErrors.username = "Username should only contain letters and numbers";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
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
      setIsLoading(true);
      try {
        const response = await api.post("/api/auth/login", formData);
        const { token, roleEnum } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", response.data.userID);

        // Store user data in localStorage and Redux store
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("fullName", response.data.fullName);
        localStorage.setItem("role", response.data.roleEnum);

        // Set default avatar if user hasn't uploaded one
        const userAvatar = DEFAULT_AVATAR[0]; // Lấy phần tử đầu tiên thay vì mảng
        localStorage.setItem("userAvatar", userAvatar);

        // Dispatch the setUser action with user data
        dispatch(setUser({ ...response.data, avatar: userAvatar }));

        toast.success("Login Successfully");

        console.log(roleEnum);
        if (roleEnum === "MANAGER") {
          navigate("/dashboard");
        } else if (roleEnum === "STUDENT" || roleEnum === "PARENT") {
          navigate("/");
        } else if (roleEnum === "PSYCHOLOGIST") {
          navigate("/workview");
        } else {
          navigate("/"); // Default navigation
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("An unexpected error occurred.");
          console.error("Login error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("login google...");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const token = result.user.accessToken;
        const user = result.user;
        console.log(user);
        // TODO: Gửi token hoặc thông tin user tới backend để xác thực
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Google login failed: ${errorMessage}`);
        console.error("Google login error:", error);
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 h-screen absolute top-0 left-0">
        <img
          src="src/assests1/mental/mental wellness img.jpg"
          alt="Mental Health"
          className="h-full w-full object-cover"
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
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaGoogle className="mr-2" />
                Sign in with Google
              </button>
            </div>

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
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;