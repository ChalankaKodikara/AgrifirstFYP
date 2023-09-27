import axios from "axios";

export const baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 300000,
  withCredentials: true,
});
