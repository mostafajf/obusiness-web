<template>
  <div>
    <top-header />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import topHeader from "@/components/shared/topHeader.vue";
export default Vue.extend({
  name: "storeLayout",
  components: {
    topHeader
  }
});
</script>

<style scoped></style>
