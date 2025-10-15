import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth-shared.css";
import "../styles/chooseLogin.css";

const ChooseLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="choose-login-container">
      <div className="choose-login-card">
        <h1 className="choose-login-title">Choose Login as</h1>

        <div className="login-options">
          {/* USER LOGIN */}
          <div
            className="login-option user"
            onClick={() => navigate("/user/login")}
          >
            <div className="icon-wrapper">
              {/* 👤 USER SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                stroke="currentColor"
                className="login-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.25a8.25 8.25 0 0 1 15 0"
                />
              </svg>
            </div>
            <h2>User</h2>
            <p>Discover, like & save amazing food reels 🍔</p>
          </div>

          {/* FOOD PARTNER LOGIN */}
          <div
            className="login-option partner"
            onClick={() => navigate("/food-partner/login")}
          >
            <div className="icon-wrapper">
              {/* 🍳 FOOD PARTNER SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                stroke="currentColor"
                className="login-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v18m6-9H6m12 0a9 9 0 1 0-18 0 9 9 0 0 0 18 0z"
                />
              </svg>
            </div>
            <h2>Food Partner</h2>
            <p>Upload your delicious creations & connect with food lovers 👨‍🍳</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLogin;
