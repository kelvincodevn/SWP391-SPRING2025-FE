import React from "react";
import ServicesCard from "./ServicesCard";
import { RiMicroscopeLine, RiPsychotherapyFill } from "react-icons/ri";
import { MdHealthAndSafety, MdPsychology } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa"; // New icon for the Program card

const ServicesList = () => {
  return (
    <section className="bg-blue-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServicesCard
            icon={<RiMicroscopeLine size={40} className="text-blue-700" />}
            title="Take Test"
            description="Participate in a quick test to assess your health."
            link="/testoption"
          />

          <ServicesCard
            icon={<RiMicroscopeLine size={40} className="text-blue-700" />}
            title="Take Survey"
            description="Participate in a quick test to assess your health."
            link="/survey-selection"
          />

          <ServicesCard
            icon={<MdHealthAndSafety size={40} className="text-blue-700" />}
            title="View Document About Mental Health"
            description="Access comprehensive mental health resources and documents."
            link="/resources"
          />

          {/* <ServicesCard
            icon={<FaHeartbeat size={40} className="text-blue-700" />}
            title="Psychology Seminar"
            description="Join a seminar led by experts in mental health."
            link="/seminar"
          /> */}

          <ServicesCard
            icon={<MdPsychology size={40} className="text-blue-700" />}
            title="Appointment"
            description="Book an appointment with our excellent psychologist"
            link="/appointment"
          />

          <ServicesCard
            icon={<FaRegCalendarAlt size={40} className="text-blue-700" />}
            title="Program"
            description="Join our structured mental health programs tailored to your needs."
            link="/programu"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
