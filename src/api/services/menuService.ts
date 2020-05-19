import { Store } from "../models/Store";
import { storeApiClient } from "../apiClients/storeClient";
import { Constants } from "../constants/common";
import { StringHelper } from "../helpers/stringHelper";
export class MenuService {
  async getAllMenus(StoreId: string): Promise<Store[]> {
    const response = await storeApiClient.get(
      StringHelper.interpolate(Constants.API_MENUS, StoreId)
    );
    return response.data;
  }
}
