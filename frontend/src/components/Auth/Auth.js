import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./Signupform";
import "./Auth.css"; // Import your CSS file
import Navbar from "../Navbar/Navbar";

function Auth() {
  return (
    <div>
        <div><Navbar /></div>

      <div className="formreg-container">
        <div className="left-form">
          <LoginForm />
        </div>
        <div className="right-form">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default Auth;
