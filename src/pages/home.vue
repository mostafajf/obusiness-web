<template>
  <div>
    <h1>sssss</h1>
    <h1 v-for="(store, index) in stores" :key="index">{{ store.name }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { IStore } from "../api/models/IStore";
export default Vue.extend({
  name: "Home",
  mounted() {
    this.getStores();
  },
  computed: {
    stores(): IStore[] {
      return this.$store.state.storeModule.stores as IStore[];
    },
  },
  methods: {
    ...mapActions(["getStores"]),
  },
});
</script>
