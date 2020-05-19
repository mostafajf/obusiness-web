<template>
  <div class="top-header">
    <div>
      <img :src="logoUrl" alt="company logo" />
    </div>
    <div class="right-side">
      <div class="fw-600">Sign In</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "topHeader",
  data() {
    return {
      logoUrl: require("../../assets/logo.svg")
    };
  }
});
</script>

<style scoped></style>
