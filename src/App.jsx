import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Psychologist from "./components/Psychologist";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import MentalHealthResources from "./components/MentalHealthResources";
import SurveyManagement from "./components/SurveyManagement";
import MentalHealthSeminar from "./components/Seminar";

const App = () => {
  return (
    <>
<Navbar /> 

<main>
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/psychologist" element={<Psychologist />} />
    <Route path="/resources" element={<MentalHealthResources/>}/>
    <Route path="/survey" element={<SurveyManagement/>}/>
    <Route path="/seminar" element={<MentalHealthSeminar/>}/>
    <Route path="/blog" element={<Blogs />} />
    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
</main>

<Footer />
</>
  )
};

export default App;

 