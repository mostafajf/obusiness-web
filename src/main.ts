import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fullLayout from "@/layouts/fullLayout.vue";
import storeLayout from "@/layouts/storeLayout.vue";
import { DetectMobile } from "@/mixins/detectmobile";
import { DetectWC } from "@/mixins/wcDetector";
import { DetectVersion } from "@/mixins/versionDetector";

Vue.component("full-layout", fullLayout);
Vue.component("store-layout", storeLayout);
Vue.mixin(DetectMobile);
Vue.mixin(DetectWC);
Vue.mixin(DetectVersion);
Vue.config.productionTip = false;
require("./assets/main.scss");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
