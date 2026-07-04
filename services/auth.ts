import { LoginPayload, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "@/types/auth";
import axiosBase from "./axios-base";
import { ApiResponse } from "@/types/base";
const LOGIN_API  = 'auth/authorized-dealer/login';

export const login = async (data:LoginPayload):Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosBase.post(LOGIN_API,data);
  return response.data;
}


export const refreshToken = async (
  data: RefreshTokenRequest,
): Promise<ApiResponse<RefreshTokenResponse>> => {
  const response = await axiosBase.post(
    "/auth/authorized-dealer/refresh-token",
    data,
  );
  return response.data;
};
