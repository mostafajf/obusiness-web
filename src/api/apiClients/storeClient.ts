import axios from "axios";

export const storeApiClient = axios.create({
    baseURL: "http://localhost:9000/api/",
    // 5 minutes
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
    }
});
