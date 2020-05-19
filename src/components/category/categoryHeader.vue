<template>
  <div>
    <div class="category-header">
      <figure>
        <img :src="store.profileImage" :alt="store.name" />
      </figure>
      <div class="store-info-container">
        <div></div>
        <div class="store-info">
          <div class="info-box">
            <div></div>
            <div class="content">
              <h1>{{ store.name }}</h1>
              <div class="mt-1">{{ address }}</div>
              <div class="mt-1">{{ store.officePhone }}</div>
              <div class="mt-1" v-if="operatingTime">
                from
                <span>{{ operatingTime.openTime }}</span>
                to
                <span>{{ operatingTime.closeTime }}</span>
              </div>
              <div v-else>Store is closed</div>
            </div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Store } from "../../api/models/Store";
import { DatetimeHelper } from "../../api/helpers/datetimeHelper";
export default Vue.extend({
  name: "CategoryHeader",
  computed: {
    store(): Store {
      return this.$store.state.storeModule.currentStore as Store;
    },
    address(): string {
      const address: string[] = [];
      if (this.store.location.address) {
        address.push(this.store.location?.address);
      }
      if (this.store.location?.state) {
        address.push(this.store.location.state);
      }
      if (this.store.location?.suburb) {
        address.push(this.store.location.suburb);
      }
      return address.join(", ");
    },
    operatingTime(): any {
      return DatetimeHelper.openCloseTime(this.store.operatingHours);
    }
  }
});
</script>

<style scoped></style>
