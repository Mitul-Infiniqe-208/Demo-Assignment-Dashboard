import { ApiResponse } from "@/types/base";

import { CreateEmployeeRequest, EmployeeResponse, EmployeeRolesResponse, EmployeesResponse, GetEmployeeRolesParams, GetEmployeesParams, UpdateEmployeeRequest } from "@/types/employees";
import axiosAuth from "./axios-auth";

const API_GET_EMPLOYEES = 'authorized/employees';
const API_GET_EMPLOYEES_ROLES = 'authorized/employee-roles';
const API_CREATE_EMPLOYEE = 'authorized/employees';
const API_UPDATE_EMPLOYEE = (id: string) => `authorized/employees/${id}`;
const API_DELETE_EMPLOYEE = (id: string) => `authorized/employees/${id}`;
const API_TOGGLE_EMPLOYEE_ACTIVE_INACTIVE = (id: string) =>
  `authorized/employees/${id}/active-inactive`;

export const getEmployees = async (
  params?: GetEmployeesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<EmployeesResponse>> => {
  const response = await axiosAuth.get(API_GET_EMPLOYEES, {
    params,
    signal,
  });
  return response.data;
};

export const getEmployeeRoles = async (
  params?: GetEmployeeRolesParams,
  signal?: AbortSignal,
): Promise<ApiResponse<EmployeeRolesResponse>> => {
  const response = await axiosAuth.get(API_GET_EMPLOYEES_ROLES, {
    params,
    signal,
  });
  return response.data;
};

export const createEmployee = async (
  payload: CreateEmployeeRequest,
): Promise<ApiResponse<EmployeeResponse>> => {
  const response = await axiosAuth.post(API_CREATE_EMPLOYEE, payload);
  return response.data;
};

export const updateEmployee = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateEmployeeRequest;
}): Promise<ApiResponse<EmployeeResponse>> => {
  const response = await axiosAuth.put(API_UPDATE_EMPLOYEE(id), payload);
  return response.data;
};

export const deleteEmployee = async (
  id: string,
): Promise<ApiResponse<void>> => {
  const response = await axiosAuth.delete(API_DELETE_EMPLOYEE(id));
  return response.data;
};

export const toggleEmployeeActiveInactive = async (
  id: string,
): Promise<ApiResponse<EmployeeResponse>> => {
  const response = await axiosAuth.put(
    API_TOGGLE_EMPLOYEE_ACTIVE_INACTIVE(id),
  );
  return response.data;
};
