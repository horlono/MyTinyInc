import axios from "axios";
import store from "@/store"; // Importation from store Vuex for getting the token

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // L'URL de l'API en fonction de l'environnement
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor to add automatically the token Authorization
api.interceptors.request.use(
  (config) => {
    const token = store.state.token; // Récover the token from Vuex

    if (token) {
      config.headers["Authorization"] = `Token ${token}`; // Add automatically the token
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor to handle global errors (e.g. expired token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit("removeToken"); //Disconnect user
      window.location.href = "/log-in"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
