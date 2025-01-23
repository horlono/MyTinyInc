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
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;

        // Configure Axios avec le token dès l'initialisation
        axios.defaults.headers.common["Authorization"] = `Token ${state.token}`;
      } else {
        state.token = "";
        state.isAuthenticated = false;

        // Retirer l'en-tête Authorization si aucun token n'est trouvé
        delete axios.defaults.headers.common["Authorization"];
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;

      // Configure Axios immédiatement après la connexion
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;

      // Supprime l'en-tête Authorization d'Axios
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
