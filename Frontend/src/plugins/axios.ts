import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // indispensable pour les cookies HttpOnly
});

export default api;
