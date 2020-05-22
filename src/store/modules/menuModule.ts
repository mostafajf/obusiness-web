import { MenuService } from "@/api/services/menuService";

export default {
  state: {
    menus: [],
    currentMenu: null
  },
  mutations: {
    setMenus(state, payload) {
      state.menus = payload;
    },
    setCurrentMenu(state, payload) {
      state.currentMenu = payload;
    }
  },
  actions: {
    async getMenus(context) {
      const menuService = new MenuService();
      const menus = await menuService.getAllMenus(
        context.getters.getCurrentStore.id
      );
      context.commit("setMenus", menus);
    }
  },
  getters: {
    getCurrentMenu(state) {
      return state.menus[0];
    }
  }
};
