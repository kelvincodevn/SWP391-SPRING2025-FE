import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Psychologist = () => {
  const data = [
    {
      img: "src/assests1/Psychologist/nguyenthikim.jpg",
      name: "Nguyen Thi Kim",
      hospital: "Ho Chi Minh City Hospital",
      specialties: "Orthopedic Surgery",
      experience: "10+ years",
      contents: "Expert in trauma, joint surgery, and rehabilitation.",
      education: "MD, University of Medicine Pham Ngoc Thach",
      certifications: "Certified Orthopedic Specialist, VMO License",
      achievements: "Top 5 Surgeon Awards 2022",
      notes: "Focus on rehabilitation and elderly bone care."
    },
    {
      img: "src/assests1/Psychologist/nguyen thi tham. jpg.jpg",
      name: "Nguyen Thi Tham",
      hospital: "Central Heart Institute",
      specialties: "Cardiology",
      experience: "8 years",
      contents: "Specializes in cardiovascular disease treatment and patient care.",
      education: "MD, Hanoi Medical University",
      certifications: "Cardiology Residency, National Heart Board",
      achievements: "HeartCare Innovation Grant 2021",
      notes: "Strong focus on preventive cardiology and lifestyle coaching."
    },
    {
      img: "src/assests1/Psychologist/Than-Thi-Man-500x592-1.jpg",
      name: "Than Thi Man",
      hospital: "National Pediatric Center",
      specialties: "Pediatrics",
      experience: "12 years",
      contents: "Dedicated to holistic child healthcare and development.",
      education: "MD, Hue University of Medicine and Pharmacy",
      certifications: "Pediatric Care Specialist Certification",
      achievements: "Outstanding Pediatrician Award 2020",
      notes: "Advocate for early childhood health education."
    },
    {
      img: "src/assests1/Psychologist/1d7e7012c3053a5b6314_6680.jpg",
      name: "Nguyen Viet Chung",
      hospital: "Brain & Spine Hospital",
      specialties: "Neurology",
      experience: "15 years",
      contents: "Focuses on treating neurological disorders and nervous system care.",
      education: "MD, Ho Chi Minh University of Medicine and Pharmacy",
      certifications: "Board Certified Neurologist",
      achievements: "Vietnam Neuroscience Leader Award",
      notes: "Specializes in Parkinson’s and neurodegenerative conditions."
    },
    {
      img: "src/assests1/Psychologist/ThS.-Tran-Dang-Hung.jpg",
      name: "Tran Dang Hung",
      hospital: "National Skincare Clinic",
      specialties: "Dermatology",
      experience: "9 years",
      contents: "Specialist in skin diseases and cosmetic dermatology.",
      education: "MD, Hanoi University of Medicine",
      certifications: "Certified Dermatologist & Laser Therapy Expert",
      achievements: "Dermatology Excellence Award 2023",
      notes: "Well-versed in acne treatment and aesthetic skin care."
    },
  ];

  const slider = useRef(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-blue-800 text-center lg:text-left">
            Psychologist
          </h2>
          <div className="flex gap-3 mt-5 lg:mt-0">
            <button
              onClick={() => slider.current.slickPrev()}
              className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-300 transition"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={() => slider.current.slickNext()}
              className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-300 transition"
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>

        <Slider ref={slider} {...settings}>
  {data.map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer p-6 mx-2"
      onClick={() => setSelectedPsychologist(item)}
    >
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <img
          src={item.img}
          alt={item.name}
          className="h-40 w-40 object-cover rounded-full border-4 border-blue-200"
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-blue-800">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.specialties}</p>
          <p className="text-gray-500 text-sm mb-1">{item.hospital}</p>
          <p className="text-blue-600 text-sm mb-2">Experience: {item.experience}</p>
          
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>About:</strong> {item.contents}</p>
            <p><strong>Education:</strong> {item.education}</p>
            <p><strong>Certifications:</strong> {item.certifications}</p>
            <p><strong>Achievements:</strong> {item.achievements}</p>
            <p><strong>Notes:</strong> {item.notes}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</Slider>

      </div>

      {/* Modal */}
      {selectedPsychologist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-md w-full rounded-xl p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedPsychologist(null)}
            >
              <IoMdClose size={24} />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedPsychologist.img}
                alt={selectedPsychologist.name}
                className="h-40 w-40 object-cover rounded-full border-4 border-blue-200 mb-4"
              />
              <h2 className="text-2xl font-bold text-blue-800 mb-1">
                {selectedPsychologist.name}
              </h2>
              <p className="text-gray-600 text-sm mb-1">{selectedPsychologist.specialties}</p>
              <p className="text-gray-500 text-sm mb-1">{selectedPsychologist.hospital}</p>
              <p className="text-blue-600 text-sm mb-4">
                Experience: {selectedPsychologist.experience}
              </p>
              <p className="text-gray-700 text-sm text-justify">
                {selectedPsychologist.contents}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Psychologist;
