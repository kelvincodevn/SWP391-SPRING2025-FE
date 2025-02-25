<<<<<<< HEAD
import React from "react";
import img from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
          labore rerum tempore tenetur commodi natus quos itaque voluptatum
          repudiandae nostrum accusantium vero voluptate aspernatur totam,
          laboriosam aut, et quae consequatur?
        </p>
        <p className="text-justify lg:text-start">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quia
          suscipit illum, numquam incidunt nostrum dolor officia doloremque
          cupiditate, placeat explicabo sed iure atque neque quidem ipsam!
          Dolor, minus reiciendis.
        </p>
        <p className="text-justify lg:text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, illum.
          Accusantium ab expedita veniam nobis aut, in rerum repellendus!
          Exercitationem libero recusandae corrupti accusantium reiciendis in
          placeat illo maxime ea.
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
=======
import React, { useState } from 'react';

const schoolProfile = {
  name: "FPT UNIVERSITY",
  counselorAvailable: true,
  services: ["One-on-one counseling", "Group therapy", "Crisis intervention"],
  hours: "Mon-Fri, 9 AM - 5 PM",
  initiatives: ["Anti-bullying campaign", "Stress management workshops"],
  facilities: ["Counseling rooms", "Special needs accessibility", "Study spaces"],
  workshops: ["Mindfulness training", "Test anxiety management"],
  contact: {
    counselorPhone: "555-1234",
    counselorEmail: "counselor@greenvalley.edu",
    emergencyPhone: "911",
  }
};

const SchoolProfile = () => {
  const [appointment, setAppointment] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div>
      {/* Header with background image */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('src/assests1/header.jpg')` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center w-full h-full">
          <h1 className="text-4xl md:text-5xl font-semibold text-white text-center">About Us</h1>
        </div>
      </div>

      {/* Content sections */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {schoolProfile.counselorAvailable && (
          <div className="mb-8">
            <h4 className="text-2xl font-semibold mb-4 text-blue-600">Counseling Services</h4>
            <p>{schoolProfile.services.join(", ")}</p>
            <p className="mt-2 text-gray-700">Hours: {schoolProfile.hours}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Special Initiatives */}
          <div className="flex flex-col items-center bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-indigo-200">
            <div className="bg-indigo-500 text-white p-4 rounded-full mb-4">
              <span className="text-3xl">🎓</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">Special Initiatives</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {schoolProfile.initiatives.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div className="flex flex-col items-center bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-green-200">
            <div className="bg-green-500 text-white p-4 rounded-full mb-4">
              <span className="text-3xl">🏫</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-green-600">Facilities</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {schoolProfile.facilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Workshops & Seminars */}
          <div className="flex flex-col items-center bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-yellow-200">
            <div className="bg-yellow-500 text-white p-4 rounded-full mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-600">Workshops & Seminars</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {schoolProfile.workshops.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h4 className="text-2xl font-semibold mb-4 text-blue-600">Contact Information</h4>
          <p className="text-gray-700">Counselor Phone: {schoolProfile.contact.counselorPhone}</p>
          <p className="text-gray-700">Counselor Email: {schoolProfile.contact.counselorEmail}</p>
          <p className="text-gray-700">Emergency Contact: {schoolProfile.contact.emergencyPhone}</p>
          
        </div>

        {/* Schedule an Appointment section */}
        <div className="mb-8">
          <h4 className="text-2xl font-semibold mb-4 text-green-600">Schedule an Appointment</h4>
          <input 
            type="text" 
            value={appointment}
            onChange={(e) => setAppointment(e.target.value)}
            placeholder="Enter your name" 
            className="w-full p-3 border rounded-md shadow-sm mb-4"
          />
          <button 
            onClick={() => alert(`Appointment scheduled for ${appointment}`)}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Schedule Appointment
          </button>
        </div>

        {/* Leave Feedback section */}
        <div>
          <h4 className="text-2xl font-semibold mb-4 text-red-600">Leave Feedback</h4>
          <textarea 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            placeholder="Your feedback..." 
            className="w-full p-4 border rounded-md shadow-sm mb-4"
          />
          <button 
            onClick={() => alert(`Feedback submitted: ${feedback}`)}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </div>
>>>>>>> quynh-hoa1
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default About;
=======
export default SchoolProfile;
>>>>>>> quynh-hoa1
