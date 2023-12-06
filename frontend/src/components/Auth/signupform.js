import React, { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios.config"; // Make sure axiosInstance is correctly configured
import "./Loginform.css";

// Define your validation schema
let schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  type: yup.string().required("Type is required"),
});

function SignupForm() {
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const submitHandler = async (data) => {
    try {
      const response = await axiosInstance.post("http://localhost:5001/api/auth/register", data);
      const { user, message } = response.data;

      // Update the state to indicate registration success
      setRegistrationSuccess(true);

      // Store the user details or token securely (e.g., in localStorage or a secure cookie) if needed
      console.log("Register successful:", response.data);

      // Redirect to the forum or any other authenticated route
      navigate("/forum");
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div>
      <div className="form-container">
        {registrationSuccess ? (
          <div className="success-message">
            <p>Registration successful!</p>
          </div>
        ) : (
          <div>
            <p className="title">Create account</p>
            <p className="sub-title">You can create a new account here </p>
            <br />
            <form className="form" onSubmit={handleSubmit(submitHandler)}>
              <input
                type="text"
                name="firstName"
                className="input"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm italic ml-6 py-2">{errors.firstName.message}</p>
              )}

              {/* Add your other input fields */}
              <input
                type="text"
                name="lastName"
                className="input"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm italic ml-6 py-2">{errors.lastName.message}</p>
              )}

              <input
                type="text"
                name="username"
                className="input"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm italic ml-6 py-2">{errors.username.message}</p>
              )}

              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm italic ml-6 py-2">{errors.password.message}</p>
              )}

              <input
                type="text"
                name="phone"
                className="input"
                placeholder="Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm italic ml-6 py-2">{errors.phone.message}</p>
              )}

              <select
                name="type"
                id="type"
                defaultValue="farmer"
                className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1 ${
                  errors.type
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                    : "focus:border-emerald-500 focus:ring-emerald-500"
                }`}
                placeholder="Select Type"
                {...register("type")}
              >
                <option value="" disabled hidden>
                  Select Type
                </option>
                <option value="farmer">Farmer</option>
                <option value="expert">Expert</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm italic ml-6 py-2">{errors.type.message}</p>
              )}

              <button type="submit" className="form-btn">
                Create account
              </button>
            </form>
          </div>
        )}

        {/* Add the rest of your component content here */}
        {/* For example, the "Already have an account" label and Google login button */}
      </div>
    </div>
  );
}

export default SignupForm;
