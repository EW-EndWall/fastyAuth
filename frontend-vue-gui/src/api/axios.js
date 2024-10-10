import axios from "axios";
import store from "./../store";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Accept-Language": "en",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getters.getToken;
    const language = store.getters.getLanguage;
    // * add Token
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept-Language"] = language;
    // * return
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
