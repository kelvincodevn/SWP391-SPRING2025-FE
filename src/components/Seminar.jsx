import React, { useState } from "react";

const seminarsAttended = [
  {
    title: "Mental Health Awareness Summit",
    date: "March 10, 2023",
    location: "Wellness Center, NYC",
    description: "A summit discussing the importance of mental health awareness and early intervention strategies."
  },
  {
    title: "Mindfulness & Stress Management Workshop",
    date: "July 25, 2023",
    location: "Online Webinar",
    description: "A hands-on workshop focusing on mindfulness techniques for reducing stress."
  }
];

const upcomingSeminars = [
  {
    title: "Coping Strategies for Anxiety",
    date: "March 15, 2024",
    location: "Grand Hall, Wellness Center",
    description: "An interactive session with experts discussing effective coping mechanisms for anxiety management."
  },
  {
    title: "The Future of Mental Health Care",
    date: "June 20, 2024",
    location: "Health & Wellness Expo, LA",
    description: "A panel discussion on emerging trends and innovations in mental health care."
  }
];

const MentalHealthSeminar = () => {
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 text-gray-800 py-10 px-6 md:px-16">
      <h1 className="text-5xl font-bold text-center mb-10 text-indigo-700">Mental Health Seminars</h1>
      
      {selectedSeminar ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto border-l-8 border-indigo-500">
          <button
            className="mb-4 text-indigo-600 font-semibold underline"
            onClick={() => setSelectedSeminar(null)}
          >
            ← Back to list
          </button>
          <h2 className="text-3xl font-bold text-indigo-700">{selectedSeminar.title}</h2>
          <p className="text-gray-700 mt-2"><strong>Date:</strong> {selectedSeminar.date}</p>
          <p className="text-gray-700"><strong>Location:</strong> {selectedSeminar.location}</p>
          <p className="text-gray-700 mt-4">{selectedSeminar.description}</p>
        </div>
      ) : (
        <>
          {/* Attended Seminars */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Seminars Attended</h2>
            <div className="space-y-6">
              {seminarsAttended.map((seminar, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 border-l-8 border-indigo-500" onClick={() => setSelectedSeminar(seminar)}>
                  <h3 className="text-xl font-bold text-indigo-700">{seminar.title}</h3>
                  <p className="text-gray-700"><strong>Date:</strong> {seminar.date}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {seminar.location}</p>
                  <p className="text-indigo-600 font-semibold underline mt-2">View Details</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Seminars */}
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Upcoming Seminars</h2>
            <div className="space-y-6">
              {upcomingSeminars.map((seminar, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-indigo-50 border-l-8 border-green-500" onClick={() => setSelectedSeminar(seminar)}>
                  <h3 className="text-xl font-bold text-green-700">{seminar.title}</h3>
                  <p className="text-gray-700"><strong>Date:</strong> {seminar.date}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {seminar.location}</p>
                  <p className="text-green-600 font-semibold underline mt-2">View Details</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MentalHealthSeminar;
