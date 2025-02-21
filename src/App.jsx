import React from "react";

import Navbar from "./components/Navbar";

import Home from "./components/Home";

import About from "./components/About";

import Services from "./components/Services";
import Psychologist from "./components/Psychologist";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import MentalHealthResources from "./components/MentalHealthResources";
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes, useLocation } from "react-router-dom";
import UserProfile from "./components/Profile";
import UserProfile1 from "./components/Profile1";
import UserProfile2 from "./components/Profile2";
import TestManagementSystem from "./components/Test1";
import TestManagementSystem2 from "./components/Test3";
import Survey from "./components/SurveyTest";
import MentalHealthSeminar from "./components/Seminar";
import LR from "./test_UI/Login_Register";
import AdminLayout from "./layouts/adminLayout";
import ManagerDashboard from "./layouts/managerDashboard";
import ManageTest from "./pages/manager/manage-test";
import ManageSurvey from "./pages/manager/manage-survey";
import ManageUser from "./pages/manager/manage-user";
import ManageProgram from "./pages/manager/manage-program";
import ManageOverview from "./pages/manager/manage-overview";
import RegistrationPage from "./pages/register.jsx";
import LoginPage from "./pages/login/index.jsx";

const App = () => {

  const location = useLocation(); // Get the current route

  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ["/register", "/login", "/dashboard",
     "dashboard1", "/dashboard/test", "/dashboard/survey", "/dashboard/user", "/dashboard/program",
    "/dashboard/overview"];

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
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistration />} /> */}
          {/* <Route path="/LR" element={<LR />} /> */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          <Route path="/dashboard1" element={<ManagerDashboard />} />
          {/* <Route path="/dashboard" element={<AdminLayout />} /> */}
          
          
          {/* Dashboard Layout with Nested Routes */}
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route path="overview" element={<ManageOverview />} />
            <Route path="user" element={<ManageUser />} />
            <Route path="test" element={<ManageTest />} />
            <Route path="survey" element={<ManageSurvey />} />
            <Route path="program" element={<ManageProgram />} />
          </Route>

          

        </Routes>
      </main>

      {/* Render Footer only if the current path is not in the hide list */}
      {!hideNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
};

export default App;

 