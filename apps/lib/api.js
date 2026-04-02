import axios from "axios";

// lib/api.js
const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// response interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(err);
  },
);

export default api;
