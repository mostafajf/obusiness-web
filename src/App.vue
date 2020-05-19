<template>
  <div id="ob-app">
    <div class="root">
      <component :is="layout">
        <router-view />
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const defaultLayout = "full";
export default Vue.extend({
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  }
});
</script>
