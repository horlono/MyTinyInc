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
            <div class="navbar-item">
              <div class="buttons"></div>
              <router-link to="dashboard/my-account" class="button is-light"
                >My Account</router-link
              >
            </div>
          </template>
          <template v-else>
            <router-link to="/" class="navbar-item">Home</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/sign-up" class="button is-succes"
                  ><strong>Sign up</strong></router-link
                >
                <router-link to="/log-in" class="button is-succes"
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
import axios from "axios";
export default {
  name: "App",
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma/";
</style>
