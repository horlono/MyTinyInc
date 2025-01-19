import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

// Définir l'URL de base pour Axios
axios.defaults.baseURL = "http://127.0.0.1:8000";

const app = createApp(App);

// Ajouter Axios globalement à l'application Vue
app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount("#app");
