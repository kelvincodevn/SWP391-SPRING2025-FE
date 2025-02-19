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

import { createBrowserRouter, Outlet, Route, RouterProvider, Routes, useLocation } from "react-router-dom";
import UserProfile from "./components/Profile";
import UserProfile1 from "./components/Profile1";
import UserProfile2 from "./components/Profile2";
import TestManagementSystem from "./components/Test1";
import TestManagementSystem2 from "./components/Test3";
import Survey from "./components/SurveyTest";
import MentalHealthSeminar from "./components/Seminar";
import LR from "./test_UI/Login_Register";
import RegistrationPage from "./test_UI/Login_Register2";
import LoginPage1 from "./test_UI/LoginP";

const App = () => {

  const location = useLocation(); // Get the current route

  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ["/register", "/register1", "/LR", "/login1"];

  return (
    <>
      {/* Render Navbar only if the current path is not in the hide list */}
      {!hideNavbarFooterRoutes.includes(location.pathname) && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/psychologist" element={<Psychologist />} />
          <Route path="/resources" element={<MentalHealthResources />} />
          <Route path="/surveymanage" element={<TestManagementSystem />} />
          <Route path="/surveytest" element={<Survey />} />
          <Route path="/seminar" element={<MentalHealthSeminar />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/profile" element={<UserProfile2 />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/LR" element={<LR />} />
          <Route path="/register1" element={<RegistrationPage />} />
          <Route path="/login1" element={<LoginPage1 />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </main>

      {/* Render Footer only if the current path is not in the hide list */}
      {!hideNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
};

export default App;

 