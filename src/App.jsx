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

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserProfile from "./components/Profile";
import UserProfile1 from "./components/Profile1";
import UserProfile2 from "./components/Profile2";
import TestManagementSystem from "./components/Test1";
import TestManagementSystem2 from "./components/Test3";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", // Matches the root URL
      element: <Layout />, // Use a Layout component
      children: [ // Define child routes
        { index: true, element: <Home /> }, // index: true means this is the default route for /
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <UserRegistration /> },
        { path: "/about", element: <About /> },
        { path: "/services", element: <Services /> },
        { path: "/psychologist", element: <Psychologist /> },
        { path: "/blog", element: <Blogs /> },
        { path: "/resources", element: <MentalHealthResources /> },
        { path: "/profile", element: <UserProfile /> },
        { path: "/profile1", element: <UserProfile1 /> },
        { path: "/profile2", element: <UserProfile2 /> },
        { path: "/manageTest", element: <TestManagementSystem /> },
        { path: "/manageTest2", element: <TestManagementSystem2 /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      {/* No need to render anything directly here; Layout handles it */}
    </RouterProvider>
  );
};

// Layout Component
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where the route content will be rendered */}
      <Footer />
    </>
  );
};

export default App;