import axios from "axios";
import { getAccessToken } from "./AccessToken";

export const BASE_URL = "https://backend.houttotaal.nl/api";
export const authEndpoint = "https://backend.houttotaal.nl";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

export const axiosWithCredentials = axios.create({
  baseURL: BASE_URL,
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
