import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Psychologist from "./components/Psychologist";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import MentalHealthResources from "./components/MentalHealthResources";
import { createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes, useLocation } from "react-router-dom";
import UserProfile from "./components/Profile";
import UserProfile1 from "./components/Profile1";
import UserProfile2 from "./components/Profile2";
import TestManagementSystem from "./components/Test1";
import TestManagementSystem2 from "./components/Test3";
import Survey from "./components/SurveyTest";
import MentalHealthSeminar from "./components/Seminar";
// import LR from "./test_UI/Login_Register";
import AdminLayout from "./layouts/adminLayout";
import ManagerDashboard from "./layouts/managerDashboard";
import ManageTest from "./pages/manager/manage-test";
import ManageSurvey from "./pages/manager/manage-survey";
import ManageUser from "./pages/manager/manage-user";
import ManageProgram from "./pages/manager/manage-program";
import ManageOverview from "./pages/manager/manage-overview";
import RegistrationPage from "./pages/register.jsx";
import LoginPage from "./pages/login/index.jsx";
// import Layout from "./components/LayoutDash.jsx";
import ManagerProfile from "./pages/manager/manage-profile.jsx";
import DoubleNavbar from "./components/NavbarCombine.jsx";
import RegistrationPage1 from "./pages/register.jsx/registerpage.jsx";
import PsychologistLayout from "./layouts/psychologistLayout.jsx";
// import PsychologistOverview from "./pages/psychologist/psycho-overview.jsx";
// import PsychologistProfile from "./pages/psychologist/psycho-profile.jsx";
// import PsychologistBooking from "./pages/psychologist/psycho-booking.jsx";
// import PsychologistClients from "./pages/psychologist/psycho-clients.jsx";
import RegistrationPage2 from "./pages/register.jsx/registerTest.jsx";
import TestList from "./pages/mentalhealth-test/testlist.jsx";
import Dass21TestPage from "./pages/mentalhealth-test/dass21.jsx";
import TestLayout from "./pages/mentalhealth-test/testpage.jsx";
import TestQuestionAndAnswer from "./pages/mentalhealth-test/testrun.jsx";
// import GAD7TestPage from "./pages/testpage/GAD_7TestPage.jsx";
// import PHQ9TestPage from "./pages/testpage/PHQ_9TestPage.jsx";
// import DASS21TestPage from "./pages/testpage/DASS21TestPage.jsx";
// import BeckTestPage from "./pages/testpage/BECKTestPage.jsx";
import TestSelectionPage from "./pages/testpage/TestOption.jsx";
// import ProfileSettings from "./pages/student/ProfileSettings.jsx";
import ManagerProfile2 from "./pages/manager/manage-profile.jsx";
import ManageProgram1 from "./pages/manager/manage-program1.jsx";
// import Appointment1 from "./pages/appointment/Appointment1.jsx";
// import ConfirmationPage from "./pages/appointment/Confirm.jsx";
// import AppointmentForm from "./pages/appointment/AppointmentForm.jsx";
import GeneralTestPage from "./pages/testpage/GeneralTestPage.jsx";
import UserOverview from "./pages/user/user-overview.jsx";
import UserNProfile from "./pages/user/user-profile.jsx";

// import UserTestHistory from "./pages/user/user-testhistory.jsx";
import ManageTestScore from "./pages/manager/manage-testscore.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import { Layout } from "antd";
import AppointmentForm from "./components/appointment/AppointmentForm.jsx";
import ConfirmationPage from "./components/appointment/ConfirmationPage.jsx";
import Appointment from "./components/appointment/Appointment.jsx";
import PaymentSuccess from "./components/appointment/PaymentSuccess.jsx";
import PaymentCallback from "./components/appointment/PaymentCallback.jsx";
import Payment from "./components/appointment/Payment.jsx";
import PsychologistOverview from "./pages/psychologist/psychologist-overview.jsx";
import PsychologistClients from "./pages/psychologist/psychologist-client.jsx";
import PsychologistProfile from "./pages/psychologist/psychologist-profile.jsx";
import PsychologistBooking from "./pages/psychologist/psychologist-booking.jsx";
import ManageClient from "./pages/manager/manage-client.jsx";
import ManagePsychologist from "./pages/manager/manage-psychologist.jsx";
import PsychologistSlot from "./pages/psychologist/psychologist-slot.jsx";
// import UserBooking from "./pages/user/user-booking.jsx";
import AppointmentTest from "./components/appointment/AppointmentTest.jsx";
import AppointmentFormTest from "./components/appointment/AppointmentFormTest.jsx";
import ConfirmationPageTest from "./components/appointment/ConfirmationPageTest.jsx";
import BookingSuccessfully from "./components/appointment/BookingSuccessfully.jsx";
import TestResultPage from "./pages/testpage/TestResultPage.jsx";
import StudentOverview from "./pages/student/student-overview.jsx";
import StudentTestHistory from "./pages/student/student-testhistory.jsx";
import StudentBooking from "./pages/student/student-booking.jsx";
import StudentAssociate from "./pages/student/student-associate.jsx";
import ParentAssociate from "./pages/parent/parent-associate.jsx";
import ParentOverview from "./pages/parent/parent-overview.jsx";

import SurveySelectionPage from "./pages/survey/SurveyOption.jsx";
import GeneralSurveyPage from "./pages/survey/GeneralSurveyPage.jsx";
import ManagerSurveyHistory from "./pages/manager/manage-surveyhistory.jsx";
import StudentSurveyHistory from "./pages/student/student-surveyhistory.jsx";
// import Appointment1 from "./pages/appointment/Appointment1.jsx";
// import BookingForm from "./pages/appointment/AppointmentForm.jsx";
// import Confirmation from "./pages/appointment/Confirm.jsx";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Replace with your actual authentication and role check logic
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is logged in
  const userRole = localStorage.getItem('role'); // Get the user's role

  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to unauthorized page or home if role doesn't match
    return <Navigate to="/" replace />;
  }

  return children;
};


const App = () => {

  const location = useLocation(); // Get the current route

  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = ["/register", "/register1", "/register2", "/login", "/profile", "/dashboard",
     "dashboard1", "/dashboard/test", "/dashboard/test-score", "/dashboard/survey", "/dashboard/user", "/dashboard/program", "/dashboard/program1",
    "/dashboard/overview", "/dashboard/profile", "/dashboard/client", "/dashboard/psychologist", "/dashboard/survey-history", "/workview/profile", "/workview/booking", "/workview/overview",
      "/workview/clients", "/student-dashboard/overview", "/student-dashboard/tests", "/payment-success", "/payment-callback", "/workview/slots", "/booking-successfully"
    ,"/student-dashboard/booking", "/student-dashboard/associate", "/student-dashboard/survey", "/parent-dashboard/overview", "/parent-dashboard/associate"];

  return (
    <>
      {/* Render Navbar only if the current path is not in the hide list */}
      {/* {!hideNavbarFooterRoutes.includes(location.pathname) && <Navbar />} */}
      {/* {!hideNavbarFooterRoutes.includes(location.pathname) && <NavbarT />} */}
      {!hideNavbarFooterRoutes.includes(location.pathname) && <DoubleNavbar />}
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
          {/* <Route path="/profile" element={<UserProfile2 />} /> */}
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<UserRegistration />} /> */}
          {/* <Route path="/LR" element={<LR />} /> */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/register1" element={<RegistrationPage1 />} />
          <Route path="/register2" element={<RegistrationPage2 />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          <Route path="/dashboard1" element={<ManagerDashboard />} />
          <Route path="/dashboardM" element={<Layout />} />

          <Route
            path="/appointment"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <Appointment />
              </ProtectedRoute>
            }
            />

          {/* <Route path="/appointment" element={<Appointment />} /> */}
          {/* <Route path="/appointment1" element={<Appointment1/>}/> */}
          <Route path="/appointmentform" element={<AppointmentForm/>}/>
          <Route path="/confirmation" element={<ConfirmationPage/>}/>
          <Route path="/booking-successfully" element={<BookingSuccessfully />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          
          <Route path="/appointment1" element={<AppointmentTest />} />
          <Route path="/appointmentform1" element={<AppointmentFormTest />} />
          <Route path="/confirmationform1" element={<ConfirmationPageTest />} /> 

          {/* <Route path="/dashboard" element={<AdminLayout />} /> */}
          
          
          {/* Dashboard Layout with Nested Routes */}
          {/* <Route path="/dashboard" element={<AdminLayout />}>
            <Route path="overview" element={<ManageOverview />} />
            <Route path="profile" element={<ManagerProfile1 />} />
            <Route path="user" element={<ManageUser />} />
            <Route path="test" element={<ManageTest />} />
            <Route path="survey" element={<ManageSurvey />} />
            <Route path="program" element={<ManageProgram />} />
          </Route> */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="MANAGER">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<ManageOverview />} />
            <Route path="profile" element={<ManagerProfile2/>} />
            <Route path="user" element={<ManageUser />} />
            <Route path="client" element={<ManageClient />} />
            <Route path="psychologist" element={<ManagePsychologist />} />
            <Route path="test" element={<ManageTest />} />
            <Route path="test-score" element={<ManageTestScore />} />
            <Route path="survey" element={<ManageSurvey />} />
            <Route path="survey-history" element={<ManagerSurveyHistory />} />
            <Route path="program" element={<ManageProgram />} />
            <Route path="program1" element={<ManageProgram1 />} />
          </Route>

          {/* <Route path="/workview" element={<PsychologistLayout />}>
            <Route path="overview" element={<PsychologistOverview />} />
            <Route path="clients" element={<PsychologistClients />} />
            <Route path="profile" element={<PsychologistProfile />} />
            <Route path="booking" element={<PsychologistBooking />} />
          </Route> */}

          <Route
            path="/workview"
            element={
              <ProtectedRoute requiredRole="PSYCHOLOGIST">
                <PsychologistLayout />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<PsychologistOverview />} />
            <Route path="clients" element={<PsychologistClients />} />
            <Route path="profile" element={<PsychologistProfile />} />
            <Route path="booking" element={<PsychologistBooking />} />
            <Route path="slots" element={<PsychologistSlot />} />
          </Route>

          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<StudentOverview />} />
            <Route path="tests" element={<StudentTestHistory />} />
            <Route path="survey" element={<StudentSurveyHistory />} />
            <Route path="booking" element={<StudentBooking />} />
            <Route path="associate" element={<StudentAssociate />} />
            <Route path="profile" element={<UserNProfile />} />
            {/* <Route path="profile" element={<ManagerProfile1 />} />
            <Route path="user" element={<ManageUser />} />
            <Route path="test" element={<ManageTest />} />
            <Route path="survey" element={<ManageSurvey />} />
            <Route path="program" element={<ManageProgram />} />
            <Route path="program1" element={<ManageProgram1 />} /> */}
          </Route>



          <Route
            path="/parent-dashboard"
            element={
              <ProtectedRoute requiredRole="PARENT">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="overview" element={<ParentOverview />} />
            <Route path="associate" element={<ParentAssociate />} />
            {/* <Route path="overview" element={<StudentOverview />} />
            <Route path="tests" element={<StudentTestHistory />} />
            <Route path="booking" element={<StudentBooking />} /> */}
            {/* <Route path="profile" element={<ManagerProfile1 />} />
            <Route path="user" element={<ManageUser />} />
            <Route path="test" element={<ManageTest />} />
            <Route path="survey" element={<ManageSurvey />} />
            <Route path="program" element={<ManageProgram />} />
            <Route path="program1" element={<ManageProgram1 />} /> */}
          </Route>

          <Route path="/mentalhealth-test" element={<TestList />} />
          <Route path="/mentalhealth-testDASS21" element={<Dass21TestPage />} /> 
          {/* <Route path="/test/:testId" element={<TestLayout />} />   */}
          <Route path="/testrun" element={<TestQuestionAndAnswer />} /> 

          <Route
            path="/testoption"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <TestSelectionPage />
              </ProtectedRoute>
            }
            />

         
          {/* <Route path="/gad7" element={<GAD7TestPage/>} />
          <Route path="/phq9" element={<PHQ9TestPage/>}/>
          <Route path="/dass21" element={<DASS21TestPage/>}/>
          <Route path="/beck" element={<BeckTestPage/>}/> */}
          <Route path="/test/:id" element={<GeneralTestPage />} />
          <Route path="/test-result" element={<TestResultPage />} />

          <Route
            path="/survey-selection"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <SurveySelectionPage />
              </ProtectedRoute>
            }
            />
            <Route path="/survey/:id" element={<GeneralSurveyPage />} />

          {/* <Route path="/profile-settings" element={<ProfileSettings/>}/> */}

         

        </Routes>
      </main>

      {/* Render Footer only if the current path is not in the hide list */}
      {!hideNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
};

export default App;

 