import { env } from "@/lib/config";
import axios from "axios";

const CLIENT_ID = env.clientId;
const CLIENT_SECRET = env.clientSecret;
const basicAuthHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

const axiosBase = axios.create({
  baseURL: env.apiUrl,
});

axiosBase.interceptors.request.use(async (config) => {
  config.headers["Authorization"] = `Basic ${basicAuthHeader}`;
  return config;
});

export default axiosBase;
