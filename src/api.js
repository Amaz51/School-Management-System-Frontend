import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/attendance",
  withCredentials:"true",
});

export const APII = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials:"true",
});

export const APIII = axios.create({
  baseURL: "http://127.0.0.1:8000/api/students",
  withCredentials: "true",
});

