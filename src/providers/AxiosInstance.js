import axios from "axios";
import { getAccessToken } from "./AccessToken";

// export const BASE_URL = "https://backend.houttotaal.nl/api";
// export const authEndpoint = "https://backend.houttotaal.nl";

export const BASE_URL = "https://67b0-38-7-174-68.ngrok-free.app/api";
export const authEndpoint = "https://67b0-38-7-174-68.ngrok-free.app";

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
