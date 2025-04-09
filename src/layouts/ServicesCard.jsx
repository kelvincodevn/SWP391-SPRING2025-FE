// export default ServicesCard;
import React from "react";
import { Link } from "react-router-dom";

const ServicesCard = ({ icon, title, description, link }) => {
  return (
    <div className="
      flex flex-col items-center justify-between 
      w-full max-w-xs h-[320px] p-5 
      bg-gradient-to-br from-orange-50 to-white 
      shadow-md rounded-xl border border-gray-200 
      transition-all duration-300 ease-in-out 
      transform hover:scale-105 hover:shadow-lg hover:brightness-110">
      
      {/* Icon Section */}
      <div className="
        flex items-center justify-center 
        w-14 h-14 bg-white rounded-full 
        shadow-md transition-all duration-300 
        group-hover:bg-orange-200">
        {icon}
      </div>

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* Description Section */}
      <div className="text-center flex-1">
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Link Section */}
      <div>
        <Link 
          to={link} 
          target="_blank" 
          className="
            text-orange-700 font-semibold text-sm 
            hover:text-orange-900 transition duration-300">
          Learn more →
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
