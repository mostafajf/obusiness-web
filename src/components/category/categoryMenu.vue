<template>
  <nav class="category-menu">
    <div v-for="category in categories" :key="category.iD">
      {{ category.name }}
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { CategoryDto } from "../../api/models/CategoryDto";
import { PropOptions } from "vue";
export default Vue.extend({
  name: "CategoryMenu",
  props: {
    categories: {
      type: Array,
      default: () => []
    } as PropOptions<CategoryDto[]>
  }
});
</script>

<style scoped></style>
