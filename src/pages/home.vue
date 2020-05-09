<template lang="html">
  <div>
    <store-list :stores="stores"></store-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { Store } from "../api/models/Store";
import storeList from "@/components/stores/storeList.vue";
export default Vue.extend({
  name: "Home",
  components: {
    storeList
  },
  mounted() {
    this.getStores();
  },
  computed: {
    stores(): Store[] {
      return this.$store.state.storeModule.stores;
    }
  },
  methods: {
    ...mapActions(["getStores"])
  }
});
</script>
<style lang="sass" scoped></style>
