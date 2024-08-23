import axios from "axios";
//oi
const api = axios.create({
  baseURL: "https://brasilapi.com.br/api/",
});

export default api;
