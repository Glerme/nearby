import axios from "axios";

export const api = axios.create({
  baseURL: "https://5815-187-109-130-108.ngrok-free.app", // ngrok
  timeout: 700,
});
