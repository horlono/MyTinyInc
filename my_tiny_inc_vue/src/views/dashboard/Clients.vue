<template>
  <div class="page-clients">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'DashboardView' }">Dashboard</router-link>
        </li>
        <li class="is-active">
          <router-link :to="{ name: 'DashboardClients' }" aria-current="true"
            >Clients</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Clients</h1>

        <router-link :to="{ name: 'AddClient' }" class="button is-light mt-4"
          >Add client</router-link
        >
      </div>

      <div class="column is-3" v-for="client in clients" v-bind:key="client.id">
        <div class="box">
          <h3 class="is-size-4 mb-4">{{ client.name }}</h3>

          <router-link
            :to="{ name: 'ClientView', params: { id: client.id } }"
            class="button is-light"
            >Details</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/axios";
export default {
  name: "DashboardClients",
  data() {
    return {
      clients: [],
    };
  },
  mounted() {
    this.getClients();
  },
  methods: {
    getClients() {
      // Ajouter le token d'authentification à l'en-tête
      const token = this.$store.state.token;

      api
        .get("/clients/")
        .then((response) => {
          this.clients = response.data; // Récupérer directement les données
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>
