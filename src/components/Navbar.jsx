import React, { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-scroll";
import Button from "../layouts/Button";
=======
import { Link } from "react-router-dom";
>>>>>>> quynh-hoa1
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
<<<<<<< HEAD
    <div className=" fixed w-full z-10 text-white">
      <div>
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
            <Link to="home" spy={true} smooth={true} duration={500}>
              <h1 className=" text-2xl font-semibold">WellnessVista.</h1>
=======
    <div className="bg-[white] text-black">
      <div>
          <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-fpt-orange shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
            <Link to="/home" spy={true} smooth={true} duration={500}>
              <img src="src/assests1/image/Logo_Trường_Đại_học_FPT.svg.png" alt="logo" className="w-25 h-20 mr-7" />
>>>>>>> quynh-hoa1
            </Link>
          </div>

          <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link
<<<<<<< HEAD
              to="home"
=======
              to="/home"
>>>>>>> quynh-hoa1
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
<<<<<<< HEAD
              to="about"
=======
              to="/about"
>>>>>>> quynh-hoa1
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About Us
            </Link>
            <Link
<<<<<<< HEAD
              to="services"
=======
              to="/services"
>>>>>>> quynh-hoa1
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
<<<<<<< HEAD
              to="doctors"
=======
              to="/psychologist"
>>>>>>> quynh-hoa1
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
<<<<<<< HEAD
              Doctors
            </Link>
            <Link
              to="blog"
=======
              Psychologist
            </Link>
            <Link
              to="/blog"
>>>>>>> quynh-hoa1
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Blog
            </Link>
          </nav>

          <div className=" hidden lg:flex">
            <button
<<<<<<< HEAD
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
=======
              className="bg-orange-500  text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
>>>>>>> quynh-hoa1
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
<<<<<<< HEAD
            to="home"
=======
            to="/home"
>>>>>>> quynh-hoa1
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
<<<<<<< HEAD
            to="about"
=======
            to="/about"
>>>>>>> quynh-hoa1
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
<<<<<<< HEAD
            to="services"
=======
            to="/services"
>>>>>>> quynh-hoa1
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
<<<<<<< HEAD
            to="doctors"
=======
            to="/doctors"
>>>>>>> quynh-hoa1
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
<<<<<<< HEAD
            Doctors
          </Link>
          <Link
            to="blog"
=======
            Psychologist
          </Link>
          <Link
            to="/blog"
>>>>>>> quynh-hoa1
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <div className=" lg:hidden">
<<<<<<< HEAD
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={openForm}
            >
              Contact Us
            </button>
=======
          <button
      className="w-full px-4 py-2 rounded-md bg-blue text-orange-500 font-semibold transition duration-300 ease-in-out hover:bg-gray-200"
      onClick={openForm}
    >
      Contact Us
    </button>
>>>>>>> quynh-hoa1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
