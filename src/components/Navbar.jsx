import React, { useState } from "react";
import Button from "../layouts/Button";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";
import { Link } from "react-router-dom";



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
          <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-fpt-orange shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
            <Link to="/" spy={true} smooth={true} duration={500}>
              <img src="src/assests1/image/Logo_Trường_Đại_học_FPT.svg.png" alt="logo" className="w-25 h-20 mr-7" />
            </Link>
          </div>

          
          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link to="/" className="hover:text-hoverColor transition-all cursor-pointer"> {/* Use react-router-dom's Link */}
              Home
            </Link>
            <Link to="/about" className="hover:text-hoverColor transition-all cursor-pointer"> {/* Use react-router-dom's Link */}
              About Us
            </Link>
            <Link to="/services" className="hover:text-hoverColor transition-all cursor-pointer"> {/* Use react-router-dom's Link */}
              Services
            </Link>
            <Link to="/psychologist" className="hover:text-hoverColor transition-all cursor-pointer"> {/* Use react-router-dom's Link */}
              Psychologist
            </Link>
            <Link to="/blog" className="hover:text-hoverColor transition-all cursor-pointer"> {/* Use react-router-dom's Link */}
              Blog
            </Link>        
            <Link to="/register" className="hover:text-hoverColor transition-all cursor-pointer">
              Register
            </Link>
            <Link to="/login" className="hover:text-hoverColor transition-all cursor-pointer">
              Login
            </Link>
          </nav>

          <div className=" hidden lg:flex">
            <button
              className="bg-brightColor text-lg px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
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
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            to="doctors"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Psychologist
          </Link>
          <Link
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>

          <div className=" lg:hidden">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={openForm}
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
