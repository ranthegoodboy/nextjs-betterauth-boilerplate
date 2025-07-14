import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default api;
