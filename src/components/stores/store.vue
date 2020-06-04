<template>
  <div class="store">
    <figure height="240">
      <div>
        <img :alt="store.name" :src="store.profileImage" aria-hidden="true" />
      </div>
    </figure>
    <div class="title">{{ store.name }}</div>
  </div>
</template>

<script lang="ts">
import { Store } from "@/api/models/Store";
import { PropOptions } from "vue";

export default {
  name: "store",
  props: {
    store: {
      type: Object
    } as PropOptions<Store>
  }
};
</script>
