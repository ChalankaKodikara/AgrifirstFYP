import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import './Loginform.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        data
      );
      if (response.data.user) {
        // User successfully logged in
        const token = response.data.token;

        // Store the token in a cookie with an expiration time (e.g., 7 days)
        Cookies.set("authToken", token, { expires: 7 });

        console.log("Login successful:", response.data);

        // Redirect to "/forum" or your desired route
        navigate("/forum");
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
  } = useForm();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(handleLogin)();
    }
  };

  return (
    <div>
      <div className="form-container">
        <p className="title">Log into your account</p>
        <p className="sub-title">You can create a new account here </p>
        <br/>
        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <input
            type="text"
            className="input"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.username.message}
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
              {errors.password.message}
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
          {/* Your Google login button code remains the same */}
        </div>
      </div>
    </div>
  );
}

export default Login;
