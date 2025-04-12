import { createStore } from "vuex";
import api from "@/utils/axios";

export default createStore({
  state: {
    user: {
      id: "",
      username: "",
    },
    isAuthenticated: false,
    token: null as string | null,
  },
  mutations: {
    initializeStore(state) {
      const token = localStorage.getItem("token");

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        state.user.username = localStorage.getItem("username") || "";
        state.user.id = localStorage.getItem("userId") || "";
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
      } else {
        state.user.id = "";
        state.user.username = "";
        state.token = null;
        state.isAuthenticated = false;
        delete api.defaults.headers.common["Authorization"];
      }
    },
    setToken(state, token: string) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
    },
    removeToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = { id: "", username: "" };
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      delete api.defaults.headers.common["Authorization"];
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.id);
    },
  },
  actions: {
    async validateToken({ commit, state }) {
      if (!state.token) {
        commit("removeToken");
        return false;
      }

      try {
        // Utilisation de l'endpoint correct pour récupérer les données utilisateur
        const response = await api.get(
          "http://127.0.0.1:8000/api/v1/auth/users/me/"
        );
        console.log(response.data);

        // Si la validation réussit, récupérer les données utilisateur
        commit("setUser", response.data); // Sauvegarder l'utilisateur dans Vuex
        return true; // Le token est valide et l'utilisateur est authentifié
      } catch (error) {
        // En cas d'erreur (token invalide, expiré, etc.), déconnecter l'utilisateur
        commit("removeToken");
        return false;
      }
    },
  },
});
