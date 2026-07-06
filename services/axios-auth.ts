import { env } from "@/constants/config";
import { refreshToken as refreshTokenRequest } from "@/services/auth";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const handleRefreshToken = async (
  error: AxiosError,
): Promise<AxiosResponse | void> => {
  try {
    
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return;
    }

    const response = await refreshTokenRequest({
      refreshToken: String(refreshToken),
    });
    
    const tokens = response.data;

    if (!tokens.accessToken) {
      throw new Error("Invalid refresh token response");
    }

    Cookies.set("accessToken", tokens.accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    console.log(tokens, "tokens");
    console.log(response, "response");

    const originalConfig = error.config as AxiosRequestConfig;

    const axiosRequest: AxiosRequestConfig = {
      ...originalConfig,
      headers: {
        ...(originalConfig.headers ?? {}),
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    };

    return axios(axiosRequest);
  } catch (err: any) {
    const status = err?.response?.status;

    if (status === 400 || status === 401) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return;
    }

    return Promise.reject(err);
  }
};

const axiosAuth = axios.create({
  baseURL: env.apiUrl,
});

axiosAuth.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      return await handleRefreshToken(error);
    }
    return Promise.reject(error);
  },
);

export default axiosAuth;