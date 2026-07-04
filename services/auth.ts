import { LoginPayload, LoginResponse } from "@/types/auth";
import axiosBase from "./axios-base";
import { ApiResponse } from "@/types/base";
const LOGIN_API  = 'auth/authorized-dealer/login';

export const login = async (data:LoginPayload):Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosBase.post(LOGIN_API,data);
  return response.data;
}
