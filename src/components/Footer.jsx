import React from "react";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-800 rounded-t-3xl mt-8 border-t border-blue-100">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        {/* Brand & Intro */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h1 className="font-semibold text-xl pb-4 text-blue-900">FCare Mental Health Clinic</h1>
          <p className="text-sm leading-relaxed">
            FCare is a modern mental health clinic providing high-quality psychiatric care, psychological therapy, and emotional support to individuals and families. We are committed to your mental well-being.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <h2 className="font-medium text-lg pb-3 text-blue-800">Quick Navigation</h2>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/about" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">About Us</Link>
            <Link to="/services" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Our Services</Link>
            <Link to="/psychologist" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Our Specialists</Link>
            <Link to="/blog" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Health Blog</Link>
          </nav>
        </div>

        {/* Service Highlights */}
        <div className="mb-6 md:mb-0">
          <h2 className="font-medium text-lg pb-3 text-blue-800">Clinical Services</h2>
          <nav className="flex flex-col gap-2 text-sm">
            <Link to="/services" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Psychiatric Evaluation</Link>
            <Link to="/services" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Individual Therapy</Link>
            <Link to="/services" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Family Counseling</Link>
            <Link to="/services" spy={true} smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Crisis Intervention</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/4">
          <h2 className="font-medium text-lg pb-3 text-blue-800">Contact Information</h2>
          <address className="not-italic text-sm leading-relaxed">
            FCare Mental Health Clinic<br />
            456 Harmony Avenue,<br />
            Wellness District, Ho Chi Minh City<br />
            <br />
            Email: <a href="mailto:info@fcareclinic.vn" className="text-blue-700 hover:underline">info@fcareclinic.vn</a><br />
            Hotline: <a href="tel:+842838889999" className="text-blue-700 hover:underline">+84 28 3888 9999</a><br />
            Operating Hours: Mon - Sat | 8:00 AM - 6:00 PM
          </address>
        </div>
      </div>

      <div className="text-center py-4 border-t border-blue-100 text-sm text-gray-600">
        © 2025 FCare Mental Health Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
