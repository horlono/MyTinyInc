<template>
  <div class="page-add-invoice">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Add Invoice</h1>
        <h2 class="subtitle">Create a new invoice</h2>
      </div>
      <div class="column is-12">
        <h2 ckass="is-size-5 mb-4">Client</h2>
        <div class="select">
          <select v-model="invoice.client">
            <option value="" selected>Select a client</option>
            <!--  <option value="">- Select a client -</option>
            <option value="0">No client</option>
          -->
            <option v-for="client in clients" :key="client.id" :value="client">
              {{ client.name }}
            </option>
          </select>
        </div>
        <div class="box mt-4" v-if="invoice.client"></div>
        <p>
          <strong>{{ invoice.client.name }}</strong>
        </p>
        <p><strong>Email:</strong>{{ invoice.client.email }}</p>
        <p v-if="invoice.client.address1">{{ invoice.client.address1 }}</p>
        <p v-if="invoice.client.address2">{{ invoice.client.address2 }}</p>
        <p v-if="invoice.client.zipcode || invoice.client.place">
          {{ invoice.client.zip }} {{ invoice.client.place }}
        </p>
        <p v-if="invoice.client.country">{{ invoice.client.country }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/utils/axios";
import { toast } from "bulma-toast";
export default {
  name: "AddInvoice",
  data() {
    return {
      invoice: {
        client: {}, //if instead client: "" i just  get the id of the client
        items: [
          {
            item_num: 0,
            title: "",
            unit_price: "",
            quantity: 1,
            vat_rate: 0,
            net_amount: 0,
          },
        ],
      },
      clients: [],
    };
  },
  async mounted() {
    await this.getClients();
  },
  methods: {
    getClients() {
      api
        .get("/clients/")
        .then((response) => {
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>
