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
      <img :src="product.photoUrl" :alt="product.name" @error="imgNotFound" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProductDto } from "@/api/models/ProductDto";
export default Vue.extend({
  name: "Product",
  props: {
    product: {
      type: ProductDto,
      default: () => new ProductDto({})
    }
  },
  methods: {
    imgNotFound(event) {
      event.target.src = "#";
    }
  }
});
</script>

<style scoped></style>
