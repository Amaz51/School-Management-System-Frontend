import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/attendance",
  withCredentials:"true",
});
const getAccessToken = () => localStorage.getItem("access");
export const APII = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials:"true",
});

export const APIII = axios.create({
  baseURL: "http://127.0.0.1:8000/api/students",
  withCredentials: "true",
});


export const StudentOrderAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/ordering",
  withCredentials: true,
});

export const authAPI = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

authAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

StudentOrderAPI.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});