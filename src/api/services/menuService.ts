import { storeApiClient } from "../apiClients/storeClient";
import { Constants } from "../constants/common";
import { StringHelper } from "../helpers/stringHelper";
import { MenuFactory } from "../models/menuFactory";
import { MenuDto } from "../models/MenuDto";
export class MenuService {
  async getAllMenus(StoreId: string): Promise<MenuDto[]> {
    const response = await storeApiClient.get(
      StringHelper.interpolate(Constants.API_MENUS, StoreId)
    );
    const mFactory = new MenuFactory();
    const menuVm = mFactory.ToMenuDto(response.data);
    return menuVm;
  }
}
