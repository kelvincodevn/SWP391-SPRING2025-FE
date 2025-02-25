

import React, { useState, useEffect } from "react";

const images = [
  "src/assests1/mental/health-pictures-a0piya67ugoow4mn.jpg",
  "src/assests1/mental/healthcare-europe-1080x675.jpg",
  "src/assests1/mental/istockphoto-1213515925-612x612.jpg"
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold mb-4">Caring for Your Mental Health</h1>
          <p className="text-lg max-w-2xl">
            Your mental well-being is just as important as your physical health. Let’s prioritize mental wellness together.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">Why Mental Health Matters</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          Mental health affects how we think, feel, and behave in daily life. It also influences how we handle stress, relate to others, and make decisions. Taking care of your mental health is a lifelong journey, and seeking help is a sign of strength.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-200 py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-semibold text-gray-900 mb-10">What People Say</h2>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 italic">“Seeking therapy changed my life. I’ve learned to manage my stress and emotions better.”</p>
            <h4 className="mt-4 font-semibold">- Alex Johnson</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 italic">“Taking care of my mental health has made me more confident and resilient.”</p>
            <h4 className="mt-4 font-semibold">- Sarah Williams</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

