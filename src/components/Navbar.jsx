import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="bg-[white] text-black">
      <div>
      <div className="flex flex-row justify-between items-center p-5 md:px-32 px-5 bg-fpt-orange shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"> {/* Added items-center */}
        <div className="flex items-center cursor-pointer">
            <Link to="/home" spy={true} smooth={true} duration={500}>
              <img src="src/assests1/image/Logo_Trường_Đại_học_FPT.svg.png" alt="logo" className="w-25 h-20 mr-7" />
            </Link>
          </div>

          <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="/home"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About 
            </Link>
            <Link
              to="/services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="/psychologist"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Psychologist
            </Link>
            <Link
              to="/blog"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Blog
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4"> {/* Use space-x-4 for horizontal spacing */}
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out">
              Register
            </Link>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={openForm}
            >
              Contact Us
            </button>
          </div>

          {showForm && <Contact closeForm={closeForm} />}

          <div className=" lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="/home"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="/services"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            to="/doctors"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Psychologist
          </Link>
          <Link
            to="/blog"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <div className="flex flex-col gap-4 mt-4"> {/* Added margin-top and flex-col for vertical alignment */}
            <Link to="/login" className="w-full px-4 py-2 rounded-md bg-blue-500 text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-700" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/register" className="w-full px-4 py-2 rounded-md bg-green-500 text-white font-semibold transition duration-300 ease-in-out hover:bg-green-700" onClick={closeMenu}>
              Register
            </Link>
            <button
              className="w-full px-4 py-2 rounded-md bg-orange-500 text-white font-semibold transition duration-300 ease-in-out hover:bg-orange-700"
              onClick={() => { openForm(); closeMenu(); }} // Close menu after clicking
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
