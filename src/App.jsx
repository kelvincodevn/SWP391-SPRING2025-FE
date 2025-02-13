import React from "react";

import Navbar from "./components/Navbar";

import Home from "./components/Home";

import About from "./components/About";

import Services from "./components/Services";

import Psychologist from "./components/Psychologist";

import Blogs from "./components/Blogs";

import Footer from "./components/Footer";

import MentalHealthResources from "./components/MentalHealthResources";

import LoginPage from "./components/Login";

import UserRegistration from "./components/Register";

import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";
import UserProfile from "./components/Profile";
import UserProfile1 from "./components/Profile1";
import UserProfile2 from "./components/Profile2";
import TestManagementSystem from "./components/Test1";
import TestManagementSystem2 from "./components/Test3";
import Survey from "./components/SurveyTest";
import MentalHealthSeminar from "./components/Seminar";

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
    <Route path="/seminar" element={<MentalHealthSeminar/>}/>
    <Route path="/blog" element={<Blogs />} />
    <Route path="/profile" element={<UserProfile2 />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<UserRegistration />} />
    <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
</main>

<Footer />
</>
  )
};

export default App;

 