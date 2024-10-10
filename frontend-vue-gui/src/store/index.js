import { createStore } from "vuex";
import i18n from "i18next";

import router from "./../router";
import apiClient from "./../api/axios";

const store = createStore({
  state: {
    userName: localStorage.getItem("userName") || null,
    language: localStorage.getItem("language") || "en",
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    setUserName(state, user) {
      state.userName = user;
      localStorage.setItem("userName", user);
    },
    async setLanguage(state, language) {
      const languages = language.slice(-2);
      state.language = languages;
      localStorage.setItem("language", languages);
      apiClient.defaults.headers.common["Accept-Language"] = languages;
      await i18n.changeLanguage(languages);
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      apiClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
    },
    logout(state) {
      state.isAuthenticated = null;
      state.userName = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    },
  },
  actions: {
    async clearNullData({ dispatch }, obj) {
      //   return await Object.fromEntries(
      //     Object.entries(obj).filter(([_, v]) => v)
      //   );
      const entries = await Promise.all(
        Object.entries(obj).map(async ([key, value]) =>
          value && typeof value === "object"
            ? [key, await dispatch("clearNullData", value)]
            : [key, value]
        )
      );
      return Object.fromEntries(
        entries.filter(
          ([_, v]) => v && (typeof v !== "object" || Object.keys(v).length > 0)
        )
      );
    },
    async login({ commit }, { data }) {
      try {
        const response = await apiClient.post(`/auth/login`, data);
        if (response.status == 200) {
          const data = response.data;
          await commit("setUserName", data.username);
          await commit("setLanguage", data.details.language);
          await commit("setToken", data.token);
        }
        return response;
      } catch (error) {
        return {
          status: error.response.status,
          message: error.response.data.error,
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
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async resetPassword({}, { data }) {
      try {
        return await apiClient.post(`/auth/reset-password`, data);
      } catch (error) {
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async resetPasswordUpdate({}, { data }) {
      try {
        return await apiClient.post(`/auth/reset-password-update`, data);
      } catch (error) {
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async accountData({ commit, state }, { data }) {
      try {
        const res = await apiClient.get(`/account/profile`, data);
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async passwordEdit({ commit }, { data }) {
      try {
        const res = await apiClient.patch(`/account/update-password`, data);
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async accountUpdate({ commit }, { data }) {
      try {
        const res = await apiClient.patch(`/account/profile`, data);
        if (data.details.language)
          await commit("setLanguage", data.details.language);
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async accountStatus({ commit }, { data }) {
      try {
        const res = await apiClient.patch(`/account/status`, data);
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async accountVerify({ commit }, { data }) {
      try {
        const res = await apiClient.get(
          `/account/verify?verificationType=${data.verificationType}`
        );
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async accountVerifyCode({ commit }, { data }) {
      try {
        const res = await apiClient.post(`/account/verify`, data);
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
    async accountDelete({ commit }, { data }) {
      try {
        const res = await apiClient.delete(`/account/profile`, { data });
        if (res.data.newToken)
          return (
            await commit("setToken", res.data.newToken),
            window.location.reload()
          );
        return res;
      } catch (error) {
        if (error.response.status == 401) commit("logout"), router.push("/");
        return {
          status: error.response.status,
          message: error.response.data.error,
        };
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserName: (state) => state.userName,
    getLanguage: (state) => state.language,
    getToken: (state) => state.token,
  },
});

export default store;
