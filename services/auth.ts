import { LoginPayload } from "@/types/auth";
import axiosBase from "./axios-base";
import { ApiResponse } from "@/types/base";
const LOGIN_API  = 'auth/authorized-dealer/login';

export interface LoginResponse {
  token: string;
}

export const login = async (data:LoginPayload):Promise<ApiResponse<LoginPayload>> => {
  const response = await axiosBase.post(LOGIN_API,data);
  return response.data;
}
