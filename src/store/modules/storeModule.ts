import { StoreService } from "@/api/services/storeService";

export default {
  state: {
    stores: [],
    currentStore: null
  },
  mutations: {
    setStores(state, payload) {
      state.stores = payload;
    },
    setCurrentStore(state, payload) {
      state.currentStore = payload;
    }
  },
  actions: {
    async getStores(context) {
      const storeService = new StoreService();
      const stores = await storeService.getAllStores();
      context.commit("setStores", stores);
    }
  },
  getters: {
    getCurrentStore(state) {
      return state.currentStore;
    }
  }
};
