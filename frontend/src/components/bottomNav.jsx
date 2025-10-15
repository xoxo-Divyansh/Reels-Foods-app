import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/bottomnav.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      {/* Home Icon */}
      <button
        className={`nav-btn ${location.pathname === "/home" ? "active" : ""}`}
        onClick={() => navigate("/home")}
      >
        <svg  
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.6"
          stroke="currentColor"
          className="nav-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75V21a.75.75 0 00.75.75H9.75a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V9.75"
          />
        </svg>
        <span>Home</span>
      </button>

      {/* Profile Icon (Middle) */}
      <button
        className={`nav-btn profile-btn ${
          location.pathname === "/login" ? "active" : ""
        }`}
        onClick={() => navigate("/user/login")}
      >
        <div className="profile-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
            stroke="currentColor"
            className="nav-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 21a8.25 8.25 0 0115 0"
            />
          </svg>
        </div>
        <span>Profile</span>
      </button>

      {/* Saved Icon */}
      <button
        className={`nav-btn ${location.pathname === "/saved" ? "active" : ""}`}
        onClick={() => navigate("/saved")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="nav-icon"
        >
          <path d="M17 3H7a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2z" />
        </svg>
        <span>Saved</span>
      </button>
    </div>
  );
};

export default BottomNav;
