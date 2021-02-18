<template>
  <div>
    <transition name="fade">
      <shopping-cart
        v-if="showCart"
        class="dialog"
        @closed="showCart = false"
      />
    </transition>
    <category-header />
    <category-menu :categories="currentMenu.categories" />
    <category-products :categories="currentMenu.categories" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CategoryHeader from "@/components/category/categoryHeader.vue";
import CategoryMenu from "@/components/category/categoryMenu.vue";
import CategoryProducts from "@/components/category/categoryProducts.vue";
import ShoppingCart from "@/components/shared/shoppingCart.vue";
import { mapActions } from "vuex";
import { MenuDto } from "../api/models/MenuDto";
import { CommonHelper } from "../api/helpers/commonHelper";
export default Vue.extend({
  name: "Category",
  components: {
    CategoryHeader,
    CategoryMenu,
    CategoryProducts,
    ShoppingCart
  },
  data() {
    return {
      showCart: true
    };
  },
  async mounted() {
    await this.getMenus();
  },
  computed: {
    currentMenu(): MenuDto {
      return CommonHelper.jsonCopy(
        this.$store.getters.getCurrentMenu as MenuDto
      );
    }
  },
  methods: {
    ...mapActions(["getMenus"])
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
