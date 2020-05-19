<template>
  <category-header />
</template>

<script lang="ts">
import Vue from "vue";
import CategoryHeader from "@/components/category/categoryHeader.vue";
export default Vue.extend({
  name: "Category",
  components: {
    CategoryHeader
  }
});
</script>

<style scoped></style>
