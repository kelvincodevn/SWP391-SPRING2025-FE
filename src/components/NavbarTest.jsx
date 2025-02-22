import React, { useState } from 'react';

const NavbarT = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
        
          <img src="src/assests1/mental/medical-aid.png" alt="BookingCare Logo" className="h-8 mr-3" /> {/* Replace with your logo path */}
          <span className="self-center text-xl font-semibold whitespace-nowrap">FCare</span> {/* Optional text next to logo */}
        </a>

        {/* Mobile Menu Button (Hidden on larger screens) */}
        <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 ml-3 rounded-lg md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>

        {/* Navigation Links */}
        {/* <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-auto`} id="mobile-menu">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-none md:bg-white">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Tất cả</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Tại nhà</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Tại viện</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Sống khỏe</a>
            </li>
          </ul>
        </div> */}


        {/* Search Bar */}
        <div className="flex items-center ml-auto"> {/* ml-auto pushes it to the right */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Find doctor" />
          </div>
        </div>

        {/* Collaboration and Appointment Links (Right side) */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-700">Cooperate</a>
          <a href="#" className="text-gray-700 hover:text-blue-700">Appointment</a>
        </div>

      </div>
    </nav>
  );
};

export default NavbarT;