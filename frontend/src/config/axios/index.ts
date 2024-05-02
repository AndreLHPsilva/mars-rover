import { InitLoading, RemoveLoading } from "@/helpers/Notifications";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API ?? "http://localhost:3001",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  
  InitLoading()

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    RemoveLoading()
    return response;
  },
  async (error) => {
    RemoveLoading()

    return Promise.reject(error);
  }
);
