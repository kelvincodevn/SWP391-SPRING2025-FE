import React, { useState } from 'react';

const schoolProfile = {
  name: "FCare Mental Health",
  services: [
    "Individual Therapy",
    "Family Counseling",
    "Emergency Crisis Intervention"
  ],
  hours: "Monday - Friday, 8:00 AM - 6:00 PM",
  features: [
    "Confidential Consultation Rooms",
    "Accessibility for All Patients",
    "Private Waiting Areas"
  ],
  programs: [
    "Stress Management Workshops",
    "Mindfulness & Meditation Sessions"
  ],
  contact: {
    phone: "+84 28 3888 9999",
    email: "support@fcareclinic.vn",
    address: "456 Harmony Avenue, Wellness District, Ho Chi Minh City"
  }
};

const SchoolProfile = () => {
  

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Banner */}
      <div className="relative w-full h-[320px] md:h-[400px] bg-cover bg-center" style={{ backgroundImage: `url('src/assests1/mental/Mental-health-blog-.png')` }}>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        <div className="relative z-10 flex justify-center items-center w-full h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">About FCare</h1>
        </div>
      </div>

      {/* Main Info Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            FCare Mental Health Clinic provides compassionate, confidential, and personalized care from licensed professionals
            in a welcoming, clinic-standard environment. We specialize in managing mental wellness through individual and family therapy.
          </p>
        </section>

        {/* Grid Section */}
        <section className="grid md:grid-cols-3 gap-10">
          {/* Services */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Our Services</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
              {schoolProfile.services.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-xs text-gray-500 mt-3 italic">Available: {schoolProfile.hours}</p>
          </div>

          {/* Facilities */}
          <div className="bg-white border border-green-100 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Facilities</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
              {schoolProfile.features.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          {/* Programs */}
          <div className="bg-white border border-yellow-100 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-yellow-700 mb-4">Wellness Programs</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
              {schoolProfile.programs.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </section>

        
        {/* Contact Info */}
        <section className="mt-20 bg-blue-200 py-10 px-4 rounded-xl">
  <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Contact Us</h2>
  <div className="text-center text-sm text-gray-700 space-y-2">
    <p><strong>Phone:</strong> {schoolProfile.contact.phone}</p>
    <p>
      <strong>Email:</strong>{' '}
      <a href={`mailto:${schoolProfile.contact.email}`} className="text-blue-600 hover:underline">
        {schoolProfile.contact.email}
      </a>
    </p>
    <p><strong>Address:</strong> {schoolProfile.contact.address}</p>
  </div>
</section>

      </div>
    </div>
  );
};

export default SchoolProfile;