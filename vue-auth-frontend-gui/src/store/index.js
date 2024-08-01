import { createStore } from "vuex";

import router from "./../router";
import apiClient from "./../api/axios";

const store = createStore({
  state: {
    userId: localStorage.getItem("userId") || null,
    userName: localStorage.getItem("userName") || null,
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setUserName(state, user) {
      state.userName = user;
      localStorage.setItem("userName", user);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.isAuthenticated = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post(`/auth/login`, credentials);
        const data = response.data;
        commit("setUserId", data.id);
        commit("setUserName", data.user);
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
    async register({}, { data }) {
      try {
        return await apiClient.post(`/auth/register`, data);
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async passwordReset({}, { data }) {
      try {
        return await apiClient.post(`/auth/password-reset`, data);
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async accountData({}, { params, data }) {
      try {
        return await apiClient.get(`/account/profile/${params.id}`, data);
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async passwordEdit({}, { params, data }) {
      try {
        return await apiClient.patch(
          `/account/password-change/${params.id}`,
          data
        );
      } catch (error) {
        // console.error("Registration failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    async accountUpdate({}, { params, data }) {
      try {
        return await apiClient.put(`/account/profile/${params.id}`, data);
      } catch (error) {
        // console.error("Update failed:", error); // * debug
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      }
    },
    // async accountStatusUpdate({}, { params, data }) {
    //   try {
    //     return await apiClient.patch(`/account/profile/status/${params.id}`, data);
    //   } catch (error) {
    //     // console.error("Update failed:", error); // * debug
    //     return {
    //       status: error.response.status,
    //       message: error.response.data.message,
    //     };
    //   }
    // },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getId: (state) => state.userId,
    getUserName: (state) => state.userName,
    getToken: (state) => state.token,
  },
});

export default store;
