// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   // Replace with your actual authentication and role check logic
//   const isAuthenticated = localStorage.getItem('token'); // Check if the user is logged in
//   const userRole = localStorage.getItem('role'); // Get the user's role

//   const location = useLocation();

//   if (!isAuthenticated) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     // Redirect to unauthorized page or home if role doesn't match
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;