import { createStore } from "vuex";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const store = createStore({
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", user);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.isAuthenticated = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post("/auth/login", credentials);
        const data = response.data;
        commit("setUser", data.user);
        commit("setToken", data.token);
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;
        return {
          status: data.status,
          message: data.message,
        };
      } catch (error) {
        // console.error("Login failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async logout({ commit }) {
      commit("logout");
    },
    async register({}, userData) {
      try {
        const response = await apiClient.post("/auth/register", userData);
        const data = response.data;
        return {
          status: data.status,
          message: data.message,
        };
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async getAccountData({}, userData) {
      try {
        const response = await apiClient.get("/account", userData);
        const data = response.data;
        return {
          status: data.status,
          message: data.message,
        };
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async passwordEdit({}, userData) {
      try {
        const response = await apiClient.post("/auth/password-edit", userData);
        const data = response.data;
        return {
          status: data.status,
          message: data.message,
        };
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async passwordReset({}, userData) {
      try {
        const response = await apiClient.post("/auth/password-reset", userData);
        const data = response.data;
        return {
          status: data.status,
          message: data.message,
        };
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async accountUpdate({}, userData) {
      try {
        const response = await apiClient.post("/auth/account-update", userData);
        const data = response.data;
        console.log(data);
      } catch (error) {
        // console.error("Update failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
});

export default store;
