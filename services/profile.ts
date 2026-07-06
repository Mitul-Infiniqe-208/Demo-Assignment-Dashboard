import { ApiResponse } from "@/types/base";
import { MeResponse } from "@/types/profile";
import axiosAuth from "./axios-auth";
const API_GET_DEALER_ME = 'auth/authorized-dealer/me';

export const getMe = async (): Promise<ApiResponse<MeResponse>> => {
  const response = await axiosAuth.get(API_GET_DEALER_ME);
  return response.data;
};