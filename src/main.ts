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
// Vue.config.errorHandler = error => {
//   console.error("vue error");
// };
// window.onerror = function(message, source, lineno, colno, error) {
//   console.error("gloal error");
// };
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
