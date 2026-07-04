import { ApiResponse } from "@/types/base";

import { CreateEmployeeRequest, EmployeeResponse, EmployeeRolesResponse, EmployeesResponse, GetEmployeeRolesParams, GetEmployeesParams, UpdateEmployeeRequest } from "@/types/employees";
import axiosAuth from "./axios-auth";

export const getEmployees = async (
  params?: GetEmployeesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<EmployeesResponse>> => {
  const response = await axiosAuth.get("/authorized/employees", {
    params,
    signal,
  });
  return response.data;
};

export const getEmployeeRoles = async (
  params?: GetEmployeeRolesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<EmployeeRolesResponse>> => {
  const response = await axiosAuth.get("/authorized/employee-roles", {
    params,
    signal,
  });
  return response.data;
};

export const createEmployee = async (
  payload: CreateEmployeeRequest,
): Promise<ApiResponse<EmployeeResponse>> => {
  const response = await axiosAuth.post("/authorized/employees", payload);
  return response.data;
};

export const updateEmployee = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateEmployeeRequest;
}): Promise<ApiResponse<EmployeeResponse>> => {
  const response = await axiosAuth.put(`/authorized/employees/${id}`, payload);
  return response.data;
};

export const deleteEmployee = async (
  id: string,
): Promise<ApiResponse<void>> => {
  const response = await axiosAuth.delete(`/authorized/employees/${id}`);
  return response.data;
};

export const toggleEmployeeActiveInactive = async (
  id: string,
): Promise<ApiResponse<EmployeeResponse>> => {
  const response = await axiosAuth.put(
    `/authorized/employees/${id}/active-inactive`,
  );
  return response.data;
};
