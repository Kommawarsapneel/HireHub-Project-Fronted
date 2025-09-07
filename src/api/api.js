import axios from "axios";

const API = axios.create({
  baseURL: "https://hirehub-project-1.onrender.com",
});

// Attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
