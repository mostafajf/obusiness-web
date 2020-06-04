<template>
  <section class="responsive-items store-list">
    <article
      v-for="(store, index) in stores"
      :key="index"
      @click="selectStore(store)"
    >
      <store :store="store" />
    </article>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import store from "./store.vue";
import { Store } from "@/api/models/Store";
import { PropOptions } from "vue";
import { mapMutations } from "vuex";
export default Vue.extend({
  name: "storeList",
  components: {
    store
  },
  props: {
    stores: {
      type: Array
    } as PropOptions<Store[]>
  },
  methods: {
    ...mapMutations(["setCurrentStore"]),
    selectStore(store: Store) {
      this.setCurrentStore(store);
      this.$router.push({ name: "Category", params: { ["storeid"]: "123" } });
    }
  }
});
</script>
