<template>
  <main>
    <ul class="category-list">
      <li
        v-for="(category, index) in categories"
        :key="index"
        :id="category.iD"
      >
        <h2 class="category-title fw-600">{{ category.name }}</h2>
        <ul class="product-list">
          <li v-for="product in category.products" :key="product.iD">
            <product
              :product="product"
              @click.native="showProductDetails(product)"
            />
          </li>
        </ul>
      </li>
    </ul>
    <modal ref="modal" v-if="showModal" @closed="showModal = false">
      <product-details :product="selectedProduct" @item-added="closeModal()" />
    </modal>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { PropOptions } from "vue";
import { CategoryDto } from "../../api/models/CategoryDto";
import Product from "@/components/category/product.vue";
import Modal from "@/components/shared/modal.vue";
import ProductDetails from "@/components/category/productDetails.vue";
import { ProductDto } from "../../api/models/ProductDto";
export default Vue.extend({
  name: "CategoryProducts",
  components: {
    Product,
    Modal,
    ProductDetails
  },
  data() {
    return {
      showModal: false,
      selectedProduct: {}
    };
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    } as PropOptions<CategoryDto[]>
  },
  methods: {
    showProductDetails(product: ProductDto) {
      this.showModal = true;
      const structuredProduct = new ProductDto(product);
      structuredProduct.resetCount();
      this.selectedProduct = structuredProduct;
    },
    closeModal() {
      this.showModal = false;
      (this.$refs.modal as any).close();
    }
  }
});
</script>

<style scoped></style>
