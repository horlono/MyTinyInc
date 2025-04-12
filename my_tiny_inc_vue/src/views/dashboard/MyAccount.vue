<template>
  <div class="page-my-account">
    <h1 class="title">My account</h1>
    <strong>Team: </strong>{{ team.name }}<br />
    <strong>username: </strong>{{ $store.state.user.username }}<br />
    <div class="buttons">
      <router-link to="/dashboard/my-account/edit-team" class="button is-light">
        Edit team</router-link
      >
    </div>
    <button @click="logout()" class="button is-danger">Log out</button>
  </div>
</template>

<script>
import api from "@/utils/axios";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "MyAccount",
  data() {
    return {
      team: {},
    };
  },
  async mounted() {
    await this.getOrCreateTeam();
  },
  methods: {
    getOrCreateTeam() {
      api
        .get("teams/")
        .then((response) => {
          this.team = response.data[0];
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    logout() {
      this.$store.commit("removeToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
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
