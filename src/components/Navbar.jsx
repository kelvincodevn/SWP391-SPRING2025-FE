import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);
  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };
  const closeForm = () => setShowForm(false);

  return (
    <header className="bg-white text-gray-900 shadow-md sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-4">
          <img
            src="src/assests1/image/Logo_Trường_Đại_học_FPT.svg.png"
            alt="FPT Logo"
            className="h-14 w-auto object-contain"
          />
          <div className="text-left hidden sm:block">
            <p className="text-lg font-bold text-blue-800 leading-tight">
              FPT Mental Health Center
            </p>
            <span className="text-sm text-gray-500">Compassionate & Confidential Care</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10 text-[16px] font-medium">
          <Link to="/home" className="hover:text-blue-700 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-700 transition">About Us</Link>
          <Link to="/services" className="hover:text-blue-700 transition">Services</Link>
          <Link to="/psychologist" className="hover:text-blue-700 transition">Psychologist</Link>
          <Link to="/blog" className="hover:text-blue-700 transition">Blog</Link>
        </nav>

        {/* Contact Button */}
        <div className="hidden lg:flex">
          <button
            onClick={openForm}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md font-medium shadow-sm transition"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          {menu ? (
            <AiOutlineClose size={26} onClick={handleChange} className="cursor-pointer text-blue-800" />
          ) : (
            <AiOutlineMenu size={26} onClick={handleChange} className="cursor-pointer text-blue-800" />
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 w-full bg-white border-t border-blue-100 shadow-md px-6 py-6 transition-transform duration-300 ease-in-out z-40 ${menu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 text-[17px] font-semibold text-blue-800">
          <Link to="/home" onClick={closeMenu} className="hover:text-blue-600">Home</Link>
          <Link to="/about" onClick={closeMenu} className="hover:text-blue-600">About Us</Link>
          <Link to="/services" onClick={closeMenu} className="hover:text-blue-600">Services</Link>
          <Link to="/psychologist" onClick={closeMenu} className="hover:text-blue-600">Psychologist</Link>
          <Link to="/blog" onClick={closeMenu} className="hover:text-blue-600">Blog</Link>
          <button
            onClick={openForm}
            className="mt-2 bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md shadow-sm"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {showForm && <Contact closeForm={closeForm} />}
    </header>
  );
};

export default Navbar;