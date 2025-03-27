import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const DoubleNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("fullName"));
      setUserAvatar(localStorage.getItem("userAvatar"));
      setUserRole(localStorage.getItem("role"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    setUserAvatar("");
    setUserRole("");
    dispatch(clearUser());
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 ${
      isActive
        ? "text-blue-700 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-700 after:rounded-full"
        : "hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-300 hover:after:rounded-full"
    }`;
  };

  const renderRoleBasedLink = () => {
    if (!userRole) return null;
    switch (userRole.toUpperCase()) {
      case "STUDENT":
      case "PARENT":
        return <Link to="/user-dashboard" className="text-blue-600 hover:text-blue-700 font-medium ml-2">User Dashboard</Link>;
      case "PSYCHOLOGIST":
        return <Link to="/workview" className="text-blue-600 hover:text-blue-700 font-medium ml-2">Workview</Link>;
      case "MANAGER":
        return <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium ml-2">Dashboard</Link>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Top Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-sm px-6 py-4 border-b border-blue-100">
        <div className="flex items-center gap-4 mb-2 md:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <img src="src/assests1/mental/medical-aid.png" alt="FCare Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-blue-800 tracking-tight">FCare</span>
          </Link>
          <Input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-64 text-sm text-gray-700"
          />
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Register</Link>
              <Link to="/login" className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Login</Link>
              <Link
                to="/appointment"
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold shadow"
              >
                Appointment
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/user-dashboard/profile" className="flex items-center gap-2">
                <img src={userAvatar || "default_avatar.png"} alt="Avatar" className="h-8 w-8 rounded-full" />
                <span className="text-sm font-medium text-gray-800">{userName}</span>
              </Link>
              {renderRoleBasedLink()}
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
              <Link
                to="/appointment"
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold shadow"
              >
                Appointment
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="bg-gray-50 shadow-inner py-3 border-b border-gray-200">
        <div className="flex flex-wrap justify-center md:justify-around items-center gap-2 md:gap-6 text-sm md:text-base">
          <Link to="/" className={getNavLinkClass("/")}>Home</Link>
          <Link to="/about" className={getNavLinkClass("/about")}>About</Link>
          <Link to="/services" className={getNavLinkClass("/services")}>Services</Link>
          <Link to="/psychologist" className={getNavLinkClass("/psychologist")}>Psychologist</Link>
          <Link to="/blog" className={getNavLinkClass("/blog")}>Blog</Link>
          <Link to="/cooperate" className={getNavLinkClass("/cooperate")}>Cooperate</Link>
        </div>
      </div>
    </div>
  );
};

export default DoubleNavbar;