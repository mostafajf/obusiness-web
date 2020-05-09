import { StoreService } from "@/api/services/storeService";
export default {
  state: {
    stores: []
  },
  mutations: {
    setStores(state, payload) {
      state.stores = payload;
    }
  },
  actions: {
    async getStores(context) {
      const storeService = new StoreService();
      const stores = await storeService.getAllStores();
      context.commit("setStores", stores);
    }
  },
  getters: {}
};
