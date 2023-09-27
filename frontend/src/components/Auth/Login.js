import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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
  } = useForm();

  return (
    <form
      className="grid grid-rows-6 grid-flow-col gap-4 h-full w-2/3 mx-auto"
      autoComplete="true"
      onSubmit={handleSubmit(handleLogin)}
    >
      {/* Username input */}
      <div className="row-span-2">
        <label className="block">
          <span className="block text-sm font-medium text-white">Username</span>
          <input
            type="text"
            name="username"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors.username
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-teal-500 focus:ring-teal-500"
            }`}
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
        </label>
        {errors.username && (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            Username is required.
          </p>
        )}
      </div>

      {/* Password input */}
      <div className="row-span-2">
        <label className="block">
          <span className="block text-sm font-medium text-white">Password</span>
          <input
            type="password"
            name="password"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-teal-500 focus:ring-teal-500"
            }`}
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            Password is required.
          </p>
        )}
      </div>

      {/* Submit button */}
      <div className="flex row-span-2">
        <input
          type="submit"
          value="Sign In"
          className="mx-auto h-11 w-44 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 cursor-pointer"
        />
      </div>
    </form>
  );
}

export default Login;
