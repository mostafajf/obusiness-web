<template>
  <section class="responsive-items store-list">
    <article v-for="(store, index) in stores" :key="index">
      <store :store="store" />
    </article>
  </section>
</template>

<script lang="ts">
import store from "./store.vue";
import { Store } from "@/api/models/Store";
import { PropOptions } from "vue";
export default {
  name: "storeList",
  components: {
    store
  },
  props: {
    stores: {
      type: Array,
      default: () => []
    }
  }
};
</script>
