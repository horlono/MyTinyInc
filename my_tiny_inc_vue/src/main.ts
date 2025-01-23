import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

// Définir l'URL de base pour Axios
axios.defaults.baseURL = "http://127.0.0.1:8000";

// Ajouter Axios globalement à l'application Vue
const app = createApp(App);
app.config.globalProperties.$axios = axios;

// Ajouter un intercepteur pour gérer les erreurs 401
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Non autorisé, veuillez vous reconnecter.");
      // Déconnecter l'utilisateur (effacer le token et mettre à jour l'état Vuex)
      store.commit("removeToken");
      // Rediriger vers la page de connexion
      router.push("/log-in");
    }
    return Promise.reject(error);
  }
);

// Initialiser l'état Vuex à partir du stockage local
store.commit("initializeStore");

app.use(store).use(router).mount("#app");
