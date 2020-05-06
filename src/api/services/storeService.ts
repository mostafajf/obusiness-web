import { IStore } from "../models/IStore";
import { storeApiClient } from "../apiClients/storeClient";
import { Constants } from "../constants/common";
export class StoreService {
  async getAllStores(): Promise<IStore[]> {
    const response = await storeApiClient.get(Constants.API_STORE);
    return response.data as IStore[];
  }
}
