import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Psychologist = () => {
  const data = [
    {
      img: "src/assets/Psychologist/nguyenthikim.jpg",
      name: "Nguyen Thi Kim",
      specialties: "Orthopedic Surgeon",
      contents: "Experienced in orthopedic surgery with over 10 years in the field.",
    },
    {
      img: "src/assets/Psychologist/nguyen thi tham. jpg.jpg",
      name: "Nguyen Thi Tham",
      specialties: "Cardiologist",
      contents: "Expert in heart diseases and cardiovascular treatments.",
    },
    {
      img: "src/assets/Psychologist/Than-Thi-Man-500x592-1.jpg",
      name: "Than Thi Man",
      specialties: "Pediatrician",
      contents: "Passionate about children's health and well-being.",
    },
    {
      img: "src/assets/Psychologist/1d7e7012c3053a5b6314_6680.jpg",
      name: "Nguyen Viet Chung",
      specialties: "Neurologist",
      contents: "Specialist in neurological disorders and treatments.",
    },
    {
      img: "src/assets/Psychologist/ThS.-Tran-Dang-Hung.jpg",
      name: "Tran Dang Hung",
      specialties: "Dermatologist",
      contents: "Skincare and dermatology expert with years of experience.",
    },
  ];

  const slider = useRef(null);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Psychologist
          </h1>
        </div>
        <div className="flex gap-5 mt-4 lg:mt-0">
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickPrev()}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
            onClick={() => slider.current.slickNext()}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Slider ref={slider} {...settings}>
          {data.map((e, index) => (
            <div
              className="h-[400px] text-black rounded-xl shadow-lg mb-2 cursor-pointer hover:shadow-xl transition duration-300"
              key={index}
              onClick={() => setSelectedPsychologist(e)}
            >
              <div className="overflow-hidden">
                <img
                  src={e.img}
                  alt={e.name}
                  className="h-64 w-full object-cover object-top rounded-t-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center p-4">
                <h1 className="font-semibold text-xl">{e.name}</h1>
                <h3 className="text-gray-600">{e.specialties}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Pop-up Modal */}
      {selectedPsychologist && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedPsychologist(null)}
            >
              <IoMdClose size={24} />
            </button>
            <img
              src={selectedPsychologist.img}
              alt={selectedPsychologist.name}
              className="h-56 w-full object-cover rounded-md mb-4"
            />
            <h1 className="text-2xl font-semibold mb-2">
              {selectedPsychologist.name}
            </h1>
            <h3 className="text-gray-600 mb-2">{selectedPsychologist.specialties}</h3>
            <p className="text-gray-700">{selectedPsychologist.contents}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Psychologist;