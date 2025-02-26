import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const DoubleNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('fullName'));
      setUserAvatar(localStorage.getItem('userAvatar'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userAvatar');
    setIsLoggedIn(false);
    setUserName('');
    setUserAvatar('');
    dispatch(clearUser());
    navigate('/login');
  };

  const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 ${
      isActive 
        ? "text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full"
        : "hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-300 hover:after:rounded-full"
    }`;
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
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base transition-colors duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm md:text-base transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/appointment"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors duration-200"
              >
                Appointment
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/profile-settings" className="flex items-center"> {/* Wrap with Link */}
                            <img
                                src={userAvatar || "default_avatar.png"}
                                alt="Avatar"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="ml-2 text-gray-800">{userName}</span>
                        </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm md:text-base transition-colors duration-200"
              >
                Logout
              </button>
              <Link
                to="/appointment"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors duration-200"
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
          <Link to="/" className={getNavLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getNavLinkClass("/about")}>
            About
          </Link>
          <Link to="/services" className={getNavLinkClass("/services")}>
            Services
          </Link>
          <Link to="/psychologist" className={getNavLinkClass("/psychologist")}>
            Psychologist
          </Link>
          <Link to="/blog" className={getNavLinkClass("/blog")}>
            Blog
          </Link>
          <Link to="/cooperate" className={getNavLinkClass("/cooperate")}>
            Cooperate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoubleNavbar;