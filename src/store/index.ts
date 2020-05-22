import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storeModule from "./modules/storeModule";
import menuModule from "./modules/menuModule";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    storeModule,
    menuModule
  },
  plugins: [
    createPersistedState({
      paths: ["storeModule", "menuModule"]
    })
  ]
});
