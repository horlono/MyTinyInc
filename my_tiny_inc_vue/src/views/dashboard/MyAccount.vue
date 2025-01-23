<template>
  <div class="page-my-account">
    <h1 class="title">My account</h1>

    <button @click="logout()" class="button is-danger">Log out</button>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "MyAccount",
  methods: {
    logout() {
      // Appel API pour logout
      axios
        .post("/api/v1/auth/token/logout/")
        .then(() => {
          // Si le logout est réussi sur le serveur, on efface le token et la session
          this.$store.commit("removeToken");
          this.$router.push("/log-in"); // Rediriger vers la page de connexion
        })
        .catch((error) => {
          console.log("Erreur lors de la déconnexion", error);
        });
    },
  },
  created() {
    if (!this.$store.state.isAuthenticated) {
      this.$router.push("/log-in"); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    }
  },
};
</script>
