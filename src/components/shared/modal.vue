<template>
  <div class="modal-backdrop">
    <div class="modal-container" @click.self="close()">
      <div class="size-y"></div>
      <div class="modal-body" role="dialog">
        <div class="modal-content">
          <slot>
            <div v-for="i in 30" :key="i">
              <h1>{{ i }}</h1>
            </div>
          </slot>
        </div>
      </div>
      <div class="size-y"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { scrollbarWidth } from "@/api/helpers/uiHelpers";
export default Vue.extend({
  name: "Modal",
  mounted() {
    document.documentElement.style.paddingRight = scrollbarWidth() + "px";
    document.documentElement.style.overflow = "hidden";
  },
  methods: {
    close() {
      this.$emit("closed");
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.paddingRight = "0";
    }
  }
});
</script>

<style scoped></style>
