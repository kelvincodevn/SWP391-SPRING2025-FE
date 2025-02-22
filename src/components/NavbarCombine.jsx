import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const DoubleNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Store user's name
  const [userAvatar, setUserAvatar] = useState(""); // Store user's avatar URL
  const navigate = useNavigate(); // Import and use useNavigate
  
  const dispatch = useDispatch(); // Initialize useDispatch
  const user = useSelector((state) => state.user.user); // Get user from Redux store

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

//   useEffect(() => {
//     // Check local storage for login status on component mount
//     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
//     const storedUserName = localStorage.getItem("userName");
//     const storedUserAvatar = localStorage.getItem("userAvatar");

//     if (storedIsLoggedIn) {
//       setIsLoggedIn(true);
//       setUserName(storedUserName);
//       setUserAvatar(storedUserAvatar);
//     }
//   }, []);


//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userAvatar");
//     setIsLoggedIn(false);
//     setUserName("");
//     setUserAvatar("");
//     navigate("/login"); // Navigate to login page after logout
//     // No navigation here, stays on the same page
//   };

useEffect(() => {
    // Check local storage for login status on component mount
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('userName'));
      setUserAvatar(localStorage.getItem('userAvatar'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userAvatar');
    setIsLoggedIn(false);
    setUserName('');
    setUserAvatar('');
    dispatch(clearUser()); // Clear user data in Redux store
    navigate('/login');
  };

  return (
    <div className="w-full">
      {/* First Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-md p-4">
        {/* Left Side: Bookingcare Logo & Search Bar */}
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <Link to="/" className="flex items-center">
            <img
              src="src/assests1/mental/medical-aid.png"
              alt="FCare Logo"
              className="h-10"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
              FCare
            </span>
          </Link>
          <Input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-2 py-1 w-full md:w-64 text-gray-700"
          />
        </div>

        {/* Right Side: Conditionally render login/register or profile/logout */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/register" // Keep as Link for navigation
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base"
              >
                Register
              </Link>
              <Link
                to="/login"  // Keep as Link for navigation
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm md:text-base"
              >
                Login
              </Link>
              <Link
                to="/appointment"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
              >
                Appointment
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center"> {/* Added flex and items-center */}
                <img
                  src={userAvatar || "default_avatar.png"} // Display avatar or default
                  alt="Avatar"
                  className="h-8 w-8 rounded-full" // Added rounded-full class
                />
                <span className="ml-2 text-gray-800">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm md:text-base"
              >
                Logout
              </button>
              <Link
                to="/appointment"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base"
              >
                Appointment
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Second Navbar */}
      <div className="bg-gray-100 shadow-sm p-3">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <Link
            to="/"
            className={`text-gray-700 hover:text-gray-900 font-medium p-2 ${
              location.pathname === "/" ? "text-blue-600" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 hover:text-gray-900 font-medium p-2 ${
              location.pathname === "/about" ? "text-blue-600" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/services"
            className={`text-gray-700 hover:text-gray-900 font-medium p-2 ${
              location.pathname === "/services" ? "text-blue-600" : ""
            }`}
          >
            Services
          </Link>
          <Link
            to="/psychologist"
            className={`text-gray-700 hover:text-gray-900 font-medium p-2 ${
              location.pathname === "/psychologist" ? "text-blue-600" : ""
            }`}
          >
            Psychologist
          </Link>
          <Link
            to="/blog"
            className={`text-gray-700 hover:text-gray-900 font-medium p-2 ${
              location.pathname === "/blog" ? "text-blue-600" : ""
            }`}
          >
            Blog
          </Link>
          <Link
            to="/cooperate"
            className={`text-gray-700 hover:text-gray-900 font-medium p-2 ${
              location.pathname === "/cooperate" ? "text-blue-600" : ""
            }`}
          >
            Cooperate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoubleNavbar;