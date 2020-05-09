import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storeModule from "./modules/storeModule";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    storeModule
  },
  plugins: [
    createPersistedState({
      paths: ["storeModeule"]
    })
  ]
});
