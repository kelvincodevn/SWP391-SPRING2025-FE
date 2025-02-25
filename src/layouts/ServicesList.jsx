// import React from "react";
// import ServicesCard from "./ServicesCard";

// const ServicesList = ({ services }) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-6 p-10">
//       {services.map((service, index) => (
//         <ServicesCard key={index} icon={service.icon} title={service.title} />
//       ))}
//     </div>
//   );
// };

// export default ServicesList;

// import React from "react";
// import ServicesCard from "./ServicesCard";

// const ServicesList = ({ services }) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-6 p-10">
//       {services.length > 0 && <ServicesCard icon={services[0].icon} title={services[0].title} />}
//       {services.length > 1 && <ServicesCard icon={services[1].icon} title={services[1].title} />}
//       {services.length > 2 && <ServicesCard icon={services[2].icon} title={services[2].title} />}
//     </div>
//   );
// };

// export default ServicesList;

import React from "react";
import ServicesCard from "./ServicesCard";
import { RiMicroscopeLine } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

const ServicesList = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-10">
      
      {/* Service 1 */}
      <div>
        <ServicesCard 
          icon={<RiMicroscopeLine size={35} className="text-backgroundColor" />} 
          title="Take Test"
          description="Participate in a quick test to assess your health."
          link="/testoption"
        />
      </div>

      {/* Service 2 */}
      <div>
        <ServicesCard 
          icon={<MdHealthAndSafety size={35} className="text-backgroundColor" />} 
          title="View Document About Mental Health"
          description="Access comprehensive mental health resources and documents."
          link="/resources"
        />
      </div>

      {/* Service 3 */}
      <div>
        <ServicesCard 
          icon={<FaHeartbeat size={35} className="text-backgroundColor" />} 
          title="Psychology Seminar"
          description="Join a seminar led by experts in mental health."
          link="/seminar"
        />
      </div>

    </div>
  );
};

export default ServicesList;

