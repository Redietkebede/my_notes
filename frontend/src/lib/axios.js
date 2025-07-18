import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000/api" : "/api"

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
