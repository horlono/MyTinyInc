<template>
  <div class="columns">
    <div class="column is-3">
      <div class="field">
        <label>Title</label>
        <div class="control">
          <input type="text" class="input" v-model="item.title" />
        </div>
      </div>
    </div>

    <div class="column is-3">
      <div class="field">
        <label>Price</label>
        <div class="control">
          <input type="text" class="input" v-model="item.unit_price" />
        </div>
      </div>
    </div>

    <div class="column is-2">
      <div class="field">
        <label>Quantity</label>
        <div class="control">
          <input type="number" class="input" v-model="item.quantity" />
        </div>
      </div>
    </div>

    <div class="column is-2">
      <div class="field">
        <label>Vat rate</label>
        <div class="control">
          <div class="select">
            <select v-model="item.vat_rate">
              <option value="0">0%</option>
              <option value="14">14%</option>
              <option value="25">25%</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-2">
      <div class="field">
        <label>Gross amount</label>
        <div class="control">
          <input
            type="text"
            class="input"
            v-bind:value="gross_amount"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        unit_price: 0,
        quantity: 0,
        vat_rate: 0,
        net_amount: 0,
      },
    };
  },
  computed: {
    gross_amount() {
      const unit_price = this.item.unit_price;
      const quantity = this.item.quantity;
      const vat_rate = this.item.vat_rate;

      return unit_price * quantity + (unit_price * quantity * vat_rate) / 100;
    },
  },
  watch: {
    // Watch for changes on item (or its specific properties)
    item: {
      handler(newValue) {
        // Calculate the net amount whenever item changes
        newValue.net_amount = newValue.unit_price * newValue.quantity;

        // Emit the event with the updated item
        this.$emit("updatePrice", newValue);
      },
      deep: true, // Watch nested properties of `item`
    },
  },
};
</script>
