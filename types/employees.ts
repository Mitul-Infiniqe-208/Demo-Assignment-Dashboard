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

export interface EmployeeRole {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}