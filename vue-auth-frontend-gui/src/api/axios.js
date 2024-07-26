import axios from "axios";

const getToken = localStorage.getItem("token") || "";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: `${getToken}`,
  },
});

//   apiClient.interceptors.request.use(
//     config => {
//       config.headers['Custom-Header'] = 'CustomValue';
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

export default apiClient;
