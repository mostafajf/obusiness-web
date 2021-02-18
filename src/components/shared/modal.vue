<template>
  <div id="modal" class="modal-backdrop">
    <div class="modal-container" @click.self="close()">
      <div class="size-y"></div>
      <div class="modal-body" role="dialog">
        <div class="modal-content">
          <div class="header" @click="close()">
            <div ref="titleDiv">
              <div class="title">
                Mighty Fillet Combo
              </div>
            </div>
            <button aria-label="Close">
              <div>
                <svg
                  width="24px"
                  height="24px"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
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
    const modal = document.getElementById("modal") as HTMLElement;
    const title = this.$refs.titleDiv as HTMLElement;
    modal.addEventListener("scroll", () => {
      console.log(modal.scrollTop);
      if (modal.scrollTop >= 100) {
        title.style.height = "64px";
        title.style.opacity = "1";
      } else {
        title.style.height = "0";
        title.style.opacity = "0";
      }
    });
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
