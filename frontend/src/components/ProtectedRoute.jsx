import React from "react";
import { Navigate } from "react-router-dom";

// Helper function to check if JWT is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Helper function to get current user role
const getCurrentUserRole = () => {
  const token =
    sessionStorage.getItem("accessToken") || sessionStorage.getItem("token");
  if (!token || isTokenExpired(token)) return null;
  return sessionStorage.getItem("role") || localStorage.getItem("role");
};

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const token =
    sessionStorage.getItem("accessToken") || sessionStorage.getItem("token");

  // Check if user is authenticated
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRoles.length > 0) {
    const userRole = getCurrentUserRole();
    if (!userRole || !requiredRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
