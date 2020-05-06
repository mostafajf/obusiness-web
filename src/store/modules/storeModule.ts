import { StoreService } from "@/api/services/storeService";
import store from "..";
export default {
  state: {
    stores: [],
  },
  mutations: {
    setStores(state: any, payload: any) {
      state.stores = payload;
    },
  },
  actions: {
    async getStores(context: any) {
      const storeService = new StoreService();
      const stores = await storeService.getAllStores();
      context.commit("setStores", stores);
    },
  },
  getters: {},
};
