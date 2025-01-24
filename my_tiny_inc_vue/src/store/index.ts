import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: {
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

        // Configure Axios avec le token dès l'initialisation
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      } else {
        state.token = null;
        state.isAuthenticated = false;

        // Retirer l'en-tête Authorization si aucun token n'est trouvé
        delete axios.defaults.headers.common["Authorization"];
      }
    },
    setToken(state, token: string) {
      state.token = token;
      state.isAuthenticated = true;

      // Enregistrer le token dans localStorage
      localStorage.setItem("token", token);

      // Configure Axios immédiatement après la connexion
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    },
    removeToken(state) {
      state.token = null;
      state.isAuthenticated = false;

      // Supprimer le token de localStorage
      localStorage.removeItem("token");

      // Supprimer l'en-tête Authorization d'Axios
      delete axios.defaults.headers.common["Authorization"];
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async validateToken({ commit, state }) {
      if (!state.token) {
        commit("removeToken");
        return false;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/auth/validate-token"
        );
        // Si la validation réussit, récupérer les données utilisateur
        commit("setUser", response.data.user);
        return true;
      } catch (error) {
        // En cas d'erreur (token invalide, expiré, etc.), déconnecter l'utilisateur
        commit("removeToken");
        return false;
      }
    },
  },
});
