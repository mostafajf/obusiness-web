<template>
  <div class="shopping-cart">
    <div class="h-24"></div>
    <button class="close" aria-label="close" @click="$emit('closed')">
      <div style="height:24px">
        <svg
          width="24px"
          height="24px"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
            fill="#000000"
          ></path>
        </svg>
      </div>
    </button>
    <div class="h-24"></div>
    <div class="title">Your order</div>
    <div class="h-24"></div>
    <ul class="items">
      <li v-for="(item, index) of items" :key="index">
        <div>
          <select name="" id="">
            <option v-for="i in 10" :key="i" value="i">{{ i }}</option>
          </select>
        </div>
        <div class="w-16"></div>
        <div class="item-info-box">
          <div class="item-info">
            <div class="fw-700">{{ item.name }}</div>
            <div class="w-8"></div>
            <div>${{ item.price | currency }}</div>
            <button @click="deleteItem(item)">
              <svg
                width="24px"
                height="24px"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </div>
          <ul class="modifiers-list">
            <li v-for="(md, index2) of item.selectedModifiers" :key="index2">
              <div>{{ md.name }}</div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ProductDto } from "../../api/models/ProductDto";
import { mapMutations } from "vuex";
export default Vue.extend({
  name: "ShoppingCart",
  mounted() {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop >= 200) {
        this.$emit("closed");
      }
    });
  },
  computed: {
    items() {
      return this.$store.getters.cartItems as ProductDto[];
    }
  },
  methods: {
    ...mapMutations(["removeItem"]),
    deleteItem(item: ProductDto) {
      this.removeItem(item.uuid);
    }
  }
});
</script>

<style scoped></style>
