import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import './Loginform.css'
import { useForm } from "react-hook-form";


function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login", // Update with your actual backend endpoint
        data
      );

      if (response.data.user) {
        // User successfully logged in
        const token = response.data.token;

        // Store the token in a cookie with an expiration time (e.g., 7 days)
        Cookies.set("authToken", token, { expires: 7 });

        console.log("Login successful:", response.data);

        // Redirect to "/disease-detection" or your desired route
        navigate("/disease-detection");
      } else {
        // Handle login error, e.g., show error message to the user
        console.error("Login failed:", response.data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Add this line to import the useForm hook

  return (
    <div>
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <input
            type="username"
            className="input"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            Username is required.
          </p>
        )}
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            Password is required.
          </p>
        )}
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button type="submit" className="form-btn">
            Log in
          </button>
        </form>
        <p className="sign-up-label">
          Don't have an account?<span className="sign-up-link">Sign up</span>
        </p>
        <div className="buttons-container">
          <div className="apple-login-button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              className="apple-icon"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Add Apple icon path here */}
            </svg>
            <span>Log in with Apple</span>
          </div>
          <div className="google-login-button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              x="0px"
              y="0px"
              className="google-icon"
              viewBox="0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Add Google icon paths here */}
            </svg>
            <span>Log in with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
