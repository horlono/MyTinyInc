<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"
          ><strong>MY Tiny Inc</strong></router-link
        >
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="$store.state.isAuthenticated">
            <router-link to="/dashboard" class="navbar-item"
              >Dashboard</router-link
            >
            <router-link to="/dashboard/clients" class="navbar-item"
              >Clients</router-link
            >
            <router-link to="/dashboard/invoices" class="navbar-item"
              >Invoices</router-link
            >
            <div class="navbar-item">
              <div class="buttons">
                <router-link
                  to="/dashboard/invoices/add"
                  class="button is-success"
                  >Add Invoice</router-link
                >
                <router-link to="/dashboard/my-account" class="button is-light"
                  >My Account</router-link
                >
                <button @click="logout" class="button is-danger">Logout</button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/" class="navbar-item">Home</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/sign-up" class="button is-success"
                  ><strong>Sign up</strong></router-link
                >
                <router-link to="/log-in" class="button is-success"
                  ><strong>Log in</strong></router-link
                >
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>
    <section class="section">
      <router-view />
    </section>
    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2025</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",

  beforeCreate() {
    // Initialisation du store et validation du token
    this.$store.commit("initializeStore");

    this.$store.dispatch("validateToken").then((isValid) => {
      if (!isValid) {
        // Redirection vers la page de connexion si le token est invalide
        this.$router.push("/log-in");
      }
    });
  },

  methods: {
    logout() {
      this.$store.commit("removeToken");
      this.$router.push("/log-in");
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma/";
</style>
