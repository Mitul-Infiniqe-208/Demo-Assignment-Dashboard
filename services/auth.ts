import { LoginPayload, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "@/types/auth";
import axiosBase from "./axios-base";
import { ApiResponse } from "@/types/base";
const API_LOGIN  = 'auth/authorized-dealer/login';
const API_REFRESH_TOKEN  = 'auth/authorized-dealer/refresh-token';

export const login = async (data:LoginPayload):Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosBase.post(API_LOGIN,data);
  return response.data;
}


export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<ApiResponse<RefreshTokenResponse>> => {
  const response = await axiosBase.post(
    API_REFRESH_TOKEN,
    data,
  );
  return response.data;
};
