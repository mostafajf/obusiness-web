import { Store } from "../models/Store";
import { storeApiClient } from "../apiClients/storeClient";
import { Constants } from "../constants/common";
export class StoreService {
  async getAllStores(): Promise<Store[]> {
    const response = await storeApiClient.get(Constants.API_STORE);
    return response.data as Store[];
  }
}
