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
      this.$store.commit("removeToken");
      this.$router.push("/log-in");
    },
  },
  created() {
    if (!this.$store.state.isAuthenticated) {
      this.$router.push("/log-in"); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    }
  },
};
</script>
