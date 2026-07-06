import { BaseParams, SortOrder } from "./base";

export interface Employee {
  id: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  contactNo: string;
  email: string;
  address?: string;
  pinCode?: string;
  state?: string;
  city?: string;
  area?: string;
  country?: string;
  image: string | null;
  authorizedDealerEmployeeRoleId?: string;
  authorizedDealerEmployeeRole?: EmployeeRole;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  contactNo: string;
  email?: string;
  address?: string;
  pinCode?: string;
  state?: string;
  city?: string;
  area?: string;
  country?: string;
  image?: string;
  authorizedDealerEmployeeRoleId: string;
}

export type UpdateEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface EmployeeResponse {
  employee: Employee;
}

export interface EmployeesResponse {
  employees: Employee[];
}

export interface GetEmployeesParams extends BaseParams {}

export interface EmployeeRole {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface EmployeeRolesResponse {
  roles: EmployeeRole[];
}

export interface GetEmployeeRolesParams extends BaseParams {}

export type EmployeesListingState = {
  currentPage: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};
