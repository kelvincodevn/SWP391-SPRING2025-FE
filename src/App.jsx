import React from "react";
<<<<<<< HEAD
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> quynh-hoa1
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
<<<<<<< HEAD
import Doctors from "./components/Doctors";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="doctors">
          <Doctors />
        </div>

        <div id="blog">
          <Blogs />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
=======
import Psychologist from "./components/Psychologist";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import MentalHealthResources from "./components/MentalHealthResources";
import TestManagementSystem from "./components/SurveyManagement";
import MentalHealthSeminar from "./components/Seminar";
import Survey from "./components/SurveyTest";
import TestSelectionPage from "./components/test/TestOption";
import GAD7TestPage from "./components/test/GAD7TestPage";
import PHQ9TestPage from "./components/test/PHQ9TestPage";
import DASS21TestPage from "./components/test/DASS21TestPage";
import BeckTestPage from "./components/test/BECKTestPage";
const App = () => {
  return (
    <>
<Navbar /> 
<main>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/psychologist" element={<Psychologist />} />
    <Route path="/resources" element={<MentalHealthResources/>}/>
    <Route path="/surveymanage" element={<TestManagementSystem/>}/>
    <Route path="/surveytest" element={<Survey/>}/>
    <Route path="/testoption" element={<TestSelectionPage/>}/>
    <Route path="/seminar" element={<MentalHealthSeminar/>}/>
    <Route path="/blog" element={<Blogs />} />
    <Route path="/gad7" element={<GAD7TestPage/>}/>
    <Route path="/phq9" element={<PHQ9TestPage/>}/>
    <Route path="/dass21" element={<DASS21TestPage/>}/>
    <Route path="/beck" element={<BeckTestPage/>}/>
    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
</main>

<Footer />
</>
  )
};

export default App;

 
>>>>>>> quynh-hoa1
