<template>
  <div class="page-login">
    <!-- Centrage horizontal et vertical avec flexbox -->
    <div class="columns is-centered">
      <div class="column is-4">
        <h1 class="title has-text-centered">Log in</h1>
        <!-- Titre centré -->
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>E-Mail</label>
            <div class="control">
              <input
                type="email"
                name="username"
                class="input"
                v-model="username"
              />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input
                type="password"
                name="password"
                class="input"
                v-model="password"
              />
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-success">Log In</button>
            </div>
          </div>
        </form>
        <hr />

        <router-link to="/sign-up">Click here</router-link> to sign up!
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/utils/axios";

export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];

      // Reset Auth
      this.$store.commit("removeToken");

      try {
        const formData = {
          username: this.username,
          password: this.password,
        };

        // 🔐 Login
        const response = await api.post("/auth/token/login/", formData);
        const token = response.data.auth_token;
        this.$store.commit("setToken", token);

        // 👤 Get User
        const userResponse = await api.get("/users/me/");
        this.$store.commit("setUser", {
          id: userResponse.data.id,
          username: userResponse.data.username,
        });

        // ✅ Redirect
        this.$router.push("/dashboard");
      } catch (error) {
        if (error.response?.data?.non_field_errors) {
          this.errors.push("Invalid username or password. Please try again.");
        } else if (error.response?.data) {
          for (const property in error.response.data) {
            this.errors.push(`${property}: ${error.response.data[property]}`);
          }
        } else if (error.message) {
          this.errors.push(error.message);
        } else {
          this.errors.push("An unknown error occurred.");
        }
      }
    },
  },
};
</script>
