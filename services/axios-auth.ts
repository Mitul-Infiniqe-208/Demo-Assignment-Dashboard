import { env } from "@/constants/config";
import { refreshToken as refreshTokenRequest } from "@/services/auth";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const handleRefreshToken = async (
  error: AxiosError,
): Promise<AxiosResponse | void> => {
  try {
  
    const refreshToken = getCookie("refreshToken");

    if (!refreshToken) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      return;
    }

    const response = await refreshTokenRequest({
      refreshToken: String(refreshToken),
    });
    
    const tokens = response.data;

    if (!tokens.accessToken) {
      throw new Error("Invalid refresh token response");
    }

    setCookie("accessToken", tokens.accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });

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
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      return;
    }

    return Promise.reject(err);
  }
};

const axiosAuth = axios.create({
  baseURL: env.apiUrl,
});

axiosAuth.interceptors.request.use((config) => {
  const token = getCookie("accessToken");

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