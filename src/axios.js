import axios from "axios";
import { getToken } from "./utils/utils";
const http = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

http.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers.Authorization = `${authToken}`;
  } else {
    getToken();
    const authToken = localStorage.getItem("token");
    config.headers.Authorization = `${authToken}`;
  }
  return config;
});

export default http;
