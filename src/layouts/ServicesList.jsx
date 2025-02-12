import React from "react";
import ServicesCard from "./ServicesCard";

const ServicesList = ({ services }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-10">
      {services.map((service, index) => (
        <ServicesCard key={index} icon={service.icon} title={service.title} />
      ))}
    </div>
  );
};

export default ServicesList;
