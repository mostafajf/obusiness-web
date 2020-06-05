<template>
  <div class="custome-radio">
    <input
      ref="radioInput"
      type="radio"
      :checked="value"
      :id="radioId"
      :name="group"
      @input="change"
    />
    <label :for="radioId" @click="selectInput()">
      <div></div>
      <div>{{ label }}</div>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CommonHelper } from "../../../api/helpers/commonHelper";

export default Vue.extend({
  name: "Radio",
  props: ["value", "label", "group"],
  data() {
    return {
      radioId: ""
    };
  },
  mounted() {
    this.radioId = CommonHelper.uuid();
  },
  methods: {
    selectInput() {
      (this.$refs.radioInput as HTMLElement).click();
    },
    change(event) {
      this.$emit("input", event.target.checked);
      this.$emit("updated");
    }
  }
});
</script>

<style scoped></style>
