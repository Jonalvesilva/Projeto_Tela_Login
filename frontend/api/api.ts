import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Habilita o envio de cookies nas solicitações
});
