<template>
  <div class="product-details">
    <img :src="product.photoUrl" :alt="product.name" />
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <div class="product-description">{{ product.shortDescription }}</div>
    </div>
    <hr />
    <div class="footer">
      <div class="quantities">
        <button><span class="material-icons">remove</span></button>
        <div>1</div>
        <button><span class="material-icons">add</span></button>
      </div>
      <div style="width:24px"></div>
      <button class="add-to-cart-btn">
        <div></div>
        <div>Add to order</div>
        <div>${{ product.price }}</div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProductDto } from "../../api/models/ProductDto";

export default Vue.extend({
  name: "ProductDetails",
  props: {
    product: {
      type: ProductDto
    }
  }
});
</script>

<style scoped></style>
