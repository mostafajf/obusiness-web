import axios from "axios";

export const storeApiClient = axios.create({
  baseURL: "http://localhost:9000/api/",
  // 5 minutes
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
});
