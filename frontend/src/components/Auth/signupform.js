import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../axios.config"; // Make sure axiosInstance is correctly configured
import "./Loginform.css";

const phoneRegex = /^\d{10}$/;
let schema = yup.object().shape({
  // ... (your existing validation schema)
});

function SignupForm() {
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", data);

      console.log(response.data);
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
        <p className="title">Create account</p>
        <p className="sub-title">You can create a new account here </p>
        <br/>
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            name="firstName"
            className="input"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.firstName.message}
            </p>
          )}
          <input
            type="lastName"
            name="lastName"
            className="input"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors && errors.lastName ? (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.lastName.message}
            </p>
          ) : (
            <></>
          )}
          <input
            type="username"
            name="username"
            className="input"
            placeholder="Username"
            {...register("username")}
          />
          {errors && errors.username ? (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.username.message}
            </p>
          ) : (
            <></>
          )}

          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password")}
          />
          {errors && errors.password ? (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.password.message}
            </p>
          ) : (
            <></>
          )}
          <input
            type="phone"
            name="phone"
            className="input"
            placeholder="Phone Number"
            {...register("phone")}
          />
          {errors && errors.phone ? (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.phone.message}
            </p>
          ) : (
            <></>
          )}
          <select
            name="type"
            id="type"
            defaultValue="farmer"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.type
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
          {errors && errors.type && (
            <p className="text-red-500 text-sm italic ml-6 py-2">
              {errors.type.message}
            </p>
          )}
          <button type="submit" className="form-btn">
            Create account
          </button>
        </form>
        <p className="sign-up-label">
          Already have an account you can Log in 
        </p>
        <div className="buttons-container">
          {/* <div className="apple-login-button">
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
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
            </svg>
            <span>Sign up with Apple</span>
          </div> */}
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
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Sign up with Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
