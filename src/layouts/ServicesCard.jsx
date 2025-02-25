<<<<<<< HEAD
import React from "react";

const ServicesCard = ({ icon, title }) => {
  return (
    <div className=" group flex flex-col items-center text-center gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out">
      <div className=" bg-[#d5f2ec] p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc]">
        {icon}
      </div>
      <h1 className=" font-semibold text-lg">{title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        praesentium asperiores unde veniam, perspiciatis neque!
      </p>

      <h3 className=" text-backgroundColor cursor-pointer hover:text-[#ade9dc] transition duration-300 ease-in-out">
        Learn more
      </h3>
=======
// import React from "react";
// import { Link } from "react-router-dom";

// const ServicesCard = ({ icon, title }) => {
//   return (
//     <div className=" group flex flex-col items-center text-center gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out">
//       <div className=" bg-[#d5f2ec] p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc]">
//         {icon}
//       </div>
//       <h1 className=" font-semibold text-lg">{title}</h1>
//       <p>
//       Take a survey
//       </p>

//       <h3 className=" text-backgroundColor cursor-pointer hover:text-[#ade9dc] transition duration-300 ease-in-out">
//       <Link target='_blank' to='/resources'>Learn more</Link>
//       </h3>
//     </div>
    
    
  
//   );
// };

// export default ServicesCard;

// import React from "react";
// import { Link } from "react-router-dom";

// const ServicesCard = ({ icon, title, description = "Learn more about this service", link = "/resources" }) => {
//   return (
//     <div className="group flex flex-col items-center text-center gap-4 w-full lg:w-1/3 p-5 shadow-lg rounded-lg cursor-pointer transition duration-300 ease-in-out lg:hover:-translate-y-3">
      
//       {/* Icon Section */}
//       <div className="bg-[#d5f2ec] p-3 rounded-full transition duration-300 ease-in-out group-hover:bg-[#ade9dc]">
//         {icon}
//       </div>

//       {/* Title Section */}
//       <div>
//         <h1 className="font-semibold text-lg">{title}</h1>
//       </div>

//       {/* Description Section */}
//       <div>
//         <p className="text-gray-600">{description}</p>
//       </div>

//       {/* Link Section */}
//       <div>
//         <Link 
//           to={link} 
//           target="_blank" 
//           className="text-backgroundColor hover:text-[#ade9dc] transition duration-300 ease-in-out"
//         >
//           Learn more
//         </Link>
//       </div>

//     </div>
//   );
// };

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

>>>>>>> quynh-hoa1
    </div>
  );
};

export default ServicesCard;
<<<<<<< HEAD
=======




>>>>>>> quynh-hoa1
