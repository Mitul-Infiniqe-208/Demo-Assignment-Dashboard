import { ApiResponse } from "@/types/base";
import { MeResponse } from "@/types/profile";
import axiosAuth from "./axios-auth";

export const getMe = async (): Promise<ApiResponse<MeResponse>> => {
  const response = await axiosAuth.get("/auth/authorized-dealer/me");
  return response.data;
};  