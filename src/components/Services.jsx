// import React from "react";
// import Button from "../layouts/Button";
// import { RiMicroscopeLine } from "react-icons/ri";
// import ServicesList from "../layouts/ServicesList";
// import { MdHealthAndSafety } from "react-icons/md";
// import { FaHeartbeat } from "react-icons/fa";

// const Services = () => {
//   const services = [
//     { icon: <RiMicroscopeLine size={35} className=" text-backgroundColor" />, title: "Take Survey" },
//     { icon: <MdHealthAndSafety size={35} className=" text-backgroundColor" />, title: "View Document About Mental Health" },
//     { icon: <FaHeartbeat size={35} className=" text-backgroundColor" />, title: "Psychology Seminar" },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
//       {/* Phần Tiêu đề & Nút Bấm */}
//       <div className="flex flex-col items-center lg:flex-row justify-between">
//         <div>
//           <h1 className="text-4xl font-semibold text-center lg:text-start">
//             Our Services
//           </h1>
//           <p className="mt-2 text-center lg:text-start">
//             We provide top-notch medical services to ensure your well-being and health.
//           </p>
//         </div>
//         <div className="mt-4 lg:mt-0">
//           <Button title="See Services" />
//         </div>
//       </div>

//       Danh Sách Services
//       <div className="mt-10">
//         <ServicesList services={services} />
//       </div>
//     </div>
//   );
// };

// export default Services;

import React from "react";
import Button from "../layouts/Button";
import ServicesList from "../layouts/ServicesList";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16">
      {/* Phần Tiêu đề & Nút Bấm */}
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
          <p className="mt-2 text-center lg:text-start">
            We provide top-notch medical services to ensure your well-being and health.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button title="See Services" />
        </div>
      </div>

      {/* Danh Sách Services */}
      <div className="mt-10">
        <ServicesList />
      </div>
    </div>
  );
};

export default Services;
