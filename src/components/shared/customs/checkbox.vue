<template>
  <div class="custom-radio" :class="{ disabled: isDisabled }">
    <input
      ref="checkboxInput"
      type="checkbox"
      :checked="value"
      :id="checkboxId"
      @input="change"
      :disabled="isDisabled"
    />
    <label class="check" :for="checkboxId" @click="selectInput()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 20 20"
        fill="none"
        style="&#10;    background: white;&#10;"
        class="checkmark"
      >
        <path
          d="M0 0V20H20V0H0ZM8.5 15.1L2.90002 9.5L5 7.39999L8.40002 10.8L14.8 4.39999L16.9 6.5L8.5 15.1Z"
        />
      </svg>
      <div></div>
      <div>{{ label }}</div>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CommonHelper } from "../../../api/helpers/commonHelper";

export default Vue.extend({
  name: "Checkbox",
  props: ["value", "label", "isDisabled"],
  data() {
    return {
      checkboxId: ""
    };
  },
  mounted() {
    this.checkboxId = CommonHelper.uuid();
  },
  methods: {
    selectInput() {
      const elm = this.$refs.checkboxInput as HTMLInputElement;

      if (elm.value === "on") elm.value = "off";
      else elm.value = "on";
    },
    change(event) {
      this.$emit("input", event.target.checked);
      this.$emit("updated");
    }
  }
});
</script>

<style scoped></style>
