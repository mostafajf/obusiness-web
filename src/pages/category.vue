<template>
  <div>
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
import { mapActions } from "vuex";
import { MenuDto } from "../api/models/MenuDto";
import { CommonHelper } from "../api/helpers/commonHelper";
export default Vue.extend({
  name: "Category",
  components: {
    CategoryHeader,
    CategoryMenu,
    CategoryProducts
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

<style scoped></style>
