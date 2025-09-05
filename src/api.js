import axios from "axios";

const API = axios.create({
  baseURL: "https://tiendaclient.onrender.com", // si esto es tu backend, perfecto
});

// Interceptor para enviar token si existe
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
