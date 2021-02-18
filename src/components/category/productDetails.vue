<template>
  <div class="product-details">
    <img :src="product.photoUrl" :alt="product.name" />
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <div class="product-description">{{ product.shortDescription }}</div>
    </div>
    <modifiers :modifier-groups="vm.modifierGroups" />
    <hr />
    <div class="footer">
      <div class="quantities">
        <button :disabled="!vm.decCanExecute" @click="vm.decExecute()">
          <span class="material-icons">remove</span>
        </button>
        <div>{{ vm.count }}</div>
        <button :disabled="!vm.incCanExecute" @click="vm.incExecute()">
          <span class="material-icons">add</span>
        </button>
      </div>
      <div style="width:24px"></div>
      <button class="add-to-cart-btn" @click="addToCart()">
        <div></div>
        <div>Add to order</div>
        <div>${{ vm.itemValue }}</div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProductDto } from "../../api/models/ProductDto";
import Modifiers from "@/components/category/modifiers.vue";
import { mapMutations } from "vuex";
export default Vue.extend({
  name: "ProductDetails",
  components: {
    Modifiers
  },
  props: {
    product: {
      type: ProductDto,
      default: new ProductDto({})
    }
  },
  data() {
    return {
      vm: new ProductDto(this.product)
    };
  },
  methods: {
    ...mapMutations(["addItem"]),
    addToCart() {
      this.addItem(this.vm);
      this.$emit("item-added");
    }
  }
});
</script>

<style scoped></style>
