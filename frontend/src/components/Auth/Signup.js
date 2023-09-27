import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../axios.config";
import { signup } from "../../store/features/userSlice";
import { useDispatch } from "react-redux";

const phoneRegex = /^\d{10}$/;
let schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegex, "Phone number is not valid"),
  password: yup.string().min(6).max(8).required(),
  type: yup.string().required(),
});

function Signup() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (data) => {
    console.log(data);
    axiosInstance
      .post("/api/auth/register", data) // Assuming your registration route is at /api/auth/register
      .then((response) => {
        console.log(response);
        dispatch(signup(response.data.user));
        navigate("/disease-detection");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  console.log(errors);
  return (
    <form
      className="grid grid-flow-row h-full"
      autoComplete="true"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="row-span-1 grid grid-cols-6 gap-4 m-1">
        <label className="block col-span-3">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
            {t("description.auth.4")}
          </span>
          <input
            type="firstName"
            name="firstName"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.firstName
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-emerald-500 focus:ring-emerald-500"
            }`}
            placeholde="******"
            {...register("firstName")}
          />
        </label>
        {errors && errors.firstName ? (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            {errors.firstName.message}
          </p>
        ) : (
          <></>
        )}
        <label className="block col-span-3">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
            {t("description.auth.5")}
          </span>
          <input
            type="lastName"
            name="lastName"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.lastName
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-emerald-500 focus:ring-emerald-500"
            }`}
            placeholde="******"
            {...register("lastName")}
          />
        </label>
        {errors && errors.lastName ? (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            {errors.lastName.message}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="row-span-1 m-1">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
            {t("description.auth.0")}
          </span>
          <input
            type="username"
            name="username"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.username
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-emerald-500 focus:ring-emerald-500"
            }`}
            placeholde="******"
            {...register("username")}
          />
        </label>
        {errors && errors.username ? (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            {errors.username.message}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="row-span-1 m-1">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
            {t("description.auth.1")}
          </span>
          <input
            type="password"
            name="password"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.password
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-emerald-500 focus:ring-emerald-500"
            }`}
            placeholde="******"
            {...register("password")}
          />
        </label>
        {errors && errors.password ? (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            {errors.password.message}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="row-span-1 grid grid-cols-6 gap-4 m-1">
        <label className="block col-span-3">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
            {t("description.auth.6")}
          </span>
          <input
            type="phone"
            name="phone"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.phone
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-emerald-500 focus:ring-emerald-500"
            }`}
            placeholde="******"
            {...register("phone")}
          />
        </label>
        {errors && errors.phone ? (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            {errors.phone.message}
          </p>
        ) : (
          <></>
        )}

        <label className="block col-span-3">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
            Type
          </span>
          <select
            name="type"
            id="type"
            defaultValue="farmer"
            className={`mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none  block w-full rounded-md sm:text-sm focus:ring-1 ${
              errors && errors.type
                ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                : "focus:border-emerald-500 focus:ring-emerald-500"
            }`}
            placeholde="******"
            {...register("type")}
          >
            <option value="farmer">{t("description.auth.7")}</option>
            <option value="expert">{t("description.auth.8")}</option>
          </select>
        </label>
        {errors && errors.type ? (
          <p className="text-red-500 text-sm italic ml-6 py-2">
            {errors.type.message}
          </p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex row-span-1 mt-4">
        <input
          type="submit"
          value={t("description.auth.2")}
          className="mx-auto h-11 w-44 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 cursor-pointer"
        />
      </div>
    </form>
  );
}

export default Signup;
