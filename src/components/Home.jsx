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
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Hero Banner With Medical Style Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] bg-blue-50 border-b border-blue-200">
        <div className="flex items-center justify-center p-12 md:p-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Comprehensive Mental Health Care
            </h1>
            <p className="text-lg text-gray-700">
              Compassionate, confidential support from licensed professionals. Our mission is to provide you with quality mental wellness services.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src={images[currentImage]}
            alt="Mental Health"
            className="w-full h-full object-cover object-center border-l border-blue-200"
          />
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 px-6 md:px-24 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="src/assests1/mental/Image+Post+Template+(63).png"
              alt="Mental health awareness"
              className="rounded-lg shadow-lg border border-gray-200 w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Why Mental Health Is Essential</h2>
            <p className="text-md text-gray-700 leading-loose">
              Good mental health helps you cope with life's challenges, build strong relationships, and achieve your goals.
              Whether you're dealing with anxiety, depression, or simply want someone to talk to — we're here to help.
            </p>
            <ul className="mt-6 space-y-3 text-blue-700 font-medium">
              <li>✔ Confidential Consultations</li>
              <li>✔ Licensed Therapists</li>
              <li>✔ In-person and Online Sessions</li>
              <li>✔ Personalized Wellness Plans</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Clean Hospital Look */}
      <section className="py-20 bg-gray-50 px-6 md:px-24 border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-900 mb-12">Patient Testimonials</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "Seeking therapy changed my life. I’ve learned to manage my stress and emotions better.",
                author: "Alex Johnson"
              },
              {
                text: "Taking care of my mental health has made me more confident and resilient.",
                author: "Sarah Williams"
              },
              {
                text: "The support I received was transformative. I feel more in control of my emotions.",
                author: "James Anderson"
              },
              {
                text: "I didn’t realize how much therapy could help me understand myself better.",
                author: "Emma Clark"
              },
              {
                text: "The therapists were understanding and professional. I feel heard and supported.",
                author: "Linda Nguyen"
              },
              {
                text: "It felt like a safe space where I could talk freely and heal. Highly recommended.",
                author: "Carlos Ramirez"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-300 text-left shadow-sm hover:shadow-md">
                <p className="text-gray-700 italic mb-4">“{item.text}”</p>
                <h4 className="text-blue-800 font-semibold">- {item.author}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
