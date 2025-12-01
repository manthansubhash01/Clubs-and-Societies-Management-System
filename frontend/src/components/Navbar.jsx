import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Helper function to clear all auth data
  const clearAuthData = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("club_id");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("club_id");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const token =
      sessionStorage.getItem("accessToken") || sessionStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      // Token is missing or expired - clear all auth data
      clearAuthData();
      setIsLoggedIn(false);
      setUserRole(null);
    } else {
      // Token exists and is valid
      setIsLoggedIn(true);
      const role =
        sessionStorage.getItem("role") || localStorage.getItem("role");
      setUserRole(role);
    }
  }, []);

  const adminRoles = ["SUPER_ADMIN", "PRESIDENT", "VICE_PRESIDENT"];

  const handleLogout = async () => {
    try {
      // Call logout API to clear refresh token from server
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    // Clear all local auth data
    clearAuthData();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 m-5 mr-7 ml-7 bg-[#F6EFE6] shadow-md">
      <div className="max-w-[1400px] mx-auto px-12 py-4 flex items-center">
        {/* Logo Section - Left */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#b8894a]">
            <img
              src="https://i.pinimg.com/originals/28/ec/0d/28ec0d6438b1208e40fe39ec0f96c114.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-[#12202b] tracking-wide">
            Clubs & Society
          </span>
        </div>

        {/* Navigation Section - Center */}
        <ul className="hidden lg:flex items-center gap-10 list-none flex-1 justify-center">
          <li>
            <a
              href="/dashboard"
              className={`text-[#12202b] font-semibold text-sm tracking-wider hover:text-[#b8894a] transition-colors relative ${
                isActive("/dashboard")
                  ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#b8894a] after:content-[''] border-b-2 border-[#b8894a]"
                  : ""
              }`}
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="/events"
              className={`text-[#12202b] font-semibold text-sm tracking-wider hover:text-[#b8894a] transition-colors ${
                isActive("/events") ? "border-b-2 border-[#b8894a]" : ""
              }`}
            >
              EVENTS
            </a>
          </li>
          <li>
            <a
              href="/gallery"
              className={`text-[#12202b] font-semibold text-sm tracking-wider hover:text-[#b8894a] transition-colors ${
                isActive("/gallery") ? "border-b-2 border-[#b8894a]" : ""
              }`}
            >
              GALLERY
            </a>
          </li>
          <li>
            <a
              href="/clubs"
              className={`text-[#12202b] font-semibold text-sm tracking-wider hover:text-[#b8894a] transition-colors ${
                isActive("/clubs") ? "border-b-2 border-[#b8894a]" : ""
              }`}
            >
              CLUBS
            </a>
          </li>
          {adminRoles.includes(userRole) && (
            <li>
              <a
                href="/admin/members"
                className={`text-[#12202b] font-semibold text-sm tracking-wider hover:text-[#b8894a] transition-colors ${
                  isActive("/admin/members")
                    ? "border-b-2 border-[#b8894a]"
                    : ""
                }`}
              >
                ADMIN
              </a>
            </li>
          )}
        </ul>

        {/* Login/Logout Section - Right */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-[#FFC107] text-[#12202b] px-7 py-2.5 rounded font-bold text-sm tracking-wider hover:bg-black hover:text-[#FFC107] transition-all hover:-translate-y-0.5"
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-[#FFC107] text-[#12202b] px-7 py-2.5 rounded font-bold text-sm tracking-wider hover:bg-black hover:text-[#FFC107] transition-all hover:-translate-y-0.5"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
