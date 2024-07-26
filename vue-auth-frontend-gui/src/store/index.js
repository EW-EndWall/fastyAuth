import { createStore } from "vuex";

import router from "./../router";
import apiClient from "./../api/axios";

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
        apiClient.defaults.headers.common["authorization"] = `${data.token}`;
        return {
          status: data.status,
          data: {
            message: data.message,
          },
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
      router.push("/");
    },
    async register({}, userData) {
      try {
        return await apiClient.post("/auth/register", userData);
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
        return await apiClient.post("/auth/password-reset", userData);
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async accountData({}, userData) {
      try {
        return await apiClient.get("/account/profile", userData);
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
        return await apiClient.post("/account/password-change", userData);
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
        return await apiClient.put("/account/profile", userData);
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
