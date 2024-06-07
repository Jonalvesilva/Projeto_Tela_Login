import axios from "axios";

export const api = axios.create({
  baseURL: "http://projeto-tela-login-one.vercel.app/",
  withCredentials: true, // Habilita o envio de cookies nas solicitações
});
