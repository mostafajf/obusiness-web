import { IStore } from '../models/IStore';
import Axios from 'axios';
import { storeApiClient } from '../apiClients/storeClient'
import { Constants } from "../constants/common"
export class storeService {
    async getAllStores(): Promise<IStore[]> {
        let response = await storeApiClient.get(Constants.API_STORE)
        return response.data as IStore[];
    }
}