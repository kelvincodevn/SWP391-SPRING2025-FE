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

const images = [
    "src/assests1/mental/mental_health_login.png",
  ];

const DEFAULT_AVATAR = [
  "src/assests1/profile/user.png"
]

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "", // Changed to email for consistency
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const [currentImage, setCurrentImage] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch(); // Initialize useDispatch

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     setIsLoading(true);
  //     try{
  //       // const response = await axios.post("https://67a8962b6e9548e44fc1712a.mockapi.io/api/v1/User",
  //       //     formData        
  //       //   );

  //       const response = await api.post('login', formData);
  //       const { token, role } = response.data.data
  //       localStorage.setItem('token', token);

  //       // Store user data in localStorage and Redux store after successful login
  //       localStorage.setItem('isLoggedIn', 'true');
  //       localStorage.setItem('userName', response.data.fullname);
  //       // localStorage.setItem('userAvatar', response.data.avatar);
  //       // Dispatch the setUser action with user data
  //       dispatch(setUser(response.data)); // Update Redux store with user data

  //       toast.success("Login Successfully");  
  //       // Store user data in localStorage after successful login
          
  //       //kiểm tra role của user
  //       if (role === "MANAGER") {
  //         navigate('/dashboard')
  //       }else if(role === 'STUDENT') {
  //         navigate("/")
  //       }else if(role === 'PARENT') {
  //         navigate("/")
  //       }else if(role === 'PSYCHOLOGIST') {
  //         navigate("/workplace")
  //       }

  //     // const response = await api.post('login', formData);
  //     //   const { token, role } = response.data.data
  //     //   localStorage.setItem('token', token);
  //     //   // Store user data in localStorage after successful login
  //     //   toast.success("Login Successfully");
          
  //     //   //kiểm tra role của user
  //     //   if (role === "MANAGER") {
  //     //     navigate('/dashboard')
  //     //   }else if(role === 'STUDENT') {
  //     //     navigate("/")
  //     //   }else if(role === 'PARENT') {
  //     //     navigate("/")
  //     //   }else if(role === 'PSYCHOLOGIST') {
  //     //     navigate("/workplace")
  //     //   }
  //     } catch (error) {
  //             toast.error(error.response.data);
  //             // console.error("Login error:", error);
  //           } finally {
  //             setIsLoading(false);
  //           }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        setIsLoading(true);
        try {
            const response = await api.post('/api/login', formData);
            const { token, roleEnum } = response.data;
            localStorage.setItem('token', token);

            // Store user data in localStorage and Redux store after successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('fullName', response.data.fullName);
            localStorage.setItem('role', response.data.roleEnum);
            // localStorage.setItem('userAvatar', response.data.avatar);

             // Set default avatar if user hasn't uploaded one
             const userAvatar = DEFAULT_AVATAR;
             localStorage.setItem('userAvatar', userAvatar);

            // Dispatch the setUser action with user data
            dispatch(setUser({ ...response.data, avatar: userAvatar }));

            toast.success("Login Successfully");

            console.log(roleEnum); // Log the role
            if (roleEnum === "MANAGER") {
                navigate('/dashboard');
            } else if (roleEnum === 'STUDENT' || roleEnum === 'PARENT') {
                navigate("/");
            } else if (roleEnum === 'PSYCHOLOGIST') {
                navigate("/workplace");
            } else {
                // Handle unknown roles or navigate to a default page
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

  //xử lý login google những dưới back-end vẫn cần API xử lý login google
      const handleGoogleLogin = () => {
        console.log("login google...");
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const token = result.user.accessToken;
            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Same as Registration) */}
      <div className="lg:w-1/2 h-screen absolute top-0 left-0">
        {/* ... (Same image and overlay code as RegistrationPage) */}
        <img
          src="src/assests1/mental/mental wellness img.jpg"
          
          alt="Mental Health"
          className="h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0">
          <img
            src="src/assests1/mental/medical-aid.png"
            alt="Logo"
            className="w-24 h-24 object-contain m-8"
          />
        </div> */}
  <div className="absolute inset-0">
  <Link to="/" className="flex items-center">
    <img
      src="src/assests1/mental/medical-aid.png"
      alt="FCare Logo"
      className="w-16 h-16 object-contain m-4" // Reduced logo size and margin
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
              <input
                type="username" // Use email input for consistency
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.username ? "border-red-300" : "border-gray-300"
                } focus:ring-2 focus:ring-purple-200 outline-none`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

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
              
            >
              Login
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

            {/* Sign in with Google Button */}
            {/* <button type="button" className="w-full py-3 px-4 rounded-lg bg-red-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
              <FiGoogle size={20} /> <span>Sign in with Google</span>
            </button> */}

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register " className="text-purple-600 hover:underline"> {/* Use Link */}
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