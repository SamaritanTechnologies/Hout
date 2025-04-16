import axios from "axios";
import { getAccessToken } from "./AccessToken";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const API_BASE_URL = `${BASE_URL}/api`;

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosWithCredentials = axios.create({
  baseURL: API_BASE_URL,
});

axiosWithCredentials.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
