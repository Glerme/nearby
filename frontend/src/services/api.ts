import axios from "axios";

export const api = axios.create({
  baseURL: "", // ngrok
  timeout: 700,
});
