import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = 'user' }) => {
  const { user, loading, getUserRole } = useAuth();

  if (loading) {
    return <div className="loading-fullscreen">Checking authentication...</div>;
  }

  if (!user) {
    // If no user is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }
  
  // Optional: Role check (comment out or simplify if not using roles yet)
  const userRole = getUserRole();
  if (requiredRole !== 'user' && userRole !== requiredRole && userRole !== 'super_admin') {
      // If the user is logged in but doesn't have the required role, redirect to dashboard or home
      return <Navigate to="/admin" replace />; 
  }

  // If authenticated and authorized, render the child component (AdminPage)
  return children;
};

export default ProtectedRoute;