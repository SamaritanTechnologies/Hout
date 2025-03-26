import axios from "axios";
import { getAccessToken } from "./AccessToken";

export const API_BASE_URL = "https://backend.houttotaal.nl/api";
// export const API_BASE_URL = "https://fa8a-101-53-233-25.ngrok-free.app/api";
export const BASE_URL = "https://backend.houttotaal.nl";

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
