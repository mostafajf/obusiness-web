import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storeModule from "./modules/storeModule";
import menuModule from "./modules/menuModule";
import shoppingCartModule from "./modules/shoppingCartModule";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    storeModule,
    menuModule,
    shoppingCartModule
  },
  plugins: [
    createPersistedState({
      key: "obusiness",
      paths: ["storeModule", "menuModule", "shoppingCartModule"]
    })
  ]
});
