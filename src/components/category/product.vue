<template>
  <div class="product-box">
    <div class="product-info">
      <h4>{{ product.name }}</h4>
      <div class="discription">
        <div>{{ product.shortDescription }}</div>
      </div>
      <div class="product-price">${{ product.price }}</div>
    </div>
    <div v-if="product.photoUrl">
      <img :src="product.photoUrl" :alt="product.name" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PropOptions } from "vue";
import { ProductDto } from "../../api/models/ProductDto";

export default Vue.extend({
  name: "Product",
  props: {
    product: {
      type: Object
    } as PropOptions<ProductDto>
  }
});
</script>

<style scoped></style>
