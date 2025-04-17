<template>
  <div class="page-invoices">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Invoices</h1>
      </div>

      <div class="column is-12">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Is paid</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="invoice in invoices" v-bind:key="invoice.id">
              <td>{{ invoice.invoice_number }}</td>
              <td>{{ invoice.client }}</td>
              <td>{{ invoice.gross_amount }}</td>
              <td>{{ invoice.get_due_date_formatted }}</td>
              <td>{{ getStatusLabel(invoice) }}</td>
              <td>
                <router-link
                  :to="{ name: 'DetailInvoice', params: { id: invoice.id } }"
                  >Details</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/axios";

export default {
  name: "DashboardInvoices",
  data() {
    return {
      invoices: [],
    };
  },
  mounted() {
    this.getInvoices();
  },
  methods: {
    getInvoices() {
      api
        .get("/invoices/")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.invoices.push(response.data[i]);
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    getStatusLabel(invoice) {
      if (invoice.is_paid) {
        return "Is paid";
      } else {
        return "Is not paid";
      }
    },
    getInvoiceType(invoice) {
      if (invoice.invoice_type === "creditnote") {
        return "Credit note";
      } else {
        return "Invoice";
      }
    },
    getInvoiceDate(invoice) {
      const date = new Date(invoice.invoice_date);
      return date.toLocaleDateString("en-GB");
    },
    getDueDate(invoice) {
      const date = new Date(invoice.due_date);
      return date.toLocaleDateString("en-GB");
    },
    getInvoiceNumber(invoice) {
      return invoice.invoice_number;
    },
  },
};
</script>
