<template>
  <main>
    <ul class="category-list">
      <li v-for="(category, index) in categories" :key="index">
        <h2>{{ category.name }}</h2>
        <ul class="product-list">
          <li v-for="product in category.products" :key="product.iD">
            <div class="product-box">
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <div>{{ product.shortDescription }}</div>
                <div class="product-price">${{ product.price }}</div>
              </div>
              <div v-if="product.photoUrl">
                <img :src="product.photoUrl" :alt="product.name" />
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { PropOptions } from "vue";
import { CategoryDto } from "../../api/models/CategoryDto";
export default Vue.extend({
  name: "CategoryProducts",
  props: {
    categories: {
      type: Array,
      default: () => []
    } as PropOptions<CategoryDto[]>
  }
});
</script>

<style scoped></style>
